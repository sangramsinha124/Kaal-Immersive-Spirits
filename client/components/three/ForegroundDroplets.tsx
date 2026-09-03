"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function seeded(index: number) {
  const value = Math.sin(index * 78.233) * 43758.5453;

  return value - Math.floor(value);
}

export default function ForegroundDroplets() {
  const groupRef = useRef<THREE.Group>(null);

  const droplets = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      x: (seeded(index * 3) - 0.5) * 5.5,

      y: (seeded(index * 3 + 1) - 0.5) * 6,

      z: 3.2 + seeded(index * 3 + 2) * 1.5,

      scale: 0.025 + seeded(index * 7) * 0.045,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, index) => {
      child.position.y =
        droplets[index].y + Math.sin(time * 0.3 + index) * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {droplets.map((droplet, index) => (
        <mesh
          key={index}
          position={[droplet.x, droplet.y, droplet.z]}
          scale={[droplet.scale, droplet.scale * 2, droplet.scale]}
        >
          <sphereGeometry args={[1, 12, 12]} />

          <meshPhysicalMaterial
            color="#d9e7f2"
            transparent
            opacity={0.22}
            roughness={0.05}
            metalness={0}
            transmission={0.2}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
