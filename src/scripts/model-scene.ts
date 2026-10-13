import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type MountOptions = {
  reducedMotion?: boolean;
};

export type ModelSceneHandle = {
  reset: () => void;
  dispose: () => void;
};

const COLORS = {
  ground: 0x232830,
  plaza: 0xd3d0c8,
  concrete: 0xdcd9d2,
  concreteDark: 0xb7b3aa,
  glass: 0x93bad8,
  gold: 0xc7974a,
  road: 0x1b1f26,
  foliage: 0x52704b,
  foliageLight: 0x6d8a5f,
  trunk: 0x6b5744,
  water: 0x3d6d86,
  car: 0x39404a,
};

const concreteMat = (color: number = COLORS.concrete) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0.02 });

const glassMat = () =>
  new THREE.MeshStandardMaterial({
    color: COLORS.glass,
    roughness: 0.12,
    metalness: 0.35,
    emissive: new THREE.Color(0x1d3446),
    emissiveIntensity: 0.45,
  });

const goldMat = () =>
  new THREE.MeshStandardMaterial({ color: COLORS.gold, roughness: 0.35, metalness: 0.72 });

type TowerSpec = {
  width: number;
  depth: number;
  floors: number;
  floorHeight: number;
  x: number;
  z: number;
  rotation?: number;
};

function buildTower(spec: TowerSpec): THREE.Group {
  const group = new THREE.Group();
  const { width, depth, floors, floorHeight, x, z, rotation = 0 } = spec;

  const slabH = floorHeight * 0.3;
  const glassH = floorHeight * 0.7;
  const podiumH = floorHeight * 1.4;

  const podium = new THREE.Mesh(new THREE.BoxGeometry(width, podiumH, depth), concreteMat());
  podium.position.y = podiumH / 2;
  podium.castShadow = true;
  podium.receiveShadow = true;
  group.add(podium);

  const lobby = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.3, podiumH * 0.6, depth - 0.3),
    glassMat()
  );
  lobby.position.y = podiumH * 0.42;
  group.add(lobby);

  for (let i = 0; i < floors; i += 1) {
    const y = podiumH + i * floorHeight;

    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(width - 0.34, glassH, depth - 0.34),
      glassMat()
    );
    glass.position.y = y + glassH / 2;
    group.add(glass);

    const slab = new THREE.Mesh(new THREE.BoxGeometry(width, slabH, depth), concreteMat());
    slab.position.y = y + glassH + slabH / 2;
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);
  }

  const topY = podiumH + floors * floorHeight;
  const parapet = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.14, 0.12, depth + 0.14),
    goldMat()
  );
  parapet.position.y = topY + 0.06;
  group.add(parapet);

  group.position.set(x, 0, z);
  group.rotation.y = rotation;
  return group;
}

function buildTree(x: number, z: number, scale = 1): THREE.Group {
  const group = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.13, 0.9, 8),
    new THREE.MeshStandardMaterial({ color: COLORS.trunk, roughness: 1 })
  );
  trunk.position.y = 0.45;
  trunk.castShadow = true;
  group.add(trunk);

  const foliage = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 14, 12),
    new THREE.MeshStandardMaterial({ color: COLORS.foliage, roughness: 1 })
  );
  foliage.position.y = 1.25;
  foliage.scale.set(1, 1.15, 1);
  foliage.castShadow = true;
  group.add(foliage);

  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 12, 10),
    new THREE.MeshStandardMaterial({ color: COLORS.foliageLight, roughness: 1 })
  );
  crown.position.set(0.26, 1.55, 0.1);
  crown.castShadow = true;
  group.add(crown);

  group.position.set(x, 0.3, z);
  group.scale.setScalar(scale);
  return group;
}

function buildContextBlock(x: number, z: number, w: number, h: number, d: number): THREE.Group {
  const group = new THREE.Group();

  const base = new THREE.Mesh(new THREE.BoxGeometry(w, h * 0.55, d), concreteMat(COLORS.concreteDark));
  base.position.y = (h * 0.55) / 2;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  const upper = new THREE.Mesh(new THREE.BoxGeometry(w - 0.24, h * 0.45, d - 0.24), glassMat());
  upper.position.y = h * 0.55 + (h * 0.45) / 2;
  upper.castShadow = true;
  group.add(upper);

  group.position.set(x, 0, z);
  return group;
}

function buildScene(): THREE.Group {
  const root = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(20, 64),
    new THREE.MeshStandardMaterial({ color: COLORS.ground, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);

  const plaza = new THREE.Mesh(new THREE.BoxGeometry(12, 0.3, 12), concreteMat(COLORS.plaza));
  plaza.position.y = 0.15;
  plaza.castShadow = true;
  plaza.receiveShadow = true;
  root.add(plaza);

  const road = new THREE.Mesh(
    new THREE.BoxGeometry(12, 0.06, 2.4),
    new THREE.MeshStandardMaterial({ color: COLORS.road, roughness: 0.95 })
  );
  road.position.set(0, 0.31, -3.4);
  root.add(road);

  const dashMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d0, roughness: 1 });
  for (let i = -4; i <= 4; i += 1) {
    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.12), dashMat);
    dash.position.set(i * 1.2, 0.35, -3.4);
    root.add(dash);
  }

  const pool = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.06, 1.8),
    new THREE.MeshStandardMaterial({ color: COLORS.water, roughness: 0.18, metalness: 0.3 })
  );
  pool.position.set(-3.6, 0.33, 2.9);
  root.add(pool);

  root.add(buildTower({ width: 2.7, depth: 2.2, floors: 9, floorHeight: 0.62, x: 0.5, z: 0.5 }));
  root.add(
    buildTower({ width: 2.0, depth: 2.0, floors: 5, floorHeight: 0.6, x: -3.2, z: -0.7, rotation: 0.26 })
  );
  root.add(
    buildTower({ width: 1.7, depth: 1.7, floors: 3, floorHeight: 0.58, x: 3.5, z: 2.3, rotation: -0.42 })
  );

  root.add(buildContextBlock(-8.2, -4.8, 2.2, 3.4, 2.0));
  root.add(buildContextBlock(8.0, -3.4, 1.8, 2.6, 1.6));
  root.add(buildContextBlock(-8.6, 3.9, 2.0, 4.2, 1.8));
  root.add(buildContextBlock(7.4, 4.8, 2.4, 2.8, 2.2));

  const treeSpecs: Array<[number, number, number]> = [
    [-4.6, 4.4, 1],
    [4.8, -0.2, 0.95],
    [-1.6, 4.9, 0.85],
    [2.6, 4.4, 0.9],
    [-5.4, -2.6, 0.85],
    [4.2, 4.6, 0.8],
    [-2.4, -4.8, 0.8],
  ];
  for (const [x, z, s] of treeSpecs) root.add(buildTree(x, z, s));

  const carMat = new THREE.MeshStandardMaterial({ color: COLORS.car, roughness: 0.5, metalness: 0.3 });
  for (const cx of [-4.2, -1.5, 1.4, 4.1]) {
    const car = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.34, 0.5), carMat);
    car.position.set(cx, 0.4, -2.9);
    car.castShadow = true;
    root.add(car);
  }

  root.rotation.y = -0.35;
  return root;
}

export function mountModelScene(
  container: HTMLElement,
  options: MountOptions = {}
): ModelSceneHandle {
  const canvas = container.querySelector<HTMLCanvasElement>("[data-hero-canvas]");
  const reducedMotion = options.reducedMotion ?? false;
  const autoRotateEnabled = !reducedMotion;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas ?? undefined,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  if (!canvas) {
    renderer.domElement.className = "hero3d__canvas";
    renderer.domElement.setAttribute("data-hero-canvas", "");
    container.prepend(renderer.domElement);
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
  const homePosition = new THREE.Vector3(10.5, 8.6, 12.5);
  const homeTarget = new THREE.Vector3(0, 2.6, 0);
  camera.position.copy(homePosition);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(homeTarget);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 9;
  controls.maxDistance = 26;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = Math.PI / 2.15;
  controls.autoRotate = autoRotateEnabled;
  controls.autoRotateSpeed = 0.6;
  controls.update();

  const model = buildScene();
  scene.add(model);

  const hemi = new THREE.HemisphereLight(0xbfd0e4, 0x2a2620, 1.1);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff2df, 2.7);
  key.position.set(9, 14, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -14;
  key.shadow.camera.right = 14;
  key.shadow.camera.top = 14;
  key.shadow.camera.bottom = -14;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 45;
  key.shadow.bias = -0.0004;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x9fb6d6, 0.75);
  fill.position.set(-8, 6, -6);
  scene.add(fill);

  const rim = new THREE.PointLight(0xc7974a, 22, 40, 2);
  rim.position.set(-6, 5.5, 8);
  scene.add(rim);

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let tween:
    | {
        fromP: THREE.Vector3;
        toP: THREE.Vector3;
        fromT: THREE.Vector3;
        toT: THREE.Vector3;
        t0: number;
        dur: number;
      }
    | null = null;

  let resumeId = 0;

  const reset = () => {
    tween = {
      fromP: camera.position.clone(),
      toP: homePosition.clone(),
      fromT: controls.target.clone(),
      toT: homeTarget.clone(),
      t0: performance.now(),
      dur: 650,
    };
    window.clearTimeout(resumeId);
    controls.autoRotate = false;
  };

  controls.addEventListener("start", () => {
    window.clearTimeout(resumeId);
    controls.autoRotate = false;
  });

  controls.addEventListener("end", () => {
    if (!autoRotateEnabled) return;
    window.clearTimeout(resumeId);
    resumeId = window.setTimeout(() => {
      controls.autoRotate = true;
    }, 2600);
  });

  let rafId = 0;
  let running = false;

  const frame = () => {
    rafId = requestAnimationFrame(frame);

    if (tween) {
      const p = Math.min(1, (performance.now() - tween.t0) / tween.dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      camera.position.lerpVectors(tween.fromP, tween.toP, e);
      controls.target.lerpVectors(tween.fromT, tween.toT, e);
      if (p >= 1) {
        tween = null;
        if (autoRotateEnabled) {
          resumeId = window.setTimeout(() => {
            controls.autoRotate = true;
          }, 1500);
        }
      }
    }

    controls.update();
    renderer.render(scene, camera);
  };

  const start = () => {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) start();
      else stop();
    },
    { threshold: 0.01 }
  );
  io.observe(container);

  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onLost = (event: Event) => {
    event.preventDefault();
    container.dataset.state = "fallback";
    stop();
  };
  renderer.domElement.addEventListener("webglcontextlost", onLost);

  start();

  const dispose = () => {
    stop();
    window.clearTimeout(resumeId);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    renderer.domElement.removeEventListener("webglcontextlost", onLost);
    controls.dispose();
    model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(material)) material.forEach((m) => m.dispose());
      else material?.dispose();
    });
    renderer.dispose();
  };

  return { reset, dispose };
}
