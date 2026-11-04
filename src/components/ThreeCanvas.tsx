import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  currentPath: string;
}

// Camera and scene coordinates per route
const ROUTE_CONFIGS: Record<string, { camPos: [number, number, number]; lookAt: [number, number, number]; heroOpacity: number }> = {
  '/': { camPos: [0, 0, 7.2], lookAt: [0, 0, 0], heroOpacity: 1.0 },
  '/about': { camPos: [-2.2, 0.6, 6.6], lookAt: [0, 0, 0], heroOpacity: 0.35 },
  '/projects': { camPos: [2.0, -0.6, 7.0], lookAt: [0, 0, 0], heroOpacity: 0.25 },
  '/skills': { camPos: [0, 1.8, 7.5], lookAt: [0, 0.2, 0], heroOpacity: 0.3 },
  '/case-studies': { camPos: [-1.8, -1.2, 6.8], lookAt: [0, 0, 0], heroOpacity: 0.25 },
  '/contact': { camPos: [1.2, 1.4, 6.5], lookAt: [0, 0, 0], heroOpacity: 0.35 },
};

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ currentPath }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const currentPathRef = useRef(currentPath);
  currentPathRef.current = currentPath;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf6f0, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const initialConfig = ROUTE_CONFIGS[currentPath] || ROUTE_CONFIGS['/'];
    camera.position.set(...initialConfig.camPos);
    camera.lookAt(...initialConfig.lookAt);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5eb, 1.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0d6ff, 0.9);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x6b4eae, 1.8, 15);
    rimLight.position.set(0, -4, 2);
    scene.add(rimLight);

    // Palette Materials (flat shaded, tactile soft matte)
    const matPurple = new THREE.MeshStandardMaterial({
      color: 0x6b4eae,
      flatShading: true,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 0.92,
    });

    const matLilac = new THREE.MeshStandardMaterial({
      color: 0xc9b8ea,
      flatShading: true,
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    const matBeige = new THREE.MeshStandardMaterial({
      color: 0xebe1d2,
      flatShading: true,
      roughness: 0.6,
      metalness: 0.05,
      transparent: true,
      opacity: 0.9,
    });

    const matSand = new THREE.MeshStandardMaterial({
      color: 0xd8c9b3,
      flatShading: true,
      roughness: 0.5,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });

    const matWire = new THREE.MeshBasicMaterial({
      color: 0x6b4eae,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    // 1. Central Hero Interactive Shield / Faceted Polyhedron
    // Composite multi-part assembly as per threejs guidelines
    const heroGroup = new THREE.Group();
    heroGroup.position.set(2.4, 0.2, 0);

    const heroCoreGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const heroCore = new THREE.Mesh(heroCoreGeo, matPurple);
    heroGroup.add(heroCore);

    const heroCageGeo = new THREE.IcosahedronGeometry(1.28, 1);
    const heroCage = new THREE.Mesh(heroCageGeo, matWire);
    heroGroup.add(heroCage);

    const heroRingGeo = new THREE.TorusGeometry(1.5, 0.035, 8, 32);
    const heroRing = new THREE.Mesh(heroRingGeo, matLilac);
    heroRing.rotation.x = Math.PI / 3;
    heroGroup.add(heroRing);

    scene.add(heroGroup);

    // 2. Floating Background Low-Poly Geometries (scattered with elegant parallax)
    interface FloatingItem {
      mesh: THREE.Object3D;
      basePos: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatDist: number;
      floatPhase: number;
    }

    const floatingItems: FloatingItem[] = [];

    // Icosahedron
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), matLilac);
    ico.position.set(-3.2, 2.1, -1.2);
    scene.add(ico);
    floatingItems.push({
      mesh: ico,
      basePos: ico.position.clone(),
      rotSpeed: { x: 0.004, y: 0.006, z: 0.002 },
      floatSpeed: 1.2,
      floatDist: 0.25,
      floatPhase: 0,
    });

    // Torus
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.18, 6, 18), matBeige);
    torus.position.set(-2.8, -1.8, -0.8);
    scene.add(torus);
    floatingItems.push({
      mesh: torus,
      basePos: torus.position.clone(),
      rotSpeed: { x: 0.005, y: -0.004, z: 0.003 },
      floatSpeed: 0.9,
      floatDist: 0.3,
      floatPhase: 1.5,
    });

    // Octahedron
    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), matSand);
    octa.position.set(3.4, 2.4, -1.5);
    scene.add(octa);
    floatingItems.push({
      mesh: octa,
      basePos: octa.position.clone(),
      rotSpeed: { x: -0.005, y: 0.005, z: 0.002 },
      floatSpeed: 1.4,
      floatDist: 0.2,
      floatPhase: 3.0,
    });

    // Torus Knot
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.48, 0.14, 36, 6, 2, 3), matLilac);
    knot.position.set(3.2, -2.2, -1.0);
    scene.add(knot);
    floatingItems.push({
      mesh: knot,
      basePos: knot.position.clone(),
      rotSpeed: { x: 0.003, y: 0.004, z: -0.003 },
      floatSpeed: 1.0,
      floatDist: 0.22,
      floatPhase: 4.5,
    });

    // Dodecahedron
    const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), matBeige);
    dodeca.position.set(-0.8, -2.6, -1.4);
    scene.add(dodeca);
    floatingItems.push({
      mesh: dodeca,
      basePos: dodeca.position.clone(),
      rotSpeed: { x: 0.006, y: -0.003, z: 0.004 },
      floatSpeed: 1.1,
      floatDist: 0.24,
      floatPhase: 2.2,
    });

    // Mouse Tracking State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Adjust hero position for mobile screens
      if (w < 768) {
        heroGroup.position.set(0, 1.2, -1);
        heroGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        heroGroup.position.set(2.4, 0.2, 0);
        heroGroup.scale.set(1, 1, 1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update camera based on route configuration
      const config = ROUTE_CONFIGS[currentPathRef.current] || ROUTE_CONFIGS['/'];
      targetCamPos.set(config.camPos[0], config.camPos[1], config.camPos[2]);

      // Subtle mouse parallax
      if (!prefersReducedMotion) {
        targetCamPos.x += mouse.x * 0.45;
        targetCamPos.y += mouse.y * 0.35;
      }

      camera.position.lerp(targetCamPos, 0.04);
      targetLookAt.set(config.lookAt[0], config.lookAt[1], config.lookAt[2]);
      camera.lookAt(targetLookAt);

      // Hero Interactive Object Animation
      if (!prefersReducedMotion) {
        // Continuous slow rotation
        heroCore.rotation.x += 0.006;
        heroCore.rotation.y += 0.009;
        heroCage.rotation.x -= 0.004;
        heroCage.rotation.y += 0.007;
        heroRing.rotation.z += 0.005;

        // Interactive tilt towards cursor
        const targetRotX = mouse.y * 0.6;
        const targetRotY = mouse.x * 0.8;
        heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.07;
        heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.07;

        // Floating background items
        for (let i = 0; i < floatingItems.length; i++) {
          const item = floatingItems[i];
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;

          const floatOffset = Math.sin(elapsed * item.floatSpeed + item.floatPhase) * item.floatDist;
          item.mesh.position.y = item.basePos.y + floatOffset;
          item.mesh.position.x = item.basePos.x + mouse.x * 0.15 * (i % 2 === 0 ? 1 : -1);
        }
      }

      // Smooth opacity fade for hero when on subpages
      const targetOpacity = config.heroOpacity;
      matPurple.opacity = THREE.MathUtils.lerp(matPurple.opacity, targetOpacity * 0.92, 0.05);
      matLilac.opacity = THREE.MathUtils.lerp(matLilac.opacity, targetOpacity * 0.88, 0.05);
      matWire.opacity = THREE.MathUtils.lerp(matWire.opacity, targetOpacity * 0.22, 0.05);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Clean up geometries and materials
      heroCoreGeo.dispose();
      heroCageGeo.dispose();
      heroRingGeo.dispose();
      matPurple.dispose();
      matLilac.dispose();
      matBeige.dispose();
      matSand.dispose();
      matWire.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
