import * as THREE from 'three';

// Alizeh's cartoon avatar, built from code. Feet sit at y = 0.
export function createAvatar() {
  const root = new THREE.Group();
  const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .65, ...o });
  const skin = 0xf2c6a0, hair = 0x2b1a22, shirt = 0xa9c4ff, pants = 0xdcc3a0, brown = 0x9a5b36;
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = root) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };
  const S = (r) => new THREE.SphereGeometry(r, 32, 24);

  const body = new THREE.Group(); root.add(body);
  // shoes, wide trousers, oversized shirt
  [-.2, .2].forEach(x => { const s = mesh(S(.16), M(0xffffff), x, .08, .07, body); s.scale.set(1, .55, 1.6); });
  mesh(new THREE.CylinderGeometry(.42, .54, 1.1, 28), M(pants), 0, .72, 0, body);
  mesh(new THREE.CylinderGeometry(.44, .52, .95, 28), M(shirt), 0, 1.72, 0, body);
  mesh(new THREE.CylinderGeometry(.12, .12, .16, 16), M(skin), 0, 2.25, 0, body);
  // lanyard + badge
  mesh(new THREE.BoxGeometry(.05, .55, .02), M(0x2a2a3a), 0, 1.98, .47, body);
  mesh(new THREE.BoxGeometry(.15, .2, .02), M(0xffffff), 0, 1.6, .49, body);
  // shoulder bag
  mesh(new THREE.BoxGeometry(.2, .42, .5), M(brown), -.64, 1.3, .05, body);
  const strap = mesh(new THREE.BoxGeometry(.05, 1.0, .05), M(brown), -.46, 1.85, 0, body); strap.rotation.z = -.12;

  // arms (pivot at the shoulder)
  const arm = (side) => {
    const g = new THREE.Group(); g.position.set(side * .52, 2.1, 0); body.add(g);
    mesh(new THREE.CapsuleGeometry(.1, .68, 8, 16), M(shirt), 0, -.45, 0, g);
    mesh(S(.095), M(skin), 0, -.93, 0, g);
    g.rotation.z = side * -.16; return g;
  };
  const armL = arm(-1), armR = arm(1);

  // head
  const head = new THREE.Group(); head.position.y = 2.78; body.add(head);
  const h = mesh(S(.55), M(skin), 0, 0, 0, head); h.scale.set(1, .95, 1);
  const back = mesh(S(.6), M(hair), 0, .04, -.1, head); back.scale.set(1.02, 1.02, 1);
  const flow = mesh(S(.5), M(hair), 0, -.55, -.3, head); flow.scale.set(1.05, 1.5, .55);
  [-1, 1].forEach(s => {
    const side = mesh(new THREE.CapsuleGeometry(.14, .75, 8, 16), M(hair), s * .45, -.4, -.05, head); side.rotation.z = s * .08;
    const bang = mesh(S(.3), M(hair), s * .24, .34, .36, head); bang.scale.set(1.3, .75, .6); bang.rotation.z = -s * .55;
  });
  // face
  const eyes = new THREE.Group(); head.add(eyes);
  [-1, 1].forEach(s => {
    const e = mesh(S(.07), M(0x1a1020), s * .2, -.02, .5, eyes); e.scale.set(1, 1.35, .6);
    mesh(S(.02), M(0xffffff, { emissive: 0xffffff }), s * .2 + .02, .02, .545, eyes);
    mesh(S(.075), M(0xff8fb8), s * .35, -.14, .42, head).scale.set(1, .6, .4);
    const rim = mesh(new THREE.TorusGeometry(.155, .018, 10, 36), M(0x8a5cff, { metalness: .3 }), s * .21, -.02, .54, head);
    mesh(new THREE.CircleGeometry(.15, 28), M(0xb08cff, { transparent: true, opacity: .35, side: THREE.DoubleSide }), s * .21, -.02, .545, head);
  });
  mesh(new THREE.CylinderGeometry(.012, .012, .1, 8), M(0x8a5cff), 0, -.01, .545, head).rotation.z = Math.PI / 2;
  const smile = mesh(new THREE.TorusGeometry(.09, .016, 8, 20, Math.PI), M(0xc2476b), 0, -.15, .515, head); smile.rotation.z = Math.PI;

  let waveFrom = 0, waving = true;
  return {
    root,
    wave() { waving = true; waveFrom = null; },
    update(t, mx = 0, my = 0) {
      if (waving && waveFrom === 0) waveFrom = t;
      if (waving && waveFrom === null) waveFrom = t;
      body.position.y = Math.sin(t * 1.8) * .025;
      body.scale.y = 1 + Math.sin(t * 1.8) * .006;
      head.rotation.y += (mx * .7 - head.rotation.y) * .08;
      head.rotation.x += (my * .45 - head.rotation.x) * .08;
      head.rotation.z = Math.sin(t * .9) * .03;
      eyes.scale.y = (t % 4.2) > 4.08 ? .12 : 1;
      armL.rotation.z = .16 + Math.sin(t * 1.8) * .02;
      if (waving && t - waveFrom < 2.6) armR.rotation.z = 2.5 + Math.sin(t * 11) * .3;
      else { waving = false; armR.rotation.z += (-.16 - armR.rotation.z) * .1; }
    }
  };
}
