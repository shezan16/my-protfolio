import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroGridBackgroundProps {
  className?: string;
}

interface TileState {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  vRotX: number;
  vRotY: number;
  glow: number;
  vGlow: number;
}

function createRoundedTileGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w * 0.45, h * 0.45);

  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
  });

  geometry.center();
  return geometry;
}

function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color("#251720");

  // Matching plum-rose overhead reflection strip
  const topCard = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 2.4),
    new THREE.MeshBasicMaterial({ color: 0xb57782, side: THREE.DoubleSide })
  );
  topCard.position.set(1.5, 7, 5);
  topCard.rotation.x = Math.PI * 0.42;
  envScene.add(topCard);

  // Deep plum side fill matching #251720
  const leftFill = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 7),
    new THREE.MeshBasicMaterial({ color: 0x4a2c3b, side: THREE.DoubleSide })
  );
  leftFill.position.set(-8, -1, 3.5);
  leftFill.rotation.y = Math.PI * 0.35;
  envScene.add(leftFill);

  // Matching warm rose-plum accent card
  const accentCard = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 6),
    new THREE.MeshBasicMaterial({ color: 0xc97b7c, side: THREE.DoubleSide })
  );
  accentCard.position.set(6, -2, 3);
  accentCard.rotation.y = -Math.PI * 0.32;
  envScene.add(accentCard);

  const envRT = pmrem.fromScene(envScene, 0.035);
  pmrem.dispose();

  envScene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose();
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });

  return envRT.texture;
}

function createInnerGapLightTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 6, 128, 128, 122);
    // Warm rose-plum inner light that harmonizes with #251720
    grad.addColorStop(0, "rgba(224, 146, 144, 0.92)");
    grad.addColorStop(0.32, "rgba(176, 102, 112, 0.56)");
    grad.addColorStop(0.68, "rgba(110, 58, 72, 0.18)");
    grad.addColorStop(1, "rgba(110, 58, 72, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function HeroGridBackground({
  className = "",
}: HeroGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{
    ndcX: number;
    ndcY: number;
    active: boolean;
  }>({
    ndcX: 0,
    ndcY: 0,
    active: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#251720");
    scene.fog = new THREE.FogExp2("#251720", 0.016);

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 12.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const envMap = createStudioEnvMap(renderer);
    scene.environment = envMap;
    scene.environmentIntensity = 0.52;

    // Balanced studio lighting for #251720 tiles
    const ambientLight = new THREE.AmbientLight(0x523142, 1.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf5d6dc, 1.05);
    keyLight.position.set(4, 7, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb87988, 0.45);
    rimLight.position.set(-7, -4, 6);
    scene.add(rimLight);

    // Inner light source that illuminates the gaps when tiles separate
    const innerLight = new THREE.PointLight(0xd98a8a, 0, 10, 1.6);
    innerLight.position.set(0, 0, 0.4);
    scene.add(innerLight);

    // Light plane sitting just behind the tiles so it shines through when tiles separate (faak)
    const gapLightTex = createInnerGapLightTexture();
    const gapLightMat = new THREE.MeshBasicMaterial({
      map: gapLightTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const gapLightGeo = new THREE.PlaneGeometry(7.2, 7.2);
    const gapLightMesh = new THREE.Mesh(gapLightGeo, gapLightMat);
    gapLightMesh.position.set(0, 0, -0.18);
    scene.add(gapLightMesh);

    // Instanced 3D rounded tiles matching #251720
    const tileW = 1.02;
    const tileH = 1.02;
    const tileDepth = 0.24;
    const tileGap = 0.065;
    const stepX = tileW + tileGap;
    const stepY = tileH + tileGap;

    const tileGeo = createRoundedTileGeometry(tileW, tileH, tileDepth, 0.175);

    const cols = 30;
    const rows = 20;
    const count = cols * rows;

    const tileMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.34,
      metalness: 0.38,
      emissive: new THREE.Color(0x9e5662),
      emissiveIntensity: 0.12,
    });

    const instancedTiles = new THREE.InstancedMesh(tileGeo, tileMaterial, count);
    instancedTiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedTiles);

    const startX = -((cols - 1) * stepX) / 2;
    const startY = -((rows - 1) * stepY) / 2;

    const states: TileState[] = [];
    // Exact swatch base (#251720) -> matching warm plum-rose -> soft rose-coral inner glow
    const baseSwatch = new THREE.Color(0x251720);
    const midMatchingRose = new THREE.Color(0x753b48);
    const innerLightGlow = new THREE.Color(0xd68482);
    const tempColor = new THREE.Color();

    const dummy = new THREE.Object3D();
    const euler = new THREE.Euler();
    const quat = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3(1, 1, 1);
    const mat4 = new THREE.Matrix4();

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * stepX;
        const y = startY + r * stepY;

        states.push({
          baseX: x,
          baseY: y,
          x,
          y,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          rotX: 0,
          rotY: 0,
          vRotX: 0,
          vRotY: 0,
          glow: 0,
          vGlow: 0,
        });

        dummy.position.set(x, y, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        instancedTiles.setMatrixAt(idx, dummy.matrix);
        instancedTiles.setColorAt(idx, baseSwatch);
        idx++;
      }
    }

    instancedTiles.instanceMatrix.needsUpdate = true;
    if (instancedTiles.instanceColor) {
      instancedTiles.instanceColor.needsUpdate = true;
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      pointerRef.current = {
        ndcX: x,
        ndcY: y,
        active: true,
      };
    };

    const onMouseLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;
    let isVisible = true;
    let smoothWx = 0;
    let smoothWy = 0;
    let smoothCamX = 0;
    let smoothCamY = 0;
    let gapLightStrength = 0;

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        clock.getDelta();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const getPointerWorld = () => {
      const halfHeight =
        Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.position.z;
      const halfWidth = halfHeight * camera.aspect;
      return {
        wx: pointerRef.current.ndcX * halfWidth,
        wy: pointerRef.current.ndcY * halfHeight,
      };
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const rawDelta = clock.getDelta();
      const dt = Math.min(rawDelta, 0.05) * 60;

      const { wx, wy } = getPointerWorld();
      const pointerLerp = 1 - Math.pow(0.83, dt);
      smoothWx += (wx - smoothWx) * pointerLerp;
      smoothWy += (wy - smoothWy) * pointerLerp;

      // Subtle camera parallax on pointer move
      const targetCamX = pointerRef.current.active ? pointerRef.current.ndcX * 0.22 : 0;
      const targetCamY = pointerRef.current.active ? pointerRef.current.ndcY * 0.18 : 0;
      smoothCamX += (targetCamX - smoothCamX) * Math.min(1, 0.055 * dt);
      smoothCamY += (targetCamY - smoothCamY) * Math.min(1, 0.055 * dt);
      camera.position.x = smoothCamX;
      camera.position.y = smoothCamY;
      camera.lookAt(smoothCamX * 0.2, smoothCamY * 0.2, 0);

      // Position inner gap light right behind the cursor-separated tiles
      gapLightMesh.position.x += (smoothWx - gapLightMesh.position.x) * Math.min(1, 0.18 * dt);
      gapLightMesh.position.y += (smoothWy - gapLightMesh.position.y) * Math.min(1, 0.18 * dt);
      innerLight.position.set(gapLightMesh.position.x, gapLightMesh.position.y, 0.35);

      const influenceRadius = 3.4;
      const spring = 0.13 * dt;
      const damping = Math.pow(0.79, dt);
      const glowSpring = 0.15 * dt;
      const glowDamping = Math.pow(0.77, dt);

      let anyColorDirty = false;
      let maxLocalSeparation = 0;

      for (let i = 0; i < count; i++) {
        const t = states[i];

        let targetX = t.baseX;
        let targetY = t.baseY;
        let targetZ = 0;
        let targetRotX = 0;
        let targetRotY = 0;
        let targetGlow = 0;

        if (pointerRef.current.active) {
          const dx = t.baseX - smoothWx;
          const dy = t.baseY - smoothWy;
          const dist = Math.hypot(dx, dy);

          if (dist < influenceRadius) {
            const norm = 1 - dist / influenceRadius;
            const falloff = norm * norm * (3 - 2 * norm);

            // Push tiles outward slightly so gaps (faak) open up around cursor
            const safeDist = Math.max(dist, 0.001);
            targetX = t.baseX + (dx / safeDist) * falloff * 0.24;
            targetY = t.baseY + (dy / safeDist) * falloff * 0.24;
            targetZ = falloff * 0.56;
            targetRotY = (dx / influenceRadius) * falloff * 0.52;
            targetRotX = -(dy / influenceRadius) * falloff * 0.52;
            targetGlow = falloff * 0.92;

            if (falloff > maxLocalSeparation) {
              maxLocalSeparation = falloff;
            }
          }
        }

        t.vx = (t.vx + (targetX - t.x) * spring) * damping;
        t.vy = (t.vy + (targetY - t.y) * spring) * damping;
        t.vz = (t.vz + (targetZ - t.z) * spring) * damping;

        t.x += t.vx;
        t.y += t.vy;
        t.z += t.vz;

        t.vRotY = (t.vRotY + (targetRotY - t.rotY) * spring) * damping;
        t.vRotX = (t.vRotX + (targetRotX - t.rotX) * spring) * damping;
        t.rotY += t.vRotY;
        t.rotX += t.vRotX;

        t.vGlow = (t.vGlow + (targetGlow - t.glow) * glowSpring) * glowDamping;
        t.glow = Math.max(0, t.glow + t.vGlow);

        const g = Math.min(1, t.glow);
        if (g > 0.004) {
          if (g < 0.55) {
            tempColor.lerpColors(baseSwatch, midMatchingRose, g / 0.55);
          } else {
            tempColor.lerpColors(midMatchingRose, innerLightGlow, (g - 0.55) / 0.45);
          }
          instancedTiles.setColorAt(i, tempColor);
          anyColorDirty = true;
        } else {
          instancedTiles.setColorAt(i, baseSwatch);
          anyColorDirty = true;
        }

        pos.set(t.x, t.y, t.z);
        euler.set(t.rotX, t.rotY, 0);
        quat.setFromEuler(euler);
        mat4.compose(pos, quat, scl);
        instancedTiles.setMatrixAt(i, mat4);
      }

      // Inner light shines stronger precisely when tiles separate (faak) under cursor
      const targetGapLight = pointerRef.current.active ? maxLocalSeparation : 0;
      gapLightStrength += (targetGapLight - gapLightStrength) * Math.min(1, 0.16 * dt);
      gapLightMat.opacity = gapLightStrength * 0.85;
      innerLight.intensity = gapLightStrength * 9.5;

      instancedTiles.instanceMatrix.needsUpdate = true;
      if (anyColorDirty && instancedTiles.instanceColor) {
        instancedTiles.instanceColor.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      scene.remove(gapLightMesh);
      scene.remove(instancedTiles);

      gapLightGeo.dispose();
      gapLightMat.dispose();
      gapLightTex.dispose();

      tileGeo.dispose();
      tileMaterial.dispose();
      envMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}