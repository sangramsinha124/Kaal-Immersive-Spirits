"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function MonsoonMist() {
  const mistRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mistRef.current) return;

    const time = state.clock.elapsedTime;

    mistRef.current.position.x = Math.sin(time * 0.12) * 0.7;

    mistRef.current.position.y = Math.sin(time * 0.08) * 0.25;

    mistRef.current.scale.x = 1.4 + Math.sin(time * 0.15) * 0.08;
  });

  return (
    <mesh ref={mistRef} position={[0, -1.4, 1.2]} scale={[1.4, 0.65, 1]}>
      <sphereGeometry args={[3.5, 32, 16]} />

      <meshBasicMaterial
        color="#dce3e8"
        transparent
        opacity={0.025}
        depthWrite={false}
      />
    </mesh>
  );
}
