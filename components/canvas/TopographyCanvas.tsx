"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TopographyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ========================================================
    // 0. SCENE & CAMERA SETUP (Deep Institutional Space)
    // ========================================================
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 8, 38);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // ========================================================
    // 1. PROCEDURAL WISPY CLOUD TEXTURE (Ethereal Atmospheric Radial)
    // ========================================================
    const createCloudTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 512, 512);

      const puffs = [
        { x: 256, y: 256, r: 180, a: 0.5 },
        { x: 190, y: 235, r: 140, a: 0.4 },
        { x: 320, y: 245, r: 150, a: 0.4 },
        { x: 250, y: 175, r: 130, a: 0.35 },
        { x: 210, y: 295, r: 120, a: 0.3 },
        { x: 300, y: 295, r: 110, a: 0.3 },
      ];

      puffs.forEach((p) => {
        const grad = ctx.createRadialGradient(p.x, p.y, p.r * 0.05, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.a})`);
        grad.addColorStop(0.4, `rgba(180, 210, 255, ${p.a * 0.5})`);
        grad.addColorStop(0.7, `rgba(90, 140, 220, ${p.a * 0.2})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      return new THREE.CanvasTexture(canvas);
    };

    const cloudTexture = createCloudTexture();

    // ========================================================
    // 2. PARALLAX LAYER 1: INSTITUTIONAL CELESTIAL SKY DOME
    //    (Deep Obsidian Midnight to Institutional Diners Navy)
    // ========================================================
    const skyGeo = new THREE.SphereGeometry(220, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uColorZenith: { value: new THREE.Color(0x020306) },  // Deepest Midnight
        uColorMidSky: { value: new THREE.Color(0x060e1d) },  // Diners Institutional Midnight
        uColorTwilight: { value: new THREE.Color(0x0a1426) },// Subtle Slate/Cyan Twilight
        uColorHorizon: { value: new THREE.Color(0x04070e) }, // Deep Obsidian Horizon
        uScroll: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorZenith;
        uniform vec3 uColorMidSky;
        uniform vec3 uColorTwilight;
        uniform vec3 uColorHorizon;
        uniform float uScroll;
        varying vec3 vWorldPosition;

        void main() {
          float h = normalize(vWorldPosition).y;
          // Sensación de descenso celeste al hacer scroll
          float shift = uScroll * 0.40;
          float y = clamp(h + shift, -1.0, 1.0);

          vec3 color = uColorZenith;
          if (y > 0.25) {
            float t = smoothstep(0.25, 0.85, y);
            color = mix(uColorMidSky, uColorZenith, t);
          } else if (y > -0.15) {
            float t = smoothstep(-0.15, 0.25, y);
            color = mix(uColorTwilight, uColorMidSky, t);
          } else {
            float t = smoothstep(-0.7, -0.15, y);
            color = mix(uColorHorizon, uColorTwilight, t);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);

    // ========================================================
    // 3. PARALLAX LAYER 2: ETHEREAL ATMOSPHERIC WISPS (Additive Blending)
    //    (Zero chalky white planes: purely luminous dark blue/cyan aura)
    // ========================================================
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);

    interface CloudData {
      mesh: THREE.Mesh;
      initialY: number;
      speedX: number;
      parallaxFactor: number;
      swayOffset: number;
    }

    const cloudItems: CloudData[] = [];
    const totalClouds = 10;

    for (let i = 0; i < totalClouds; i++) {
      const planeW = 85 + (i % 4) * 20;
      const planeH = 35 + (i % 3) * 15;
      const geo = new THREE.PlaneGeometry(planeW, planeH);

      // Deep institutional chromatic tones (Diners Blue & subtle UIDE glow)
      const colorOptions = [
        new THREE.Color(0x004a97), // Diners Executive Blue
        new THREE.Color(0x002d72), // Diners Deep Navy
        new THREE.Color(0x1e293b), // Slate Night
        new THREE.Color(0x3b1228), // Deep UIDE Plum
      ];
      const cloudColor = colorOptions[i % colorOptions.length];

      const mat = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.16 + (i % 3) * 0.06,
        color: cloudColor,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geo, mat);
      const initialY = 24 - i * 4.2;
      const posX = ((i % 5) - 2) * 28;
      const posZ = -14 - (i % 4) * 6;

      mesh.position.set(posX, initialY, posZ);
      cloudsGroup.add(mesh);

      cloudItems.push({
        mesh,
        initialY,
        speedX: (i % 2 === 0 ? 1 : -1) * (0.015 + (i % 3) * 0.008),
        parallaxFactor: 14 + (i % 4) * 4,
        swayOffset: i * 0.8,
      });
    }

    // ========================================================
    // 4. PARALLAX LAYER 3: DISTANT REAR ANDEAN SILHOUETTE
    // ========================================================
    const rearMountainGroup = new THREE.Group();
    scene.add(rearMountainGroup);

    const rearWidth = 200;
    const rearHeight = 85;
    const rearMountainGeo = new THREE.PlaneGeometry(rearWidth, rearHeight, 60, 40);
    rearMountainGeo.rotateX(-Math.PI / 2.3);

    const rearPos = rearMountainGeo.attributes.position;
    const rVertex = new THREE.Vector3();
    for (let i = 0; i < rearPos.count; i++) {
      rVertex.fromBufferAttribute(rearPos, i);
      const x = rVertex.x * 0.03;
      const z = rVertex.z * 0.035;

      const crest = Math.sin(x * 1.1) * Math.cos(z * 1.0) * 3.5;
      const ridge = Math.abs(Math.sin(x * 0.5 + z * 0.25)) * 3.0;
      const distFade = Math.min(1.0, Math.max(0.05, (rVertex.z + 42) / 60));

      rVertex.y += (crest + ridge) * distFade;
      rearPos.setXYZ(i, rVertex.x, rVertex.y, rVertex.z);
    }
    rearMountainGeo.computeVertexNormals();

    const rearMountainMat = new THREE.MeshBasicMaterial({
      color: 0x050810,
      transparent: true,
      opacity: 0.65,
    });
    const rearMountainMesh = new THREE.Mesh(rearMountainGeo, rearMountainMat);
    rearMountainMesh.position.set(0, -11, -30);
    rearMountainGroup.add(rearMountainMesh);

    // ========================================================
    // 5. PARALLAX LAYER 4: MID ANDEAN MOUNTAIN RIDGE (DIFUMINADA)
    //    (Custom gradient shader: dark base fading into soft ridge)
    // ========================================================
    const midMountainGroup = new THREE.Group();
    scene.add(midMountainGroup);

    const midWidth = 180;
    const midHeight = 90;
    const midMountainGeo = new THREE.PlaneGeometry(midWidth, midHeight, 80, 60);
    midMountainGeo.rotateX(-Math.PI / 2.35);

    const midPos = midMountainGeo.attributes.position;
    const mVertex = new THREE.Vector3();
    for (let i = 0; i < midPos.count; i++) {
      mVertex.fromBufferAttribute(midPos, i);
      const x = mVertex.x * 0.04;
      const z = mVertex.z * 0.045;

      const h1 = Math.sin(x * 1.3) * Math.cos(z * 1.2) * 4.0;
      const h2 = Math.sin(x * 2.5 + 1.0) * Math.cos(z * 2.0) * 1.5;
      const ridge = Math.abs(Math.sin(x * 0.7 + z * 0.3)) * 3.8;
      const distFade = Math.min(1.0, Math.max(0.08, (mVertex.z + 45) / 65));

      mVertex.y += (h1 + h2 + ridge) * distFade;
      midPos.setXYZ(i, mVertex.x, mVertex.y, mVertex.z);
    }
    midMountainGeo.computeVertexNormals();

    // Mountain Shader Material for soft diffused silhouette
    const midMountainMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uColorBase: { value: new THREE.Color(0x04060c) },
        uColorRidge: { value: new THREE.Color(0x0c1626) },
      },
      vertexShader: `
        varying float vElevation;
        void main() {
          vElevation = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorBase;
        uniform vec3 uColorRidge;
        varying float vElevation;
        void main() {
          float t = smoothstep(-2.0, 7.0, vElevation);
          vec3 color = mix(uColorBase, uColorRidge, t);
          // Soft opacity falloff so crest remains diffused against deep sky
          float alpha = mix(0.95, 0.65, t);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const midMountainMesh = new THREE.Mesh(midMountainGeo, midMountainMat);
    midMountainMesh.position.set(0, -8.0, -18);
    midMountainGroup.add(midMountainMesh);

    // ========================================================
    // 6. PARALLAX LAYER 5: CELESTIAL STARDUST PARTICLES
    // ========================================================
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 160;
      starPos[i + 1] = 6 + Math.random() * 55;
      starPos[i + 2] = -25 - Math.random() * 45;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.20,
      transparent: true,
      opacity: 0.70,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ========================================================
    // 7. BRAND CHROMATIC VOLUMETRIC LIGHTS
    // ========================================================
    const ambientLight = new THREE.AmbientLight(0x080e18, 1.8);
    scene.add(ambientLight);

    const dinersLight = new THREE.PointLight(0x004a97, 3.5, 90);
    dinersLight.position.set(20, 16, 16);
    scene.add(dinersLight);

    const uideLight = new THREE.PointLight(0x910048, 2.5, 80);
    uideLight.position.set(-22, 10, 10);
    scene.add(uideLight);

    const rcbLight = new THREE.PointLight(0xeaaa00, 1.2, 50);
    rcbLight.position.set(0, -8, 8);
    scene.add(rcbLight);

    // ========================================================
    // 8. INTERACTIVE SCROLL & POINTER LERP PHYSICS
    // ========================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    let scrollY = 0;
    let targetScrollY = 0;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth dampening
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = docHeight > 0 ? scrollY / docHeight : 0;

      // 1. Sky descends with scroll
      skyMat.uniforms.uScroll.value = scrollRatio;

      // 2. Cloud wisps drift with layered parallax
      cloudItems.forEach((item) => {
        const descentOffset = scrollRatio * item.parallaxFactor;
        const breathing = Math.sin(time * 0.35 + item.swayOffset) * 0.8;
        item.mesh.position.y = item.initialY - descentOffset + breathing;

        item.mesh.position.x += item.speedX;
        if (item.mesh.position.x > 80) item.mesh.position.x = -80;
        if (item.mesh.position.x < -80) item.mesh.position.x = 80;
      });

      // 3. Rear Mountain Ridge (distant slow parallax: factor 0.08)
      rearMountainGroup.position.y = -scrollRatio * 3.5;
      rearMountainGroup.rotation.z = Math.sin(time * 0.05) * 0.004 + mouseX * 0.003;

      // 4. Mid Andean Ridge (slow parallax: factor 0.16)
      midMountainGroup.position.y = -scrollRatio * 5.0;
      midMountainGroup.rotation.z = Math.sin(time * 0.06) * 0.005 + mouseX * 0.005;

      // 5. Starfield subtle drift
      starField.position.y = -scrollRatio * 10;

      // 6. Camera parallax
      camera.position.x = mouseX * 2.0;
      camera.position.y = 8 - mouseY * 0.9 - scrollRatio * 2.2;
      camera.lookAt(0, 1 - scrollRatio * 1.0, 0);

      // 7. Dynamic Light accents
      rcbLight.intensity = 1.0 + Math.sin(scrollRatio * Math.PI) * 2.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      skyGeo.dispose();
      skyMat.dispose();
      cloudTexture.dispose();
      rearMountainGeo.dispose();
      rearMountainMat.dispose();
      midMountainGeo.dispose();
      midMountainMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full max-w-full"
      style={{ opacity: 0.98 }}
      aria-hidden="true"
    />
  );
}
