"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

function LoaderOverlay({ bg }: { bg: string }) {
  const { active } = useProgress();
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10"
      style={{ backgroundColor: bg }}
    >
      <img
        src="/logo.png"
        alt=""
        style={{ width: 48, height: 48, animation: "spin 2s linear infinite" }}
      />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
  }, [scene]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 4 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 4 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    rotation.current.x += (mouse.current.y * 0.25 - rotation.current.x) * 0.04;
    rotation.current.y += (mouse.current.x * 0.4 - rotation.current.y) * 0.04;
    groupRef.current.rotation.x = rotation.current.x;
    groupRef.current.rotation.y = rotation.current.y;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelViewer({ src, bg }: { src: string; bg: string }) {
  return (
    <div
      className="relative w-full h-[60vh] min-h-[480px]"
      style={{ backgroundColor: bg }}
    >
      <LoaderOverlay bg={bg} />
      <Canvas
        camera={{ position: [2, 0, 0], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={2} />
        <directionalLight position={[-4, -2, -3]} intensity={2} color="#6080ff" />
        <Suspense fallback={null}>
          <Model src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}
