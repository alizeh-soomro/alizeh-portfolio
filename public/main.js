import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createAvatar } from './avatar.js';

/* ---------- 3D scene ---------- */
const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 1.2, 6);
scene.add(new THREE.HemisphereLight(0xffffff, 0x4433aa, 1.1));
const sun = new THREE.DirectionalLight(0xffe2a0, 2); sun.position.set(3, 5, 4); scene.add(sun);

// colourful sparkles + shapes that react to the mouse.
// They live in a frame around the edges of the screen so they never sit on top of the heading text.
function starGeo(r = .22, depth = .07) {
  const sh = new THREE.Shape();
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + Math.PI / 2, rr = i % 2 ? r * .38 : r; (i ? sh.lineTo : sh.moveTo).call(sh, Math.cos(a) * rr, Math.sin(a) * rr); }
  return new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 2 }).center();
}
const geos = [starGeo(), new THREE.IcosahedronGeometry(.18), new THREE.TorusGeometry(.15, .05, 10, 24), starGeo(.15, .05), new THREE.OctahedronGeometry(.17)];
const palette = [0xff8fc7, 0xb9a2ff, 0x8de3c9, 0xffd0a6, 0xffd36b];
const shapes = [];
// Spots are in screen units (u, v from -1 to 1) so they stay at the edges on any screen size:
// a band between the nav and the heading, a band along the bottom, and thin strips on both sides.
function edgeSpot(i) {
  const r = Math.random;
  if (i < 10) return [-.95 + i * .2 + r() * .08, .68 + r() * .1];
  if (i < 20) return [-.95 + (i - 10) * .2 + r() * .08, -1.0 - r() * .08];
  if (i < 24) return [-.99 + r() * .04, -.6 + (i - 20) * .38];
  return [.92 + r() * .06, -.65 + (i - 24) * .26];
}
const HALF = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
for (let i = 0; i < 30; i++) {
  const m = new THREE.Mesh(geos[i % geos.length], new THREE.MeshStandardMaterial({ color: palette[i % palette.length], roughness: .35, metalness: .1, emissive: palette[i % palette.length], emissiveIntensity: .18 }));
  const [u, v] = edgeSpot(i);
  m.userData = { s: Math.random() * .01 + .004, o: Math.random() * 6, u, v, z: -Math.random() * 1.5 - .3, tw: 1.5 + Math.random() * 2, side: i >= 24 };
  shapes.push(m); scene.add(m);
}

// Alizeh's avatar: the Blender model (avatar.glb) with its Idle + Wave animations.
// The code-built avatar in avatar.js is only a fallback while the file loads or if it is missing.
let rig = createAvatar();
const avatar = new THREE.Group();
avatar.add(rig.root);
avatar.position.set(3.1, -2.1, 0); avatar.scale.setScalar(.95);
scene.add(avatar);
let mixer = null, actions = {}, headBone = null;
function wave() {
  if (rig) return rig.wave();
  if (!actions.Wave) return;
  actions.Wave.reset().setLoop(THREE.LoopOnce).fadeIn(.2).play();
  actions.Idle && actions.Idle.fadeOut(.2);
}
addEventListener('dblclick', wave);
new GLTFLoader().load('avatar.glb', g => {
  rig = null; avatar.clear();
  const model = g.scene; model.scale.setScalar(1.4);   // Blender model is ~1.75 units tall
  model.traverse(o => { if (o.isMesh) { o.frustumCulled = false; if (o.material.transparent) o.material.depthWrite = false; } if (o.isBone && o.name === 'head') headBone = o; });
  avatar.add(model);
  mixer = new THREE.AnimationMixer(model);
  g.animations.forEach(c => actions[c.name] = mixer.clipAction(c));
  if (actions.Wave) { actions.Wave.clampWhenFinished = false; }
  mixer.addEventListener('finished', () => actions.Idle && actions.Idle.reset().fadeIn(.3).play());
  wave();
}, undefined, () => {});

let mx = 0, my = 0, drag = false, lastX = 0, spin = 0;
addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; if (drag) { spin += (e.clientX - lastX) * .01; lastX = e.clientX; } });
addEventListener('pointerdown', e => { if (e.target === document.body || e.target.closest('.hero')) { drag = true; lastX = e.clientX; } });
addEventListener('pointerup', () => drag = false);

let small = false;
const spot = document.getElementById('avatar-spot');
function resize() {
  small = innerWidth < 800;
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  const hw = HALF * 6 * camera.aspect;
  avatar.position.x = small ? -hw + .55 : Math.min(3.1, hw - 1.1); avatar.position.y = small ? -2.55 : -2.0;
  avatar.scale.setScalar(small ? .6 : .95);
}
addEventListener('resize', resize); resize();
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clock = new THREE.Clock();
(function loop() {
  const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
  shapes.forEach(s => {
    const u = s.userData; if (!still) { s.rotation.x += u.s; s.rotation.y += u.s * 1.4; }
    const hh = HALF * (6 - u.z), hw = hh * camera.aspect;   // visible half size at this depth
    s.position.set(u.u * hw - mx * .3, u.v * hh + Math.sin(t + u.o) * .06 + my * .25, u.z);
    s.visible = !small || u.side;   // phones: only the thin side strips, so text stays clean
    s.scale.setScalar((small ? .45 : .72) * (still ? 1 : .85 + .25 * Math.sin(t * u.tw + u.o)));   // twinkle
  });
  camera.position.x += (mx * 1.2 - camera.position.x) * .04;
  camera.position.y += (1.2 - my * 1 - camera.position.y) * .04;
  camera.lookAt(0, 0, 0);
  avatar.rotation.y = spin + (still ? 0 : Math.sin(t * .8) * .4) + mx * .6;
  if (small && spot) {   // phones: pin the avatar to the empty spot under the hero text so it scrolls with the page
    const r = spot.getBoundingClientRect();
    avatar.visible = r.bottom > 0 && r.top < innerHeight;
    if (avatar.visible) {
      const p = new THREE.Vector3((r.left + r.width / 2) / innerWidth * 2 - 1, -(r.bottom - 6) / innerHeight * 2 + 1, .5).unproject(camera);
      const dir = p.sub(camera.position).normalize();
      avatar.position.copy(camera.position).addScaledVector(dir, -camera.position.z / dir.z);
    }
  } else avatar.visible = true;
  if (rig) rig.update(t, mx, my);
  if (mixer) { mixer.update(dt); if (headBone) { headBone.rotation.y += mx * .6; headBone.rotation.x += my * .35; } }
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
})();

/* ---------- Theme ---------- */
const root = document.documentElement;
try { const s = localStorage.getItem('theme'); if (s) root.dataset.theme = s; } catch {}
document.getElementById('theme').onclick = () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
};

/* ---------- Project filter + search ---------- */
let filter = 'all';
const cards = [...document.querySelectorAll('#grid article')];
const apply = () => {
  const q = document.getElementById('search').value.toLowerCase();
  cards.forEach(c => c.hidden = !((filter === 'all' || c.dataset.t.includes(filter)) && c.textContent.toLowerCase().includes(q)));
};
document.querySelectorAll('.filters button').forEach(b => b.onclick = () => {
  document.querySelector('.filters .on').classList.remove('on'); b.classList.add('on'); filter = b.dataset.f; apply();
});
document.getElementById('search').oninput = apply;

/* ---------- Contact form ---------- */
const form = document.getElementById('form'), status = document.getElementById('status');
form.onsubmit = async e => {
  e.preventDefault();
  form.querySelectorAll('.err').forEach(x => x.remove());
  const d = Object.fromEntries(new FormData(form));
  const errs = {};
  if (d.name.trim().length < 2) errs.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errs.email = 'Enter a valid email address.';
  if (d.subject.trim().length < 3) errs.subject = 'Enter a subject.';
  if (d.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
  const show = er => Object.entries(er).forEach(([k, v]) => { const p = document.createElement('div'); p.className = 'err'; p.textContent = v; form.elements[k].after(p); });
  if (Object.keys(errs).length) { show(errs); status.className = 'bad'; status.textContent = 'Please fix the highlighted fields.'; return; }
  status.className = ''; status.textContent = 'Sending...';
  try {
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
    const j = await r.json();
    if (!r.ok) { if (j.errors) show(j.errors); throw new Error(j.error); }
    status.className = 'ok'; status.textContent = 'Message sent. Thank you, I will reply soon.'; form.reset();
  } catch (err) { status.className = 'bad'; status.textContent = err.message || 'Could not send. Try again.'; }
};

/* ---------- Chatbot ---------- */
const chat = document.getElementById('chat'), openB = document.getElementById('chat-open'), log = document.getElementById('log');
const toggle = o => { chat.hidden = !o; openB.hidden = o; openB.setAttribute('aria-expanded', o); if (o) document.getElementById('q').focus(); };
openB.onclick = () => toggle(true); document.getElementById('chat-close').onclick = () => toggle(false);
const bubble = (cls, text) => { const p = document.createElement('p'); p.className = cls; p.textContent = text; log.append(p); log.scrollTop = log.scrollHeight; return p; };
document.getElementById('chat-form').onsubmit = async e => {
  e.preventDefault();
  const qi = document.getElementById('q'), q = qi.value.trim(); if (!q) return;
  bubble('me', q); qi.value = '';
  const wait = bubble('bot', 'Thinking...');
  try {
    const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q }) });
    const j = await r.json(); if (!r.ok) throw new Error(j.error);
    wait.textContent = j.answer;
    j.sources.forEach(s => { const sp = document.createElement('span'); sp.className = 'src'; sp.textContent = 'Source: ' + s.snippet; wait.append(sp); });
  } catch (err) { wait.textContent = err.message || 'Something went wrong. Try again.'; }
};

/* ---------- Scroll progress, active nav link, reveal-on-scroll ---------- */
const bar = document.getElementById('progress');
const links = [...document.querySelectorAll('.nav nav a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
addEventListener('scroll', () => {
  const h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - innerHeight) * 100) + '%';
  let cur = 0; sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === cur && scrollY > 200));
}, { passive: true });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.panel').forEach(p => { p.classList.add('reveal'); io.observe(p); });
