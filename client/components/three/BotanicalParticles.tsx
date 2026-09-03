"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function seeded(index: number) {
  const x = Math.sin(index * 12.9898) * 43758.5453;

  return x - Math.floor(x);
}

export default function BotanicalParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 120;

    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + seeded(i * 3) * 2.5;

      const angle = seeded(i * 3 + 1) * Math.PI * 2;

      const x = Math.cos(angle) * radius;

      const z = Math.sin(angle) * radius;

      const y = -2.5 + seeded(i * 3 + 2) * 5.5;

      data[i * 3] = x;

      data[i * 3 + 1] = y;

      data[i * 3 + 2] = z;
    }

    return data;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;

    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.025;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#d6b77a"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}
