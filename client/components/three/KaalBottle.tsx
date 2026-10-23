"use client";

import { forwardRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const KaalBottle = forwardRef<THREE.Group>(function KaalBottle(_, ref) {
  const labelTexture = useTexture("/textures/kaal-label.svg");

  useEffect(() => {
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    labelTexture.anisotropy = 8;
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.needsUpdate = true;
  }, [labelTexture]);

  // Rounded premium bottle silhouette.
  const bottleGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, -2.5),
      new THREE.Vector2(0.62, -2.5),
      new THREE.Vector2(0.91, -2.48),
      new THREE.Vector2(1.035, -2.4),
      new THREE.Vector2(1.09, -2.27),
      new THREE.Vector2(1.1, -2.08),
      new THREE.Vector2(1.1, 0.45),
      new THREE.Vector2(1.085, 0.72),
      new THREE.Vector2(1.02, 0.94),
      new THREE.Vector2(0.9, 1.12),
      new THREE.Vector2(0.58, 1.42),
      new THREE.Vector2(0.42, 1.56),
      new THREE.Vector2(0.375, 1.7),
      new THREE.Vector2(0.375, 2.2),
      new THREE.Vector2(0.34, 2.25),
      new THREE.Vector2(0, 2.25),
    ];

    const geometry = new THREE.LatheGeometry(points, 96);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Dark amber liquid, recessed within the bottle.
  const liquidGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, -2.36),
      new THREE.Vector2(0.66, -2.36),
      new THREE.Vector2(0.87, -2.33),
      new THREE.Vector2(0.975, -2.23),
      new THREE.Vector2(0.99, -2.08),
      new THREE.Vector2(0.99, -1.42),
      new THREE.Vector2(0.96, -1.34),
      new THREE.Vector2(0.8, -1.34),
      new THREE.Vector2(0, -1.34),
    ];

    const geometry = new THREE.LatheGeometry(points, 72);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Curved label patch facing the camera (+Z).
  const labelGeometry = useMemo(() => {
    const segments = 48;
    const halfAngle = 0.66;
    const radius = 1.108;
    const halfHeight = 0.79;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let row = 0; row < 2; row++) {
      const y = row === 0 ? -halfHeight : halfHeight;

      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const angle = (u * 2 - 1) * halfAngle;

        positions.push(radius * Math.sin(angle), y, radius * Math.cos(angle));

        uvs.push(u, row);
      }
    }

    for (let i = 0; i < segments; i++) {
      const a = i;
      const b = i + 1;
      const c = segments + 1 + i;
      const d = c + 1;

      indices.push(a, c, b, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Warm amber glass with restrained reflections.
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#8a3b12",
        roughness: 0.13,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.25,
        transmission: 0.18,
        thickness: 0.7,
        ior: 1.46,
        attenuationColor: "#4a1a08",
        attenuationDistance: 0.9,
      }),
    [],
  );

  const liquidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#a0440b",
        roughness: 0.16,
        metalness: 0,
        envMapIntensity: 0.55,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    [],
  );

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        roughness: 0.92,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
    [labelTexture],
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#080807",
        roughness: 0.2,
        metalness: 0.18,
        clearcoat: 0.65,
        clearcoatRoughness: 0.12,
      }),
    [],
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a8824c",
        roughness: 0.22,
        metalness: 0.72,
      }),
    [],
  );

  return (
    <group ref={ref} rotation={[0, -0.18, 0]}>
      {/* Main bottle */}
      <mesh
        geometry={bottleGeometry}
        material={glassMaterial}
        castShadow
        receiveShadow
      />

      {/* Amber liquid */}
      <mesh geometry={liquidGeometry} material={liquidMaterial} />

      {/* Front label */}
      <mesh
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, -0.28, 0]}
        renderOrder={2}
      />

      {/* Neck band */}
      <mesh position={[0, 1.83, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.055, 48]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Premium dark cap */}
      <mesh position={[0, 2.43, 0]} castShadow>
        <cylinderGeometry args={[0.365, 0.365, 0.36, 48]} />
        <primitive object={capMaterial} attach="material" />
      </mesh>

      {/* Cap base ring */}
      <mesh position={[0, 2.245, 0]}>
        <cylinderGeometry args={[0.369, 0.369, 0.035, 48]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Fine gold detail */}
      <mesh position={[0, 2.61, 0]}>
        <cylinderGeometry args={[0.345, 0.345, 0.018, 48]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>
    </group>
  );
});

export default KaalBottle;
