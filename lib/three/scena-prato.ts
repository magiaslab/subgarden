/**
 * Sotto il prato: come funziona la subirrigazione SUBGarden, guidato dallo scroll.
 *
 * Un blocco di terreno a cubetti con l'erba sopra, tagliato come una zolla. Con lo scroll:
 * 0.00–0.25 il prato d'estate, un po' secco, visto dall'alto
 * 0.15–0.40 il terreno diventa trasparente (vista «a raggi X»): restano grani radi
 * 0.25–0.50 sotto il prato si disegnano le ali gocciolanti, poi compaiono i gocciolatori
 * 0.48–0.75 dai gocciolatori l'acqua si allarga nel terreno, più in su che in giù (capillarità)
 * 0.68–0.90 le radici scendono verso l'acqua e l'erba torna verde
 * 0.88–1.00 il terreno si richiude: in superficie resta solo il prato
 * Lo stato finale ha senso anche da fermo: è quello che si vede in giardino.
 */
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  InstancedMesh,
  LineSegments,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  Quaternion,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { cicloVisibile } from './webgl';

export type ApiPrato = { progresso: (p: number) => void; ridimensiona: () => void; distruggi: () => void };

const fase = (p: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Colori dal design system (docs/DESIGN-SYSTEM.md): acqua, rame del Copper Shield, terra.
const ACQUA = new Color('#2090b0');
const RAME = '#8a5220';

/* --- Erba: lame di un triangolo, istanziate, che ondeggiano e passano dal secco al verde --- */
const ERBA_V = /* glsl */ `
  uniform float uTempo;
  uniform float uBassa;
  varying float vAlto;
  varying float vSeme;
  void main() {
    vec4 base = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vSeme = fract(sin(dot(base.xz, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 p = position;
    vAlto = p.y;
    // in vista «a raggi X» l'erba si abbassa, così si vede cosa c'è sotto
    p.y *= 1.0 - 0.7 * uBassa;
    // il vento piega di più la punta
    float v = sin(uTempo * 1.4 + base.x * 1.7 + base.z * 1.3 + vSeme * 6.0) * 0.35 + sin(uTempo * 2.3 + vSeme * 9.0) * 0.15;
    p.x += v * p.y * p.y * 0.35;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.0);
  }
`;
const ERBA_F = /* glsl */ `
  uniform float uVerde;
  varying float vAlto;
  varying float vSeme;
  void main() {
    vec3 seccoBase = vec3(0.42, 0.40, 0.22);
    vec3 seccoPunta = vec3(0.78, 0.70, 0.40);
    vec3 verdeBase = vec3(0.16, 0.33, 0.14);
    vec3 verdePunta = vec3(0.48, 0.70, 0.27);
    // non tutto il prato cambia insieme: ogni filo ha il suo momento
    float verde = clamp(uVerde * 1.4 - vSeme * 0.4, 0.0, 1.0);
    vec3 base = mix(seccoBase, verdeBase, verde);
    vec3 punta = mix(seccoPunta, verdePunta, verde);
    vec3 c = mix(base, punta, vAlto) * (0.8 + vSeme * 0.3);
    gl_FragColor = vec4(c, 1.0);
  }
`;

/* --- Acqua: punti che si allargano attorno ai gocciolatori --- */
const ACQUA_V = /* glsl */ `
  attribute vec3 aDir;
  attribute float aSeme;
  uniform float uAcqua;
  uniform float uTempo;
  uniform float uPixel;
  uniform vec2 uMezzo;
  varying float vCiclo;
  void main() {
    // ogni goccia esce dal gocciolatore, si allontana e sfuma, poi riparte: un flusso
    // continuo. Il raggio massimo cresce con lo scroll: il bulbo bagnato si allarga.
    float ciclo = fract(uTempo * 0.32 + aSeme * 1.7);
    float r = ciclo * (0.15 + 0.85 * uAcqua) * (0.55 + 0.45 * aSeme);
    vec3 p = position + aDir * r * 1.05;
    // l'acqua resta dentro la zolla e sotto il prato
    p.x = clamp(p.x, -uMezzo.x, uMezzo.x);
    p.z = clamp(p.z, -uMezzo.y, uMezzo.y);
    p.y = clamp(p.y, -1.9, -0.05);
    vCiclo = ciclo;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (110.0 - 55.0 * ciclo) * (0.7 + 0.3 * aSeme) * uPixel / -mv.z;
  }
`;
const ACQUA_F = /* glsl */ `
  uniform vec3 uColore;
  uniform float uOpacita;
  varying float vCiclo;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // goccia piena vicino al gocciolatore, che si dissolve allontanandosi
    float a = smoothstep(0.5, 0.0, d) * uOpacita * (1.0 - vCiclo) * smoothstep(0.0, 0.08, vCiclo);
    vec3 c = mix(uColore, vec3(0.75, 0.92, 1.0), (1.0 - vCiclo) * 0.35 * smoothstep(0.35, 0.0, d));
    gl_FragColor = vec4(c, a);
  }
`;

/* --- Radici: segmenti che crescono dalla superficie verso il basso --- */
const RADICI_V = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const RADICI_F = /* glsl */ `
  uniform float uCrescita;
  uniform float uOpacita;
  varying float vT;
  void main() {
    if (vT > uCrescita) discard;
    vec3 c = mix(vec3(0.30, 0.22, 0.13), vec3(0.78, 0.68, 0.50), vT);
    gl_FragColor = vec4(c, uOpacita);
  }
`;

export function creaPrato(contenitore: HTMLElement, leggera: boolean): ApiPrato | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  const pixel = Math.min(window.devicePixelRatio || 1, leggera ? 1.5 : 2);
  renderer.setPixelRatio(pixel);
  renderer.setClearColor(0x000000, 0);
  contenitore.appendChild(renderer.domElement);

  const scena = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 80);
  scena.add(new HemisphereLight(0xfff6e6, 0x3a3226, 1.6));
  const sole = new DirectionalLight(0xffffff, 2.2);
  sole.position.set(-4, 8, 5);
  scena.add(sole);

  const mondo = new Group();
  scena.add(mondo);

  // --- Terreno a cubetti: x da sinistra a destra, y dalla superficie in giù, z in profondità
  const L = leggera ? 0.3 : 0.25;
  const W = 6;
  const D = 3.6;
  const NX = Math.round(W / L);
  const NZ = Math.round(D / L);
  const NY = 7;
  const x0 = -W / 2 + L / 2;
  const z0 = -D / 2 + L / 2;
  const strato = (iy: number) => {
    if (iy < 2) return new Color('#5e4630');
    if (iy < 4) return new Color('#7d6142');
    return new Color('#9d8460');
  };
  const celle: { p: Vector3; c: Color; seme: number; zLinea: number }[] = [];
  for (let ix = 0; ix < NX; ix++)
    for (let iy = 0; iy < NY; iy++)
      for (let iz = 0; iz < NZ; iz++)
        celle.push({
          p: new Vector3(x0 + ix * L, -iy * L - L / 2, z0 + iz * L),
          c: strato(iy).multiplyScalar(0.85 + Math.random() * 0.25),
          seme: Math.random(),
          zLinea: 0,
        });
  const matTerra = new MeshStandardMaterial({ roughness: 0.95 });
  const terra = new InstancedMesh(new BoxGeometry(L * 0.96, L * 0.96, L * 0.96), matTerra, celle.length);
  mondo.add(terra);
  const m = new Matrix4();
  const q = new Quaternion();
  const sc = new Vector3();
  celle.forEach((c, i) => {
    m.compose(c.p, q, sc.setScalar(1));
    terra.setMatrixAt(i, m);
    terra.setColorAt(i, c.c);
  });

  // --- Erba sulla superficie
  const NE = leggera ? 3500 : 8000;
  const geoLama = new BufferGeometry();
  geoLama.setAttribute('position', new BufferAttribute(new Float32Array([-0.5, 0, 0, 0.5, 0, 0, 0, 1, 0]), 3));
  const matErba = new ShaderMaterial({
    vertexShader: ERBA_V,
    fragmentShader: ERBA_F,
    side: DoubleSide,
    uniforms: { uTempo: { value: 0 }, uVerde: { value: 0 }, uBassa: { value: 0 } },
  });
  const erba = new InstancedMesh(geoLama, matErba, NE);
  const qq = new Quaternion();
  const asse = new Vector3(0, 1, 0);
  for (let i = 0; i < NE; i++) {
    qq.setFromAxisAngle(asse, Math.random() * Math.PI);
    m.compose(
      new Vector3((Math.random() - 0.5) * W * 0.99, 0, (Math.random() - 0.5) * D * 0.99),
      qq,
      new Vector3(0.03 + Math.random() * 0.02, 0.09 + Math.random() * 0.1, 1),
    );
    erba.setMatrixAt(i, m);
  }
  erba.frustumCulled = false;
  mondo.add(erba);

  // --- Ali gocciolanti: parallele lungo x, poco sotto il prato
  const NL = 5;
  const profLinea = -0.62;
  const zLinee = Array.from({ length: NL }, (_, i) => -D / 2 + (D / NL) * (i + 0.5));
  // per ogni grano, quanto è lontano dall'ala più vicina (le ali corrono lungo x, quindi
  // conta solo la sezione y-z); sopra l'ala la distanza pesa meno: l'acqua sale per capillarità
  const distanze = celle.map((c) => {
    let min = Infinity;
    for (const z of zLinee) {
      const dy = c.p.y - profLinea;
      const d = Math.hypot(dy > 0 ? dy * 0.7 : dy * 1.25, c.p.z - z);
      if (d < min) min = d;
    }
    return min;
  });
  const geoLinea = new CylinderGeometry(0.035, 0.035, W, 12);
  geoLinea.rotateZ(Math.PI / 2);
  const matLinea = new MeshStandardMaterial({ color: RAME, roughness: 0.5, metalness: 0.35 });
  const linee = zLinee.map((z) => {
    const linea = new Mesh(geoLinea, matLinea);
    linea.position.set(0, profLinea, z);
    mondo.add(linea);
    return linea;
  });

  // --- Gocciolatori lungo le ali
  const passo = 0.33;
  const perLinea = Math.floor(W / passo);
  const gocciolatori: Vector3[] = [];
  zLinee.forEach((z) => {
    for (let k = 0; k < perLinea; k++) gocciolatori.push(new Vector3(-W / 2 + passo / 2 + k * passo, profLinea, z));
  });
  const matGoccia = new MeshStandardMaterial({ color: ACQUA, emissive: ACQUA, emissiveIntensity: 0.4 });
  const gocce = new InstancedMesh(new SphereGeometry(0.05, 10, 8), matGoccia, gocciolatori.length);
  mondo.add(gocce);

  // --- Acqua attorno ai gocciolatori
  const perGoccia = leggera ? 18 : 34;
  const NA = gocciolatori.length * perGoccia;
  const posA = new Float32Array(NA * 3);
  const dirA = new Float32Array(NA * 3);
  const semiA = new Float32Array(NA);
  let k = 0;
  for (const g of gocciolatori)
    for (let j = 0; j < perGoccia; j++) {
      posA.set([g.x, g.y, g.z], k * 3);
      // direzione casuale, schiacciata in profondità e spinta verso l'alto: la capillarità
      const v = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
      v.y = v.y > 0 ? v.y * 1.25 : v.y * 0.7;
      v.z *= 0.9;
      dirA.set([v.x, v.y, v.z], k * 3);
      semiA[k] = Math.random();
      k++;
    }
  const geoA = new BufferGeometry();
  geoA.setAttribute('position', new BufferAttribute(posA, 3));
  geoA.setAttribute('aDir', new BufferAttribute(dirA, 3));
  geoA.setAttribute('aSeme', new BufferAttribute(semiA, 1));
  const matA = new ShaderMaterial({
    vertexShader: ACQUA_V,
    fragmentShader: ACQUA_F,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uAcqua: { value: 0 },
      uTempo: { value: 0 },
      uPixel: { value: pixel },
      uOpacita: { value: 0 },
      uColore: { value: new Vector3(ACQUA.r, ACQUA.g, ACQUA.b) },
      uMezzo: { value: new Vector2(W / 2 - 0.05, D / 2 - 0.05) },
    },
  });
  const acqua = new Points(geoA, matA);
  acqua.frustumCulled = false;
  mondo.add(acqua);

  // --- Radici: spezzate che scendono dalla superficie
  const NR = leggera ? 90 : 180;
  const SEG = 7;
  const posR: number[] = [];
  const tR: number[] = [];
  for (let i = 0; i < NR; i++) {
    let x = (Math.random() - 0.5) * W * 0.96;
    let z = (Math.random() - 0.5) * D * 0.96;
    let y = -0.02;
    const fondo = 0.45 + Math.random() * 0.75;
    for (let s = 0; s < SEG; s++) {
      const nx = x + (Math.random() - 0.5) * 0.12;
      const nz = z + (Math.random() - 0.5) * 0.12;
      const ny = y - fondo / SEG;
      posR.push(x, y, z, nx, ny, nz);
      tR.push(s / SEG, (s + 1) / SEG);
      x = nx;
      y = ny;
      z = nz;
    }
  }
  const geoR = new BufferGeometry();
  geoR.setAttribute('position', new BufferAttribute(new Float32Array(posR), 3));
  geoR.setAttribute('aT', new BufferAttribute(new Float32Array(tR), 1));
  const matR = new ShaderMaterial({
    vertexShader: RADICI_V,
    fragmentShader: RADICI_F,
    transparent: true,
    depthWrite: false,
    uniforms: { uCrescita: { value: 0.3 }, uOpacita: { value: 0 } },
  });
  const radici = new LineSegments(geoR, matR);
  radici.frustumCulled = false;
  mondo.add(radici);

  // Colori dei grani in vista «a raggi X»: più chiari, come sabbia rada
  const chiaro = new Color('#e9dfcc');
  const bagnato = new Color('#1f86ad');
  const tmp = new Color();
  let ultimoRaggi = -1;
  let ultimaAcqua = -1;

  let prog = 0;
  const mira = { x: 0, y: 0 };
  const att = { x: 0, y: 0 };
  const punta = (e: PointerEvent) => {
    mira.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
    mira.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
  };
  window.addEventListener('pointermove', punta, { passive: true });

  const p = new Vector3();
  const disegna = (t: number) => {
    const raggi = fase(prog, 0.15, 0.36) * (1 - fase(prog, 0.88, 0.99));
    const a = fase(prog, 0.44, 0.72);

    // terreno: i cubetti si riducono a grani radi e schiariscono; quelli in alto un po' prima
    if (Math.abs(raggi - ultimoRaggi) > 0.002 || Math.abs(a - ultimaAcqua) > 0.002) {
      ultimoRaggi = raggi;
      ultimaAcqua = a;
      // raggio della zona bagnata attorno a ogni ala
      const bulbo = 0.1 + 0.42 * a;
      celle.forEach((c, i) => {
        const r = Math.min(1, raggi * (1.1 + c.seme * 0.3));
        // terreno bagnato attorno alle ali: i grani umidi si gonfiano, come terra che si
        // compatta, e formano un manicotto blu che si allarga con lo scroll
        const umido = a > 0 ? Math.max(0, 1 - distanze[i] / bulbo) : 0;
        const s = Math.max(1 - 0.88 * r, Math.min(1, umido * 1.4) * 0.5 * raggi);
        // i grani si spostano un poco dalla griglia: sabbia rada, non una scacchiera
        p.set(c.p.x + (c.seme - 0.5) * L * 0.7 * r, c.p.y + (((c.seme * 7) % 1) - 0.5) * L * 0.7 * r, c.p.z + (((c.seme * 13) % 1) - 0.5) * L * 0.7 * r);
        m.compose(p, q, sc.setScalar(Math.max(0.0001, s)));
        terra.setMatrixAt(i, m);
        tmp.copy(c.c).lerp(chiaro, r * 0.55);
        // blu vicino all'ala, sfuma verso il bordo del bulbo; a zolla richiusa resta appena
        // un velo di umido: il terreno è irrigato, non allagato
        if (umido > 0) tmp.lerp(bagnato, Math.min(1, umido * 1.6) * (0.04 + 0.8 * raggi));
        terra.setColorAt(i, tmp);
      });
      terra.instanceMatrix.needsUpdate = true;
      if (terra.instanceColor) terra.instanceColor.needsUpdate = true;
    }

    // ali gocciolanti: si disegnano da sinistra, una dopo l'altra
    linee.forEach((linea, i) => {
      const g = fase(prog, 0.26 + i * 0.03, 0.4 + i * 0.03);
      linea.visible = g > 0.002;
      linea.scale.x = Math.max(0.0001, g);
      linea.position.x = -W / 2 + (W * g) / 2;
    });

    // gocciolatori: compaiono in fila, poi pulsano piano mentre esce l'acqua
    const goccia = fase(prog, 0.4, 0.52);
    gocciolatori.forEach((g, i) => {
      const ordine = (i % perLinea) / perLinea;
      const s = Math.min(1, Math.max(0, goccia * 1.6 - ordine * 0.6)) * (1 + 0.15 * Math.sin(t * 3 + i));
      p.copy(g);
      m.compose(p, q, sc.setScalar(Math.max(0.0001, s)));
      gocce.setMatrixAt(i, m);
    });
    gocce.instanceMatrix.needsUpdate = true;
    gocce.visible = goccia > 0.002 && raggi > 0.05;

    // acqua: il bulbo cresce attorno a ogni gocciolatore
    matA.uniforms.uAcqua.value = a;
    matA.uniforms.uTempo.value = t;
    // l'acqua si vede solo a terreno trasparente: quando la zolla si richiude, sparisce
    matA.uniforms.uOpacita.value = Math.min(1, a * 2.5) * raggi;

    // radici: scendono verso l'acqua; si vedono solo a terreno trasparente
    matR.uniforms.uCrescita.value = 0.3 + 0.7 * fase(prog, 0.66, 0.88);
    matR.uniforms.uOpacita.value = raggi * 0.9;

    // il prato torna verde
    matErba.uniforms.uVerde.value = fase(prog, 0.7, 0.92);
    matErba.uniforms.uTempo.value = t;
    matErba.uniforms.uBassa.value = raggi;

    // camera: dall'alto sul prato, poi più bassa per vedere sotto, poi di nuovo sul prato
    att.x += (mira.x - att.x) * 0.05;
    att.y += (mira.y - att.y) * 0.05;
    const gira = -0.5 + att.x + prog * 0.45;
    const alto = 6 - 2.2 * fase(prog, 0.12, 0.4) - 1.6 * fase(prog, 0.42, 0.6) + 2.8 * fase(prog, 0.86, 1) - att.y * 2;
    const d = leggera ? 12.5 : 10.8;
    camera.position.set(Math.sin(gira) * d, alto, Math.cos(gira) * d);
    camera.lookAt(0, -0.7, 0);
    renderer.render(scena, camera);
  };
  const ciclo = cicloVisibile(contenitore, disegna);

  const ridimensiona = () => {
    const w = contenitore.clientWidth;
    const h = contenitore.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // il blocco deve stare tutto nella tela, anche quando è stretta e alta
    camera.fov = w / h < 0.9 ? 46 : w / h < 1.4 ? 38 : 31;
    camera.updateProjectionMatrix();
    ciclo.una();
  };
  ridimensiona();

  return {
    progresso(v) {
      prog = Math.max(0, Math.min(1, v));
    },
    ridimensiona,
    distruggi() {
      ciclo.ferma();
      window.removeEventListener('pointermove', punta);
      scena.traverse((o) => {
        const x = o as Mesh;
        x.geometry?.dispose();
        (x.material as MeshStandardMaterial | undefined)?.dispose?.();
      });
      terra.dispose();
      erba.dispose();
      gocce.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
