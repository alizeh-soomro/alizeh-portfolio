/*  Alizeh Soomro - Portfolio Promo  |  After Effects project builder
    ------------------------------------------------------------------
    HOW TO USE (After Effects 2022 or newer):
      1. Install the 4 fonts in  assets/fonts  (double-click > Install).
      2. In After Effects: File > Scripts > Run Script File...  and pick this file.
      3. The script imports all footage, builds every composition with
         keyframed animation, and saves  Alizeh_Promo.aep  next to this file.
      4. Composition > Add to Render Queue (or press Ctrl+M) to export the MP4.
    Keep this file next to the "footage" and "assets" folders.
*/
(function () {
    var DATA = {
 "colors": {
  "bg": "#fff3fa",
  "bg2": "#efe7ff",
  "ink": "#3b2a54",
  "mute": "#7d6b99",
  "pink": "#ff8fc7",
  "purple": "#8f74ff",
  "mint": "#8de3c9",
  "peach": "#ffd0a6",
  "white": "#ffffff",
  "gold": "#ffd36b"
 },
 "total": 59.0,
 "cuts": [
  5.0,
  7.2,
  14.2,
  20.7,
  26.7,
  33.2,
  39.2,
  45.2,
  49.5,
  53.8
 ],
 "segments": [
  {
   "kind": "intro",
   "dur": 5.0,
   "start": 0
  },
  {
   "kind": "section",
   "dur": 2.2,
   "start": 5.0
  },
  {
   "file": "01_monster_runner.mp4",
   "num": "01",
   "title": "Monster Runner",
   "tag": "Fast-paced endless runner: dodge, jump and outrun the hungry monster.",
   "tools": [
    "Three.js",
    "JavaScript",
    "Game Design"
   ],
   "window": "Monster Runner",
   "dur": 7.0,
   "accent": "pink",
   "start": 7.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Monster\rRunner",
    "title": [
     110,
     404
    ],
    "tagText": "Fast-paced endless runner:\rdodge, jump and outrun the\rhungry monster.",
    "tag": [
     110,
     545
    ],
    "tools": [
     [
      130,
      703
     ],
     [
      272,
      703
     ],
     [
      130,
      762
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "02_eat_right_run.mp4",
   "num": "02",
   "title": "Eat Right Run",
   "tag": "Eat healthy to stay strong. Junk food drains your health bar!",
   "tools": [
    "Unreal Engine",
    "Blueprints"
   ],
   "window": "Eat Right Run - Unreal Engine",
   "dur": 6.5,
   "accent": "mint",
   "start": 14.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Eat Right Run",
    "title": [
     110,
     404
    ],
    "tagText": "Eat healthy to stay strong.\rJunk food drains your health\rbar!",
    "tag": [
     110,
     463
    ],
    "tools": [
     [
      130,
      621
     ],
     [
      342,
      621
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "03_shoot_the_box.mp4",
   "num": "03",
   "title": "Shoot the Box",
   "tag": "An AR/VR shooting game: aim, fire and break the boxes around you.",
   "tools": [
    "Unity",
    "AR/VR",
    "C#"
   ],
   "window": "Shoot the Box (AR/VR)",
   "dur": 6.0,
   "accent": "peach",
   "start": 20.7,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Shoot the\rBox",
    "title": [
     110,
     404
    ],
    "tagText": "An AR/VR shooting game:\raim, fire and break the boxes\raround you.",
    "tag": [
     110,
     545
    ],
    "tools": [
     [
      130,
      703
     ],
     [
      241,
      703
     ],
     [
      370,
      703
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "04_masketeer.mp4",
   "num": "04",
   "title": "Masketeer",
   "tag": "Two worlds, one magic mask. A maze of traps, enemies and keys.",
   "tools": [
    "Game Jam",
    "Pixel Art",
    "Level Design"
   ],
   "window": "Masketeer",
   "dur": 6.5,
   "accent": "purple",
   "start": 26.7,
   "badge": "2nd place - Global Game Jam",
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Masketeer",
    "title": [
     110,
     404
    ],
    "tagText": "Two worlds, one magic mask.\rA maze of traps, enemies\rand keys.",
    "tag": [
     110,
     463
    ],
    "tools": [
     [
      130,
      621
     ],
     [
      306,
      621
     ],
     [
      130,
      680
     ]
    ],
    "badge": [
     132,
     755
    ]
   },
   "kind": "project"
  },
  {
   "file": "05_algorithm_visualizer.mp4",
   "num": "05",
   "title": "Algorithm Visualizer",
   "tag": "Animates sorting algorithms and tracks their running time live.",
   "tools": [
    "Python",
    "Algorithms",
    "UI Design"
   ],
   "window": "Algorithm and Time Analysis Visualizer",
   "dur": 6.0,
   "accent": "pink",
   "start": 33.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Algorithm\rVisualizer",
    "title": [
     110,
     404
    ],
    "tagText": "Animates sorting algorithms\rand tracks their running time\rlive.",
    "tag": [
     110,
     545
    ],
    "tools": [
     [
      130,
      703
     ],
     [
      262,
      703
     ],
     [
      438,
      703
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "06_storyboards.mp4",
   "num": "06",
   "title": "Storyboards & Concept Art",
   "tag": "Hand-drawn storyboards and moody concept frames for animation.",
   "tools": [
    "Drawing",
    "Storytelling",
    "Animation"
   ],
   "window": "Storyboard - Sketchbook",
   "dur": 6.0,
   "accent": "mint",
   "start": 39.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Storyboards\r& Concept\rArt",
    "title": [
     110,
     404
    ],
    "tagText": "Hand-drawn storyboards\rand moody concept frames\rfor animation.",
    "tag": [
     110,
     627
    ],
    "tools": [
     [
      130,
      785
     ],
     [
      276,
      785
     ],
     [
      130,
      844
     ]
    ]
   },
   "kind": "project"
  },
  {
   "kind": "award",
   "dur": 4.3,
   "start": 45.2
  },
  {
   "kind": "skills",
   "dur": 4.3,
   "start": 49.5
  },
  {
   "kind": "outro",
   "dur": 5.2,
   "start": 53.8
  }
 ],
 "projects": [
  {
   "file": "01_monster_runner.mp4",
   "num": "01",
   "title": "Monster Runner",
   "tag": "Fast-paced endless runner: dodge, jump and outrun the hungry monster.",
   "tools": [
    "Three.js",
    "JavaScript",
    "Game Design"
   ],
   "window": "Monster Runner",
   "dur": 7.0,
   "accent": "pink",
   "start": 7.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Monster\rRunner",
    "title": [
     110,
     404
    ],
    "tagText": "Fast-paced endless runner:\rdodge, jump and outrun the\rhungry monster.",
    "tag": [
     110,
     545
    ],
    "tools": [
     [
      130,
      703
     ],
     [
      272,
      703
     ],
     [
      130,
      762
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "02_eat_right_run.mp4",
   "num": "02",
   "title": "Eat Right Run",
   "tag": "Eat healthy to stay strong. Junk food drains your health bar!",
   "tools": [
    "Unreal Engine",
    "Blueprints"
   ],
   "window": "Eat Right Run - Unreal Engine",
   "dur": 6.5,
   "accent": "mint",
   "start": 14.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Eat Right Run",
    "title": [
     110,
     404
    ],
    "tagText": "Eat healthy to stay strong.\rJunk food drains your health\rbar!",
    "tag": [
     110,
     463
    ],
    "tools": [
     [
      130,
      621
     ],
     [
      342,
      621
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "03_shoot_the_box.mp4",
   "num": "03",
   "title": "Shoot the Box",
   "tag": "An AR/VR shooting game: aim, fire and break the boxes around you.",
   "tools": [
    "Unity",
    "AR/VR",
    "C#"
   ],
   "window": "Shoot the Box (AR/VR)",
   "dur": 6.0,
   "accent": "peach",
   "start": 20.7,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Shoot the\rBox",
    "title": [
     110,
     404
    ],
    "tagText": "An AR/VR shooting game:\raim, fire and break the boxes\raround you.",
    "tag": [
     110,
     545
    ],
    "tools": [
     [
      130,
      703
     ],
     [
      241,
      703
     ],
     [
      370,
      703
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "04_masketeer.mp4",
   "num": "04",
   "title": "Masketeer",
   "tag": "Two worlds, one magic mask. A maze of traps, enemies and keys.",
   "tools": [
    "Game Jam",
    "Pixel Art",
    "Level Design"
   ],
   "window": "Masketeer",
   "dur": 6.5,
   "accent": "purple",
   "start": 26.7,
   "badge": "2nd place - Global Game Jam",
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Masketeer",
    "title": [
     110,
     404
    ],
    "tagText": "Two worlds, one magic mask.\rA maze of traps, enemies\rand keys.",
    "tag": [
     110,
     463
    ],
    "tools": [
     [
      130,
      621
     ],
     [
      306,
      621
     ],
     [
      130,
      680
     ]
    ],
    "badge": [
     132,
     755
    ]
   },
   "kind": "project"
  },
  {
   "file": "05_algorithm_visualizer.mp4",
   "num": "05",
   "title": "Algorithm Visualizer",
   "tag": "Animates sorting algorithms and tracks their running time live.",
   "tools": [
    "Python",
    "Algorithms",
    "UI Design"
   ],
   "window": "Algorithm and Time Analysis Visualizer",
   "dur": 6.0,
   "accent": "pink",
   "start": 33.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Algorithm\rVisualizer",
    "title": [
     110,
     404
    ],
    "tagText": "Animates sorting algorithms\rand tracks their running time\rlive.",
    "tag": [
     110,
     545
    ],
    "tools": [
     [
      130,
      703
     ],
     [
      262,
      703
     ],
     [
      438,
      703
     ]
    ]
   },
   "kind": "project"
  },
  {
   "file": "06_storyboards.mp4",
   "num": "06",
   "title": "Storyboards & Concept Art",
   "tag": "Hand-drawn storyboards and moody concept frames for animation.",
   "tools": [
    "Drawing",
    "Storytelling",
    "Animation"
   ],
   "window": "Storyboard - Sketchbook",
   "dur": 6.0,
   "accent": "mint",
   "start": 39.2,
   "badge": null,
   "layout": {
    "chip": [
     134,
     286
    ],
    "titleText": "Storyboards\r& Concept\rArt",
    "title": [
     110,
     404
    ],
    "tagText": "Hand-drawn storyboards\rand moody concept frames\rfor animation.",
    "tag": [
     110,
     627
    ],
    "tools": [
     [
      130,
      785
     ],
     [
      276,
      785
     ],
     [
      130,
      844
     ]
    ]
   },
   "kind": "project"
  }
 ],
 "chips": [
  {
   "t": "Unreal Engine",
   "x": 441.0390625,
   "y": 492.0
  },
  {
   "t": "Unity",
   "x": 704.6328125,
   "y": 492.0
  },
  {
   "t": "Three.js",
   "x": 912.8828125,
   "y": 492.0
  },
  {
   "t": "JavaScript",
   "x": 1170.9140625,
   "y": 492.0
  },
  {
   "t": "UI/UX Design",
   "x": 1478.921875,
   "y": 492.0
  },
  {
   "t": "Canva",
   "x": 406.640625,
   "y": 596.0
  },
  {
   "t": "Video Editing",
   "x": 672.578125,
   "y": 596.0
  },
  {
   "t": "Game Design",
   "x": 1002.5,
   "y": 596.0
  },
  {
   "t": "AR/VR",
   "x": 1273.921875,
   "y": 596.0
  },
  {
   "t": "Blender",
   "x": 1494.25,
   "y": 596.0
  },
  {
   "t": "After Effects",
   "x": 560.3359375,
   "y": 700.0
  },
  {
   "t": "Node.js",
   "x": 834.5859375,
   "y": 700.0
  },
  {
   "t": "Databases",
   "x": 1089.1015625,
   "y": 700.0
  },
  {
   "t": "Algorithms",
   "x": 1374.4921875,
   "y": 700.0
  }
 ],
 "outro": {
  "headText": "Let's create something\rfun together!",
  "head": 334,
  "pills": [
   534,
   630,
   726
  ],
  "sig": 816
 },
 "intro": {
  "hi": 342,
  "name": 497.5,
  "sub": 591,
  "pill": 692
 },
 "sparks": [
  [
   70,
   90
  ],
  [
   300,
   60
  ],
  [
   860,
   70
  ],
  [
   1160,
   52
  ],
  [
   1500,
   80
  ],
  [
   1840,
   70
  ],
  [
   1880,
   330
  ],
  [
   1870,
   700
  ],
  [
   1850,
   1010
  ],
  [
   1450,
   1035
  ],
  [
   980,
   1030
  ],
  [
   560,
   1040
  ],
  [
   160,
   1010
  ],
  [
   50,
   760
  ],
  [
   40,
   420
  ]
 ]
};
    var ROOT = File($.fileName).parent;
    var W = 1920, H = 1080, FPS = 30;
    var C = {};
    for (var k in DATA.colors) C[k] = hex(DATA.colors[k]);
    var HEAD = "Fredoka-SemiBold", HEAD7 = "Fredoka-Bold", BODY = "Quicksand-SemiBold", BOLD = "Quicksand-Bold";

    function hex(h) { h = h.replace("#", ""); return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255]; }
    function rgba(c) { return [c[0], c[1], c[2], 1]; }

    app.beginUndoGroup("Build Alizeh Promo");
    var proj = app.newProject() ? app.project : app.project;
    proj.bitsPerChannel = 8;

    // ---------------------------------------------------------------- folders + imports
    var fComps = proj.items.addFolder("01 Compositions");
    var fScenes = proj.items.addFolder("02 Scenes"); fScenes.parentFolder = fComps;
    var fFoot = proj.items.addFolder("03 Footage");
    var fAssets = proj.items.addFolder("04 Assets");

    function importFile(path, seq) {
        var f = new File(ROOT.fsName + "/" + path);
        if (!f.exists) { alert("Missing file: " + path + "\nKeep this script next to the footage and assets folders."); throw new Error("missing " + path); }
        var io = new ImportOptions(f);
        if (seq) { io.sequence = true; io.forceAlphabetical = true; }
        var it = proj.importFile(io);
        return it;
    }
    var music = importFile("assets/music.wav"); music.parentFolder = fAssets;
    var trophy = importFile("assets/trophy.png"); trophy.parentFolder = fAssets;
    var waveSeq = importFile("assets/avatar_wave/wave_001.png", true); waveSeq.parentFolder = fAssets;
    waveSeq.mainSource.conformFrameRate = 30; waveSeq.name = "Avatar Wave (Blender render)";
    var idleSeq = importFile("assets/avatar_idle/idle_001.png", true); idleSeq.parentFolder = fAssets;
    idleSeq.mainSource.conformFrameRate = 15; idleSeq.mainSource.loop = 20; idleSeq.name = "Avatar Idle (Blender render, loops)";

    // ---------------------------------------------------------------- helpers
    function comp(name, dur, folder) {
        var c = proj.items.addComp(name, W, H, 1, dur, FPS);
        c.bgColor = C.bg; if (folder) c.parentFolder = folder; return c;
    }
    function nDims(p) {
        var t = p.propertyValueType;
        if (t == PropertyValueType.TwoD) return 2;
        if (t == PropertyValueType.ThreeD) return 3;
        return 1;
    }
    // key(prop, [[time, value], ...], easeType) easeType: "out" (smooth stop), "inout"
    function keys(p, list, mode) {
        for (var i = 0; i < list.length; i++) p.setValueAtTime(list[i][0], list[i][1]);
        var n = nDims(p);
        for (var j = 1; j <= p.numKeys; j++) {
            var inf = (mode == "linear") ? 0.1 : (mode == "out" ? 85 : 60);
            var outf = (mode == "linear") ? 0.1 : (mode == "out" ? 25 : 60);
            var ei = [], eo = [];
            for (var d = 0; d < n; d++) { ei.push(new KeyframeEase(0, inf)); eo.push(new KeyframeEase(0, outf)); }
            try { p.setTemporalEaseAtKey(j, ei, eo); } catch (e) { }
        }
    }
    function tr(l) { return l.property("ADBE Transform Group"); }
    function P(l) { return tr(l).property("ADBE Position"); }
    function S(l) { return tr(l).property("ADBE Scale"); }
    function O(l) { return tr(l).property("ADBE Opacity"); }
    function A(l) { return tr(l).property("ADBE Anchor Point"); }

    function shapeLayer(c, name) {
        var l = c.layers.addShape(); l.name = name; P(l).setValue([0, 0]); return l;
    }
    function group(l, name) {
        var g = l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); g.name = name; return g;
    }
    function gpos(g, x, y) { g.property("ADBE Vector Transform Group").property("ADBE Vector Position").setValue([x, y]); }
    function addRect(g, w, h, r, fill, stroke, sw) {
        var v = g.property("ADBE Vectors Group");
        var re = v.addProperty("ADBE Vector Shape - Rect");
        re.property("ADBE Vector Rect Size").setValue([w, h]);
        re.property("ADBE Vector Rect Roundness").setValue(r);
        if (stroke) { var s = v.addProperty("ADBE Vector Graphic - Stroke"); s.property("ADBE Vector Stroke Color").setValue(rgba(stroke)); s.property("ADBE Vector Stroke Width").setValue(sw || 5); }
        if (fill) { var f = v.addProperty("ADBE Vector Graphic - Fill"); f.property("ADBE Vector Fill Color").setValue(rgba(fill)); }
    }
    function addEllipse(g, d, fill, stroke, sw) {
        var v = g.property("ADBE Vectors Group");
        var e = v.addProperty("ADBE Vector Shape - Ellipse"); e.property("ADBE Vector Ellipse Size").setValue([d, d]);
        if (stroke) { var s = v.addProperty("ADBE Vector Graphic - Stroke"); s.property("ADBE Vector Stroke Color").setValue(rgba(stroke)); s.property("ADBE Vector Stroke Width").setValue(sw || 5); }
        if (fill) { var f = v.addProperty("ADBE Vector Graphic - Fill"); f.property("ADBE Vector Fill Color").setValue(rgba(fill)); }
    }
    function addStar(g, r, fill) {
        var v = g.property("ADBE Vectors Group");
        var s = v.addProperty("ADBE Vector Shape - Star");
        s.property("ADBE Vector Star Type").setValue(1);
        s.property("ADBE Vector Star Points").setValue(4);
        s.property("ADBE Vector Star Outer Radius").setValue(r);
        s.property("ADBE Vector Star Inner Radius").setValue(r * 0.38);
        var f = v.addProperty("ADBE Vector Graphic - Fill"); f.property("ADBE Vector Fill Color").setValue(rgba(fill));
    }
    function text(c, str, font, size, color, x, y, just, leading) {
        var l = c.layers.addText(str);
        var tp = l.property("ADBE Text Properties").property("ADBE Text Document");
        var td = tp.value;
        td.resetCharStyle(); td.resetParagraphStyle();
        td.text = str; td.font = font; td.fontSize = size; td.applyFill = true; td.fillColor = color; td.applyStroke = false;
        td.justification = just == "c" ? ParagraphJustification.CENTER_JUSTIFY : ParagraphJustification.LEFT_JUSTIFY;
        if (leading) { try { td.autoLeading = false; td.leading = leading; } catch (e) { } }
        tp.setValue(td);
        var nm = str.replace(/\r/g, " ");
        l.name = nm.length > 30 ? nm.substr(0, 30) + "..." : nm;
        P(l).setValue([x, y]);
        return l;
    }
    // pill: text with an auto-sizing rounded box (sourceRectAtTime expression) + hard ink shadow
    function pill(c, str, font, size, bg, x, y, padx, pady, shadow, center) {
        var t = text(c, str, font, size, C.ink, x, y, center ? "c" : "l");
        var s = shapeLayer(c, str + " (pill)");
        s.parent = t; P(s).setValue([0, 0]);
        var names = ["Shadow", "Pill"];
        for (var i = 0; i < 2; i++) {
            var g = group(s, names[i]);
            addRect(g, 100, 50, 999, i == 0 ? C.ink : bg, i == 1 ? C.ink : null, 4);
            var px = padx || 26, py = pady || 12, off = i == 0 ? (shadow === undefined ? 6 : shadow) : 0;
            // fetch the rectangle again: adding stroke/fill makes older references invalid in AE
            g = s.property("ADBE Root Vectors Group").property(i + 1);
            var re = g.property("ADBE Vectors Group").property("ADBE Vector Shape - Rect");
            re.property("ADBE Vector Rect Size").expression =
                "var r = thisLayer.parent.sourceRectAtTime(time,false); [r.width + " + (2 * px) + ", r.height + " + (2 * py) + "]";
            re.property("ADBE Vector Rect Roundness").setValue(999);
            g.property("ADBE Vector Transform Group").property("ADBE Vector Position").expression =
                "var r = thisLayer.parent.sourceRectAtTime(time,false); [r.left + r.width/2 + " + off + ", r.top + r.height/2 + " + off + "]";
        }
        s.property("ADBE Root Vectors Group").property(1).moveTo(2); // shadow below pill
        O(s).expression = "thisLayer.parent.transform.opacity";
        s.moveAfter(t);
        return t;
    }
    // slide-in: opacity + position from offset; slide-out at end
    function slideIn(l, t0, dx, dy, dur) {
        var p = P(l).value; dur = dur || 0.45;
        keys(P(l), [[t0, [p[0] + (dx || 0), p[1] + (dy || 0)]], [t0 + dur, p]], "out");
        keys(O(l), [[t0, 0], [t0 + dur * 0.6, 100]], "out");
    }
    function popIn(l, t0, dur) {
        dur = dur || 0.4;
        keys(S(l), [[t0, [0, 0, 100]], [t0 + dur * 0.7, [110, 110, 100]], [t0 + dur, [100, 100, 100]]], "out");
        keys(O(l), [[t0, 0], [t0 + 0.12, 100]], "linear");
    }
    function fadeOut(l, t1, dur) {
        var p = O(l); var v = 100;
        p.setValueAtTime(t1 - dur, v); p.setValueAtTime(t1, 0);
    }
    function roundedMask(l, w, h, r) {
        var m = l.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        var s = new Shape(), k = 0.5523 * r;
        s.vertices = [[0, 0], [w, 0], [w, h - r], [w - r, h], [r, h], [0, h - r]];
        s.inTangents = [[0, 0], [0, 0], [0, 0], [k, 0], [0, 0], [0, k]];
        s.outTangents = [[0, 0], [0, 0], [0, k], [0, 0], [-k, 0], [0, 0]];
        s.closed = true;
        m.property("ADBE Mask Shape").setValue(s);
    }

    // ---------------------------------------------------------------- background comp (shared)
    var bgc = comp("BG - Pastel Background", DATA.total, fComps);
    var sol = bgc.layers.addSolid(C.bg, "Gradient", W, H, 1, DATA.total);
    var ramp = sol.property("ADBE Effect Parade").addProperty("ADBE Ramp");
    ramp.property("ADBE Ramp-0001").setValue([0, 0]); ramp.property("ADBE Ramp-0002").setValue(C.bg);
    ramp.property("ADBE Ramp-0003").setValue([W, H]); ramp.property("ADBE Ramp-0004").setValue(C.bg2);
    var blobs = [[250, 200, 760, "pink"], [1850, 300, 840, "purple"], [1500, 1100, 920, "mint"], [300, 1050, 720, "peach"]];
    for (var b = 0; b < blobs.length; b++) {
        var bl = shapeLayer(bgc, "Blob " + blobs[b][3]);
        addEllipse(group(bl, "blob"), blobs[b][2], C[blobs[b][3]]);
        P(bl).setValue([blobs[b][0], blobs[b][1]]);
        O(bl).setValue(30);
        P(bl).expression = "value + [wiggle(0.15, 80)[0]-value[0], wiggle(0.12, 60)[1]-value[1]]";
        bl.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2").property("ADBE Gaussian Blur 2-0001").setValue(280);
    }
    // sparkles: only in the margins, away from text
    for (var i = 0; i < DATA.sparks.length; i++) {
        var sp = DATA.sparks[i], col = C[["pink", "purple", "mint", "peach", "gold"][i % 5]];
        var sl = shapeLayer(bgc, "Sparkle " + (i + 1));
        var g = group(sl, "spark");
        if (i % 3 == 0) addStar(g, 22, col); else if (i % 3 == 1) addEllipse(g, 26, col); else addEllipse(g, 30, null, col, 4);
        P(sl).setValue(sp);
        P(sl).expression = "value + [0, 10*Math.sin(time*" + (0.6 + (i % 5) * 0.2).toFixed(2) + " + " + i + ")]";
        S(sl).expression = "var s = 87 + 13*Math.sin(time*" + (1.4 + (i % 4) * 0.35).toFixed(2) + " + " + i + "); [s, s]";
        O(sl).setValue(85);
    }

    // ---------------------------------------------------------------- scene builders
    function addAvatar(c, x, yBottom, t0) {
        var w = c.layers.add(waveSeq); w.name = "Avatar - wave";
        A(w).setValue([300, 800]); P(w).setValue([x, yBottom]); S(w).setValue([125, 125]);
        w.startTime = t0; w.outPoint = t0 + 50 / 30;
        var id = c.layers.add(idleSeq); id.name = "Avatar - idle loop";
        A(id).setValue([300, 800]); P(id).setValue([x, yBottom]); S(id).setValue([125, 125]);
        id.startTime = t0 + 50 / 30; id.outPoint = c.duration;
        keys(P(w), [[0, [x, yBottom + 120]], [0.6, [x, yBottom]]], "out");
        keys(O(w), [[0, 0], [0.3, 100]], "out");
    }
    function halo(c, x, y, colFill, colRing) {
        var h = shapeLayer(c, "Halo"); addEllipse(group(h, "fill"), 640, colFill); P(h).setValue([x, y]); O(h).setValue(35);
        var r = shapeLayer(c, "Halo ring"); addEllipse(group(r, "ring"), 720, null, colRing, 6); P(r).setValue([x, y]); O(r).setValue(50);
        var ls = [h, r], op = [35, 50];
        for (var i = 0; i < 2; i++) {
            keys(S(ls[i]), [[0, [60, 60, 100]], [0.45, [104, 104, 100]], [0.6, [100, 100, 100]]], "out");
            keys(O(ls[i]), [[0, 0], [0.4, op[i]]], "out");
        }
        return [h, r];
    }

    function buildIntro(seg) {
        var c = comp("Scene 01 - Intro", seg.dur, fScenes);
        halo(c, 1490, 560, C.pink, C.purple);
        addAvatar(c, 1490, 1060, 0.5);
        var st = [[1170, 230, "gold", 30], [1830, 400, "pink", 20], [1180, 840, "mint", 24]];
        for (var i = 0; i < st.length; i++) {
            var s = shapeLayer(c, "Star " + (i + 1)); addStar(group(s, "star"), st[i][3], C[st[i][2]]); P(s).setValue([st[i][0], st[i][1]]);
            popIn(s, 0.7 + i * 0.15);
        }
        var hi = text(c, "Hi, I'm", BOLD, 54, C.purple, 140, DATA.intro.hi); slideIn(hi, 0.3, -30, 0);
        var nm = text(c, "Alizeh Soomro", HEAD, 136, C.ink, 138, DATA.intro.name);
        // per-letter pop with a text animator
        var anim = nm.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
        anim.name = "Letter pop";
        var ap = anim.property("ADBE Text Animator Properties");
        ap.addProperty("ADBE Text Position 3D").setValue([0, 60, 0]);
        ap.addProperty("ADBE Text Opacity").setValue(0);
        ap.addProperty("ADBE Text Scale 3D").setValue([60, 60, 100]);
        var sel = anim.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
        keys(sel.property("ADBE Text Percent Offset"), [[0.55, 0], [1.3, 100]], "out");
        try { sel.property("ADBE Text Range Advanced").property("ADBE Text Range Shape").setValue(3); } catch (e) { } // ramp down
        var sub = text(c, "Game Developer  ·  UI/UX Designer  ·  Video Editor", BOLD, 38, C.mute, 142, DATA.intro.sub); slideIn(sub, 1.3, 0, 25);
        var p = pill(c, "BS Computer Science (Gaming & Animation) · NED University", BOLD, 28, C.mint, 160, DATA.intro.pill); slideIn(p, 1.6, 0, 25);
        return c;
    }
    function buildSection(seg) {
        var c = comp("Scene 02 - Featured Projects", seg.dur, fScenes);
        var t = text(c, "Featured Projects", HEAD, 140, C.ink, W / 2, 515, "c"); popIn(t, 0, 0.5);
        var s = text(c, "a little peek at what I've built", BOLD, 44, C.purple, W / 2, 605, "c"); slideIn(s, 0.3, 0, 20);
        var cols = ["pink", "mint", "peach", "purple", "pink", "mint"];
        for (var i = 0; i < 6; i++) {
            var d = shapeLayer(c, "Dot " + (i + 1)); addEllipse(group(d, "dot"), 30, C[cols[i]]); P(d).setValue([W / 2 - 150 + i * 60, 680]);
            popIn(d, 0.5 + i * 0.08, 0.3);
        }
        return c;
    }
    function buildWindow(pr, i) {
        var foot = importFile("footage/" + pr.file); foot.parentFolder = fFoot;
        var k = 0.88, cw = Math.round(foot.width * k), ch = Math.round(foot.height * k);
        var BAR = 56, B = 5, ww = cw + 2 * B, wh = ch + BAR + B;
        var c = proj.items.addComp("Window - " + pr.title, ww + 14, wh + 14, 1, pr.dur, FPS); c.parentFolder = fScenes;
        var sh = shapeLayer(c, "Hard shadow"); var g0 = group(sh, "shadow"); addRect(g0, ww, wh, 26, C.ink); gpos(g0, ww / 2 + 14, wh / 2 + 14);
        var fr = shapeLayer(c, "Window frame"); var g1 = group(fr, "frame"); addRect(g1, ww, wh, 26, C.white, C.ink, 5); gpos(g1, ww / 2, wh / 2);
        var v = c.layers.add(foot); v.name = "Screen recording"; A(v).setValue([0, 0]); P(v).setValue([B, BAR]); S(v).setValue([k * 100, k * 100]);
        roundedMask(v, foot.width, foot.height, 22 / k);
        var bar = shapeLayer(c, "Title bar"); var g2 = group(bar, "bar"); addRect(g2, ww - 2 * B, BAR - B, 0, C[pr.accent]); gpos(g2, ww / 2, (BAR + B) / 2);
        var ln = group(bar, "line"); addRect(ln, ww, 5, 0, C.ink); gpos(ln, ww / 2, BAR);
        bar.property("ADBE Root Vectors Group").property(2).moveTo(1);
        // round the top corners of the bar with a mask
        roundedTop(bar, ww, BAR);
        for (var d = 0; d < 3; d++) { var dg = group(bar, "dot" + d); addEllipse(dg, 20, C.white, C.ink, 3); gpos(dg, 34 + d * 34, BAR / 2 + 1); dg.moveTo(1); }
        var tt = text(c, pr.window, BOLD, 26, C.ink, ww / 2, BAR / 2 + 10, "c");
        var rec = text(c, "● REC", BOLD, 20, [0.84, 0.2, 0.42], ww - 90, BAR / 2 + 8);
        O(rec).expression = "Math.sin(time*5) > -0.3 ? 100 : 30";
        // layers were created bottom-up: shadow, frame, footage, bar, title, REC
        return c;
    }
    function allRound(l, w, h, r) {
        var m = l.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        var s = new Shape(), k = 0.5523 * r;
        s.vertices = [[r, 0], [w - r, 0], [w, r], [w, h - r], [w - r, h], [r, h], [0, h - r], [0, r]];
        s.inTangents = [[-k, 0], [0, 0], [0, -k], [0, 0], [k, 0], [0, 0], [0, k], [0, 0]];
        s.outTangents = [[0, 0], [k, 0], [0, 0], [0, k], [0, 0], [-k, 0], [0, 0], [0, -k]];
        s.closed = true; m.property("ADBE Mask Shape").setValue(s);
    }
    function roundedTop(l, w, h) {
        var m = l.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        var s = new Shape(), r = 24, kk = 0.5523 * r;
        s.vertices = [[0, r], [r, 0], [w - r, 0], [w, r], [w, h + 4], [0, h + 4]];
        s.inTangents = [[0, 0], [-kk, 0], [0, 0], [0, -kk], [0, 0], [0, 0]];
        s.outTangents = [[0, -kk], [0, 0], [kk, 0], [0, 0], [0, 0], [0, 0]];
        s.closed = true; m.property("ADBE Mask Shape").setValue(s);
    }
    function buildProject(pr, i) {
        var c = comp("Scene " + (i + 3 < 10 ? "0" : "") + (i + 3) + " - Project " + pr.num + " " + pr.title, pr.dur, fScenes);
        var wc = buildWindow(pr, i);
        var wl = c.layers.add(wc); wl.name = "Window (precomp)";
        P(wl).setValue([1265, 545]);
        keys(S(wl), [[0, [88, 88, 100]], [0.45, [102, 102, 100]], [0.6, [100, 100, 100]]], "out");
        keys(P(wl), [[0, [1265, 625]], [0.6, [1265, 545]], [pr.dur - 0.4, [1265, 545]], [pr.dur, [1305, 545]]], "out");
        keys(O(wl), [[0, 0], [0.3, 100]], "out");
        var Lx = pr.layout;
        var chip = pill(c, "PROJECT " + pr.num, BOLD, 26, C[pr.accent], Lx.chip[0], Lx.chip[1], 22, 8, 4); slideIn(chip, 0.15, -50, 0);
        var title = text(c, Lx.titleText, HEAD, 76, C.ink, Lx.title[0], Lx.title[1], "l", 82); slideIn(title, 0.25, -50, 0);
        var tag = text(c, Lx.tagText, BODY, 32, C.mute, Lx.tag[0], Lx.tag[1], "l", 43); slideIn(tag, 0.4, -50, 0);
        for (var j = 0; j < pr.tools.length; j++) {
            var tl = pill(c, pr.tools[j], BOLD, 24, C.white, Lx.tools[j][0], Lx.tools[j][1], 18, 7, 3);
            slideIn(tl, 0.55 + j * 0.08, -40, 0);
        }
        if (pr.badge) { var bd = pill(c, pr.badge, BOLD, 26, C.gold, Lx.badge[0], Lx.badge[1], 20, 9, 4); slideIn(bd, 0.9, -40, 0); }
        for (var d = 0; d < DATA.projects.length; d++) {
            var dl = shapeLayer(c, "Progress dot " + (d + 1));
            if (d == i) addEllipse(group(dl, "on"), 18, C.ink); else addEllipse(group(dl, "off"), 16, null, C.purple, 3);
            P(dl).setValue([120 + d * 32, 950]); keys(O(dl), [[0, 0], [0.4, 100]], "out");
        }
        return c;
    }

    function buildAward(seg) {
        var c = comp("Scene 09 - Achievement", seg.dur, fScenes);
        var cols = ["pink", "purple", "mint", "peach", "gold"];
        for (var i = 0; i < 60; i++) {
            var cf = shapeLayer(c, "Confetti " + (i + 1));
            addRect(group(cf, "piece"), 12 + (i % 3) * 3, 22 + (i % 4) * 3, 3, C[cols[i % 5]]);
            var x0 = (i * 397) % W, y0 = -40 - ((i * 211) % 900), v = 260 + (i * 37) % 160;
            P(cf).setValue([x0, y0]);
            P(cf).expression = "[value[0] + 30*Math.sin(time*" + (1 + i % 3) + " + " + i + "), value[1] + " + v + "*time]";
            tr(cf).property("ADBE Rotate Z").expression = "time*" + (90 + (i % 5) * 40) + " + " + (i * 23);
        }
        var sh = shapeLayer(c, "Card shadow"); addRect(group(sh, "s"), 1120, 560, 44, C.ink); P(sh).setValue([W / 2 + 20, 580]);
        var card = c.layers.addSolid(C.peach, "Card gradient", 1120, 560, 1, seg.dur); P(card).setValue([W / 2, 560]);
        var rp = card.property("ADBE Effect Parade").addProperty("ADBE Ramp");
        rp.property("ADBE Ramp-0001").setValue([0, 280]); rp.property("ADBE Ramp-0002").setValue(C.peach);
        rp.property("ADBE Ramp-0003").setValue([1120, 280]); rp.property("ADBE Ramp-0004").setValue(C.pink);
        allRound(card, 1120, 560, 44);
        var stroke = shapeLayer(c, "Card outline"); addRect(group(stroke, "o"), 1120, 560, 44, null, C.ink, 6); P(stroke).setValue([W / 2, 560]);
        var cardNull = c.layers.addNull(); cardNull.name = "CARD CONTROL"; P(cardNull).setValue([W / 2, 560]);
        var lab = pill(c, "ACHIEVEMENT UNLOCKED", BOLD, 26, C.white, W / 2, 325, 20, 8, 4, true);
        var t1 = text(c, "2nd Place", HEAD7, 150, C.ink, W / 2, 500, "c");
        var t2 = text(c, "Global Game Jam · CEGA Karachi", HEAD, 54, C.ink, W / 2, 600, "c");
        var t3 = text(c, "Team 5 Braincells  ·  our game: Masketeer", BOLD, 36, C.ink, W / 2, 675, "c");
        var t4 = text(c, "Qualified for the Islamabad round vs CEGA Lahore", BOLD, 30, C.ink, W / 2, 735, "c");
        var parts = [sh, card, stroke, lab, t1, t2, t3, t4];
        for (var p = 0; p < parts.length; p++) { parts[p].parent = cardNull; }
        keys(S(cardNull), [[0, [75, 75, 100]], [0.45, [104, 104, 100]], [0.6, [100, 100, 100]]], "out");
        for (var q = 0; q < parts.length; q++) { keys(O(parts[q]), [[0, 0], [0.3, 100], [seg.dur - 0.35, 100], [seg.dur, 0]], "out"); }
        var tro = c.layers.add(trophy); P(tro).setValue([W / 2 - 690, 300]); popIn(tro, 0.4, 0.5);
        P(tro).expression = "value + [0, 6*Math.sin(time*3)]";
        return c;
    }
    function buildSkills(seg) {
        var c = comp("Scene 10 - Skills", seg.dur, fScenes);
        var t = text(c, "Skills & Tools", HEAD, 110, C.ink, W / 2, 268, "c"); slideIn(t, 0, 0, 30, 0.5);
        var s = text(c, "the toolbox behind every project", BOLD, 40, C.purple, W / 2, 345, "c"); slideIn(s, 0.25, 0, 0, 0.3);
        var cols = ["pink", "mint", "peach", "bg2"];
        for (var i = 0; i < DATA.chips.length; i++) {
            var ch = DATA.chips[i];
            var l = pill(c, ch.t, BOLD, 38, C[cols[i % 4]], ch.x, ch.y, 30, 12, 6, true);
            popIn(l, 0.35 + i * 0.07, 0.35);
            P(l).expression = "value + [0, 4*Math.sin(time*2.5 + " + i + ")]";
        }
        return c;
    }
    function buildOutro(seg) {
        var c = comp("Scene 11 - Outro", seg.dur, fScenes);
        halo(c, 480, 560, C.mint, C.pink);
        addAvatar(c, 480, 1060, 0.3);
        var h = text(c, DATA.outro.headText, HEAD, 86, C.ink, 900, DATA.outro.head, "l", 95); slideIn(h, 0.3, 40, 0, 0.5);
        var pl = [["Explore my projects", "pink"], ["Chat with my AI assistant", "mint"], ["Say hello through the contact form", "peach"]];
        for (var i = 0; i < pl.length; i++) {
            var p = pill(c, pl[i][0], BOLD, 32, C[pl[i][1]], 928, DATA.outro.pills[i]); popIn(p, 0.8 + i * 0.15, 0.4);
        }
        var sig = text(c, "Alizeh Soomro  ·  Game & Animation Developer", BOLD, 34, C.purple, 907, DATA.outro.sig); keys(O(sig), [[1.5, 0], [2, 100]], "out");
        return c;
    }

    // ---------------------------------------------------------------- main comp
    var main = comp("Alizeh_Promo_MAIN", DATA.total, fComps);
    var bgl = main.layers.add(bgc); bgl.name = "Background";
    var pi = 0;
    for (var s = 0; s < DATA.segments.length; s++) {
        var seg = DATA.segments[s], sc;
        if (seg.kind == "intro") sc = buildIntro(seg);
        else if (seg.kind == "section") sc = buildSection(seg);
        else if (seg.kind == "project") { sc = buildProject(seg, pi); pi++; }
        else if (seg.kind == "award") sc = buildAward(seg);
        else if (seg.kind == "skills") sc = buildSkills(seg);
        else sc = buildOutro(seg);
        var L = main.layers.add(sc); L.startTime = seg.start; L.outPoint = seg.start + seg.dur;
    }
    // colour-bar wipes over every cut
    var bh = H / 3, cols3 = ["pink", "purple", "mint"];
    for (var w = 0; w < DATA.cuts.length; w++) {
        var T = DATA.cuts[w];
        for (var b2 = 0; b2 < 3; b2++) {
            var bar = shapeLayer(main, "Wipe " + (w + 1) + "." + (b2 + 1));
            addRect(group(bar, "bar"), 3800, bh + 4, bh / 2, C[cols3[b2]]);
            var y = bh * b2 + bh / 2, t0 = T - 0.32 + 0.64 * (b2 * 0.075 / 1.15), t1 = T - 0.32 + 0.64 * ((1 + b2 * 0.075) / 1.15);
            keys(P(bar), [[t0, [-3900 + 1900, y]], [t1, [1950 + 1900, y]]], "inout");
            bar.inPoint = t0; bar.outPoint = t1;
        }
    }
    var fade = main.layers.addSolid(C.bg, "End fade", W, H, 1, DATA.total);
    keys(O(fade), [[DATA.total - 0.7, 0], [DATA.total, 100]], "linear");
    var mus = main.layers.add(music); mus.name = "Music (original, made for this video)"; mus.moveToEnd();
    main.openInViewer();

    // ---------------------------------------------------------------- render queue + save
    try {
        var rq = proj.renderQueue.items.add(main);
        var om = rq.outputModule(1);
        var tpl = om.templates, pick = null;
        for (var t = 0; t < tpl.length; t++) if (tpl[t].indexOf("H.264") == 0) { pick = tpl[t]; break; }
        if (pick) om.applyTemplate(pick);
        om.file = new File(ROOT.fsName + "/Alizeh_Promo_AE_render.mp4");
    } catch (e) { }
    var out = new File(ROOT.fsName + "/Alizeh_Promo.aep");
    proj.save(out);
    app.endUndoGroup();
    alert("Done! Saved " + out.fsName + "\nPress Ctrl+M (Render Queue) to export the MP4.");
})();
