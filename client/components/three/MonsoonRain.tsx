"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function seeded(index: number) {
  const value =
    Math.sin(index * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

export default function MonsoonRain() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const count = 420;

    const positions =
      new Float32Array(count * 3);

    const speeds =
      new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x =
        (seeded(i * 3) - 0.5) * 14;

      const y =
        seeded(i * 3 + 1) * 10 - 2;

      const z =
        (seeded(i * 3 + 2) - 0.5) * 7;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      speeds[i] =
        0.025 + seeded(i * 5) * 0.035;
    }

    return {
      positions,
      speeds,
    };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute =
      pointsRef.current.geometry
        .attributes
        .position as THREE.BufferAttribute;

    const array =
      positionAttribute.array as Float32Array;

    for (let i = 0; i < speeds.length; i++) {
      const index = i * 3 + 1;

      array[index] -= speeds[i];

      if (array[index] < -5) {
        array[index] = 8;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      position={[0, 0, -1.5]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            positions,
            3,
          ]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#d18a3e"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  );
}