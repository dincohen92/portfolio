"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function SpinningModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<THREE.Group>(null);

  // Clone so the cached glTF scene is never mutated, then fit it to a 2-unit box
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scale = 2 / Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(scale);
    clone.position.sub(center.multiplyScalar(scale));
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function CardModel({ src, bright = false }: { src: string; bright?: boolean }) {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 0, 5] }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={bright ? 1.8 : 0.6} />
      <directionalLight position={[4, 6, 4]} intensity={4} />
      <directionalLight position={[-4, -2, -3]} intensity={4} color="#6080ff" />
      {bright && <directionalLight position={[0, 1, 6]} intensity={5} />}
      <Suspense fallback={null}>
        <SpinningModel src={src} />
      </Suspense>
    </Canvas>
  );
}
