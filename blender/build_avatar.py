"""
Alizeh avatar builder for Blender (4.2+ / 5.x).
Run inside Blender: Scripting tab > Open > build_avatar.py > Run Script,
or from a terminal: blender --background --python build_avatar.py
It builds the stylised avatar, rigs it, adds Idle + Wave animations,
saves alizeh_avatar.blend and exports avatar.glb next to this script.
"""
import bpy, bmesh, math, os
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__)) if "__file__" in dir() else bpy.path.abspath("//")
OUT_BLEND = os.path.join(HERE, "alizeh_avatar.blend")
OUT_GLB = os.path.join(HERE, "avatar.glb")

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.fps = 30
scene.frame_start, scene.frame_end = 1, 120

# ---------------------------------------------------------------- materials
def mat(name, color, rough=0.6, metal=0.0, alpha=1.0, emit=None, tex=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if alpha < 1:
        b.inputs["Alpha"].default_value = alpha
        try: m.surface_render_method = "BLENDED"
        except Exception: pass
    if emit:
        b.inputs["Emission Color"].default_value = (*emit, 1)
        b.inputs["Emission Strength"].default_value = 1.0
    if tex:
        t = nt.nodes.new("ShaderNodeTexImage")
        t.image = bpy.data.images.load(os.path.join(HERE, "textures", tex))
        nt.links.new(t.outputs["Color"], b.inputs["Base Color"])
    return m

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)

M = {
    "skin":   mat("Skin", srgb("f3c9a6"), 0.55),
    "hair":   mat("Hair", srgb("2a1a1f"), 0.35),
    "shirt":  mat("Shirt", srgb("b7ccf2"), 0.8, tex="shirt.png"),
    "pants":  mat("Trousers", srgb("dcc6a2"), 0.85),
    "shoe":   mat("Shoes", srgb("fbfbff"), 0.5),
    "sole":   mat("Soles", srgb("f2a7c8"), 0.6),
    "bag":    mat("Leather", srgb("a8653c"), 0.45),
    "bagdk":  mat("LeatherDark", srgb("7c4526"), 0.5),
    "rim":    mat("GlassesRim", srgb("9b7bff"), 0.25, 0.6),
    "lens":   mat("GlassesLens", srgb("c4a8ff"), 0.05, alpha=0.38),
    "eye":    mat("Eyes", srgb("1c1222"), 0.2),
    "shine":  mat("EyeShine", (1, 1, 1), 0.2, emit=(1, 1, 1)),
    "blush":  mat("Blush", srgb("ff9cc0"), 0.7),
    "lip":    mat("Lips", srgb("d0587a"), 0.4),
    "brow":   mat("Brows", srgb("2a1a1f"), 0.6),
    "lanyard":mat("Lanyard", srgb("2b2b3a"), 0.6),
    "badge":  mat("Badge", (1, 1, 1), 0.4, tex="badge.png"),
    "gold":   mat("Gold", srgb("f2c86b"), 0.25, 0.9),
    "clip":   mat("PinkClip", srgb("ff5f9e"), 0.35),
}

# ---------------------------------------------------------------- helpers
parts = []  # (object, bone)

def finish(o, material, bone, smooth=True):
    o.data.materials.clear(); o.data.materials.append(material)
    if smooth:
        for p in o.data.polygons: p.use_smooth = True
    parts.append((o, bone))
    return o

def sphere(loc, r, scale=(1, 1, 1), material=None, bone="spine", seg=40, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=seg // 2, radius=r, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = scale
    return finish(o, material, bone)

def cyl(loc, r1, r2, depth, material, bone, seg=40, rot=(0, 0, 0), smooth=True):
    bpy.ops.mesh.primitive_cone_add(vertices=seg, radius1=r1, radius2=r2, depth=depth, location=loc, rotation=rot)
    return finish(bpy.context.object, material, bone, smooth)

def torus(loc, R, r, material, bone, rot=(0, 0, 0), arc=None, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=48, minor_segments=12, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = scale
    if arc:  # keep only the lower half (for a smile)
        bm = bmesh.new(); bm.from_mesh(o.data)
        bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.y > 0.001], context="VERTS")
        bm.to_mesh(o.data); bm.free()
    return finish(o, material, bone)

def box(loc, size, material, bone, bevel=0.02, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        mod = o.modifiers.new("bevel", "BEVEL"); mod.width = bevel; mod.segments = 4
        bpy.ops.object.modifier_apply(modifier="bevel")
    return finish(o, material, bone)

def capsule(a, b, r, material, bone, seg=24):
    """Rounded tube between points a and b."""
    a, b = Vector(a), Vector(b); d = b - a
    rot = d.to_track_quat('Z', 'Y').to_euler()
    cyl((a + b) / 2, r, r, d.length, material, bone, seg, rot)
    sphere(a, r, material=material, bone=bone, seg=seg)
    sphere(b, r, material=material, bone=bone, seg=seg)

def subdiv(o, lvl=2):
    m = o.modifiers.new("sub", "SUBSURF"); m.levels = lvl; m.render_levels = lvl
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.modifier_apply(modifier="sub")

# Blender front = -Y.  Her right side = -X.
# ---------------------------------------------------------------- legs + shoes
for s in (-1, 1):
    x = s * 0.115
    o = sphere((x, -0.05, 0.055), 0.085, (0.95, 1.55, 0.62), M["shoe"], "hips")
    sphere((x, -0.05, 0.022), 0.088, (0.98, 1.6, 0.22), M["sole"], "hips")
    # wide-leg trousers, flare toward the hem
    cyl((x, 0, 0.33), 0.135, 0.105, 0.5, M["pants"], "hips")
cyl((0, 0, 0.6), 0.24, 0.22, 0.16, M["pants"], "hips").scale = (1, 0.78, 1)   # hips (hidden under shirt)
torus((0, 0, 0.088), 0.13, 0.02, M["pants"], "hips", scale=(1, 1, 0.6)).location.x = -0.115
torus((0, 0, 0.088), 0.13, 0.02, M["pants"], "hips", scale=(1, 1, 0.6)).location.x = 0.115

# ---------------------------------------------------------------- oversized shirt
torso = cyl((0, 0, 0.8), 0.31, 0.25, 0.56, M["shirt"], "spine", 48)
torso.scale = (1, 0.8, 1)
hem = torus((0, 0, 0.52), 0.3, 0.025, M["shirt"], "spine", scale=(1, 0.8, 1))       # soft rounded hem
sphere((0, 0, 1.075), 0.25, (1.12, 0.8, 0.3), M["shirt"], "spine")   # shoulders
for s in (-1, 1):  # collar flaps
    box((s * 0.07, -0.17, 1.1), (0.1, 0.03, 0.07), M["shirt"], "spine", 0.012, rot=(0.35, 0, s * 0.55))
# buttons placket
box((0, -0.207, 0.84), (0.035, 0.01, 0.42), M["shirt"], "spine", 0.004)
for i in range(4):
    sphere((0, -0.214, 0.98 - i * 0.12), 0.011, (1, 0.5, 1), M["shoe"], "spine", 12)

# ---------------------------------------------------------------- lanyard + badge
for s in (-1, 1):
    capsule((s * 0.07, -0.205, 1.1), (s * 0.012, -0.243, 0.76), 0.01, M["lanyard"], "spine", 10)
box((0, -0.245, 0.745), (0.03, 0.012, 0.04), M["lanyard"], "spine", 0.004)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -0.256, 0.64), rotation=(math.pi / 2, 0, 0))
badge = bpy.context.object; badge.scale = (0.11, 0.14, 1); bpy.ops.object.transform_apply(scale=True)
finish(badge, M["badge"], "spine", smooth=False)
box((0, -0.25, 0.64), (0.12, 0.006, 0.15), M["shoe"], "spine", 0.004)

# ---------------------------------------------------------------- neck + head
cyl((0, 0, 1.15), 0.065, 0.06, 0.12, M["skin"], "neck", 24)
HZ = 1.43
sphere((0, 0, HZ), 0.3, (1, 0.96, 1.02), M["skin"], "head", 48)
for s in (-1, 1):
    sphere((s * 0.295, 0.01, HZ - 0.02), 0.05, (0.5, 0.8, 1), M["skin"], "head", 16)      # ears
sphere((0, -0.297, HZ - 0.06), 0.022, (1, 0.8, 0.9), M["skin"], "head", 16)             # nose

# eyes, shine, blush, brows
for s in (-1, 1):
    sphere((s * 0.105, -0.268, HZ - 0.005), 0.042, (0.82, 0.45, 1.18), M["eye"], "head", 24)
    sphere((s * 0.105 + 0.016, -0.287, HZ + 0.018), 0.012, material=M["shine"], bone="head", seg=12)
    sphere((s * 0.095 - 0.01, -0.29, HZ - 0.022), 0.006, material=M["shine"], bone="head", seg=10)
    sphere((s * 0.175, -0.235, HZ - 0.085), 0.045, (1, 0.35, 0.6), M["blush"], "head", 16)
    b = box((s * 0.11, -0.262, HZ + 0.115), (0.075, 0.012, 0.014), M["brow"], "head", 0.005, rot=(0.25, 0, s * -0.12))
smile = torus((0, -0.288, HZ - 0.13), 0.042, 0.009, M["lip"], "head", rot=(math.pi / 2 - 0.25, 0, 0), arc=True)

# round glasses, purple tint
for s in (-1, 1):
    torus((s * 0.11, -0.3, HZ), 0.07, 0.008, M["rim"], "head", rot=(math.pi / 2, 0, 0))
    bpy.ops.mesh.primitive_circle_add(vertices=40, radius=0.068, fill_type="NGON", location=(s * 0.11, -0.302, HZ), rotation=(math.pi / 2, 0, 0))
    finish(bpy.context.object, M["lens"], "head", smooth=False)
    capsule((s * 0.18, -0.29, HZ + 0.005), (s * 0.29, -0.02, HZ + 0.02), 0.006, M["rim"], "head", 8)
capsule((-0.04, -0.302, HZ + 0.012), (0.04, -0.302, HZ + 0.012), 0.006, M["rim"], "head", 8)

# hair: cap, centre part, long hair falling over shoulders and back
cap = sphere((0, 0.025, HZ + 0.03), 0.318, (1.02, 1.0, 1.0), M["hair"], "head", 48)
# cut the face opening out of the cap
bm = bmesh.new(); bm.from_mesh(cap.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.y < -0.12 and v.co.z < 0.13 and abs(v.co.x) < 0.25], context="VERTS")
bm.to_mesh(cap.data); bm.free()
for s in (-1, 1):
    sphere((s * 0.115, -0.2, HZ + 0.15), 0.15, (1.0, 0.45, 0.38), M["hair"], "head", 32, rot=(0.9, 0, s * -0.42))    # curtain bangs
    sphere((s * 0.245, -0.12, HZ - 0.02), 0.1, (0.6, 0.75, 2.0), M["hair"], "head", 24, rot=(0.1, s * 0.15, 0))  # face-framing
    # long hair falling over the shoulders, flattened like real strands
    sphere((s * 0.24, -0.06, 1.05), 0.12, (0.85, 0.6, 3.0), M["hair"], "head", 32, rot=(0.12, 0, s * -0.06))
back = sphere((0, 0.11, 1.12), 0.3, (1.05, 0.45, 1.7), M["hair"], "head", 40)

# ---------------------------------------------------------------- arms (shirt sleeves rolled up)
ARM = {}
for s, side in ((-1, "R"), (1, "L")):
    sh = Vector((s * 0.3, 0, 1.03)); el = Vector((s * 0.36, -0.01, 0.75)); wr = Vector((s * 0.37, -0.03, 0.52))
    ARM[side] = (sh, el, wr)
    capsule(sh, el, 0.08, M["shirt"], "upper_arm." + side, 24)
    cyl(el + (wr - el) * 0.1, 0.085, 0.085, 0.07, M["shirt"], "forearm." + side, 24,
        rot=(wr - el).to_track_quat('Z', 'Y').to_euler())                                   # rolled cuff
    capsule(el + (wr - el) * 0.2, wr, 0.05, M["skin"], "forearm." + side, 20)
    torus(wr + Vector((0, 0, 0.03)), 0.052, 0.008, M["gold"], "forearm." + side)            # bracelet
    sphere(wr + Vector((0, -0.01, -0.06)), 0.058, (0.85, 0.7, 1.15), M["skin"], "forearm." + side, 24)  # hand

# ---------------------------------------------------------------- shoulder bag on her right side
bag = box((-0.4, 0.02, 0.6), (0.11, 0.3, 0.28), M["bag"], "spine", 0.045)
box((-0.46, 0.02, 0.66), (0.012, 0.3, 0.16), M["bagdk"], "spine", 0.01)                   # flap
capsule((-0.32, 0.02, 1.09), (-0.43, 0.02, 0.72), 0.018, M["bagdk"], "spine", 10)          # strap
sphere((-0.36, -0.03, 0.9), 0.035, (0.7, 0.6, 1.2), M["clip"], "spine", 16)                # pink clip charm

# ---------------------------------------------------------------- armature
bpy.ops.object.select_all(action="DESELECT")
bpy.ops.object.armature_add(location=(0, 0, 0))
rig = bpy.context.object; rig.name = "AlizehRig"; rig.data.name = "AlizehRig"
bpy.ops.object.mode_set(mode="EDIT")
eb = rig.data.edit_bones
root = eb[0]; root.name = "root"; root.head = (0, 0, 0); root.tail = (0, 0.2, 0)
def bone(n, h, t, parent):
    b = eb.new(n); b.head = h; b.tail = t; b.parent = eb[parent]; return b
bone("hips", (0, 0, 0.5), (0, 0, 0.66), "root")
bone("spine", (0, 0, 0.66), (0, 0, 1.08), "hips").use_connect = True
bone("neck", (0, 0, 1.08), (0, 0, 1.2), "spine").use_connect = True
bone("head", (0, 0, 1.2), (0, 0, 1.75), "neck").use_connect = True
for side, (sh, el, wr) in ARM.items():
    bone("upper_arm." + side, sh, el, "spine")
    bone("forearm." + side, el, wr, "upper_arm." + side).use_connect = True
bpy.ops.object.mode_set(mode="OBJECT")

# ---------------------------------------------------------------- join into one skinned mesh
bpy.ops.object.select_all(action="DESELECT")
for o, b in parts:
    vg = o.vertex_groups.new(name=b)
    vg.add(list(range(len(o.data.vertices))), 1.0, "REPLACE")
    o.select_set(True)
bpy.context.view_layer.objects.active = parts[0][0]
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
bpy.ops.object.join()
body = bpy.context.object; body.name = "AlizehAvatar"; body.data.name = "AlizehAvatar"
body.parent = rig
mod = body.modifiers.new("Armature", "ARMATURE"); mod.object = rig
for w in body.data.uv_layers[1:] if len(body.data.uv_layers) > 1 else []:
    pass

# ---------------------------------------------------------------- animations
def key(pb, frame, rot=None, loc=None):
    pb.rotation_mode = "XYZ"
    if rot is not None:
        pb.rotation_euler = rot; pb.keyframe_insert("rotation_euler", frame=frame)
    if loc is not None:
        pb.location = loc; pb.keyframe_insert("location", frame=frame)

rig.animation_data_create()
P = rig.pose.bones
# rest pose: arms relaxed slightly away from the body (bone-local X bends the arm forward/back, Z outward)
def make_action(name):
    a = bpy.data.actions.new(name); a.use_fake_user = True
    rig.animation_data.action = a
    return a

idle = make_action("Idle")
for f in (1, 31, 61, 91, 121):
    ph = (f - 1) / 120 * 2 * math.pi
    key(P["hips"], f, loc=(0, 0.012 * math.sin(ph * 2), 0))
    key(P["spine"], f, rot=(0.02 * math.sin(ph * 2), 0, 0.02 * math.sin(ph)))
    key(P["head"], f, rot=(0.04 * math.sin(ph * 2 + 1), 0.12 * math.sin(ph), 0.06 * math.sin(ph + 0.5)))
    key(P["upper_arm.L"], f, rot=(0.05 * math.sin(ph * 2), 0, 0.03 * math.sin(ph * 2)))
    key(P["upper_arm.R"], f, rot=(0.05 * math.sin(ph * 2 + 0.5), 0, -0.03 * math.sin(ph * 2)))
    key(P["forearm.L"], f, rot=(-0.15, 0, 0))
    key(P["forearm.R"], f, rot=(-0.15, 0, 0))

wave = make_action("Wave")
# raise her left arm (+X side) and wave the forearm
for f, ua, fa, hd in ((1, 0.0, 0, 0.0), (10, 2.3, -0.9, 0.12), (16, 2.35, -0.3, 0.15), (22, 2.35, -1.0, 0.15),
                      (28, 2.35, -0.3, 0.15), (34, 2.35, -1.0, 0.15), (40, 2.35, -0.5, 0.12), (50, 0.0, 0, 0.0)):
    key(P["upper_arm.L"], f, rot=(-0.25 * ua / 2.35, 0, -ua))
    key(P["forearm.L"], f, rot=(0, 0, fa) if ua else (-0.15, 0, 0))
    key(P["head"], f, rot=(0, 0, -hd))
    key(P["spine"], f, rot=(0, 0, -hd * 0.25))
    key(P["upper_arm.R"], f, rot=(0, 0, 0))
    key(P["forearm.R"], f, rot=(-0.15, 0, 0))
    key(P["hips"], f, loc=(0, 0, 0))

# push both actions to NLA so the exporter keeps them as separate clips
for a in (idle, wave):
    tr = rig.animation_data.nla_tracks.new(); tr.name = a.name
    st = tr.strips.new(a.name, 1, a)
rig.animation_data.action = idle

# ---------------------------------------------------------------- simple scene for nice renders in Blender
bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=0.6, depth=0.04, location=(0, 0, -0.02))
stage = bpy.context.object; stage.name = "Stage (not exported)"
stage.data.materials.append(mat("Stage", srgb("ffd6ea"), 0.7))
for p in stage.data.polygons: p.use_smooth = True
bpy.ops.object.light_add(type="AREA", location=(1.5, -2.5, 3)); L = bpy.context.object; L.data.energy = 600; L.data.size = 3
L.rotation_euler = (math.radians(50), 0, math.radians(30))
bpy.ops.object.light_add(type="AREA", location=(-2, -1, 2)); L2 = bpy.context.object; L2.data.energy = 250; L2.data.size = 3; L2.data.color = (0.85, 0.8, 1)
L2.rotation_euler = (math.radians(60), 0, math.radians(-60))
bpy.ops.object.light_add(type="AREA", location=(0, 2, 2.5)); L3 = bpy.context.object; L3.data.energy = 300; L3.data.color = (1, 0.8, 0.9)
L3.rotation_euler = (math.radians(-60), 0, 0)
bpy.ops.object.camera_add(location=(0, -4.6, 1.15), rotation=(math.radians(88), 0, 0))
cam = bpy.context.object; cam.data.lens = 50; scene.camera = cam
world = bpy.data.worlds.new("World"); scene.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (*srgb("fff3fa"), 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 0.6

# ---------------------------------------------------------------- save + export
bpy.ops.file.pack_all()   # textures travel inside the .blend
bpy.ops.wm.save_as_mainfile(filepath=OUT_BLEND)
bpy.ops.object.select_all(action="DESELECT")
rig.select_set(True); body.select_set(True)
bpy.ops.export_scene.gltf(filepath=OUT_GLB, export_format="GLB", use_selection=True,
                          export_animations=True, export_animation_mode="NLA_TRACKS",
                          export_apply=True, export_yup=True)
print("saved", OUT_BLEND, OUT_GLB)
