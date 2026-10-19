"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const KaalBottle = forwardRef<THREE.Group>(function KaalBottle(_, ref) {
  const labelTexture = useTexture("/textures/kaal-label.svg");

  useMemo(() => {
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    labelTexture.anisotropy = 8;
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.needsUpdate = true;
  }, [labelTexture]);

  // A continuous profile creates the body, shoulder and neck.
  const bottleGeometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.0, -2.38),
      new THREE.Vector2(0.78, -2.38),
      new THREE.Vector2(1.04, -2.34),
      new THREE.Vector2(1.19, -2.25),
      new THREE.Vector2(1.25, -2.12),
      new THREE.Vector2(1.27, -1.94),
      new THREE.Vector2(1.27, -1.7),
      new THREE.Vector2(1.27, 0.95),
      new THREE.Vector2(1.25, 1.2),
      new THREE.Vector2(1.21, 1.4),
      new THREE.Vector2(1.12, 1.59),
      new THREE.Vector2(0.96, 1.77),
      new THREE.Vector2(0.74, 1.94),
      new THREE.Vector2(0.51, 2.08),
      new THREE.Vector2(0.42, 2.19),
      new THREE.Vector2(0.41, 2.34),
      new THREE.Vector2(0.41, 2.88),
      new THREE.Vector2(0.39, 2.96),
      new THREE.Vector2(0.0, 2.96),
    ];

    const curve = new THREE.SplineCurve(profile);
    const smoothProfile = curve.getPoints(100);

    const geometry = new THREE.LatheGeometry(smoothProfile, 128);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Liquid follows the lower bottle shape and has a flat visible surface.
  const liquidGeometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.0, -2.25),
      new THREE.Vector2(0.72, -2.25),
      new THREE.Vector2(0.98, -2.23),
      new THREE.Vector2(1.13, -2.15),
      new THREE.Vector2(1.18, -2.02),
      new THREE.Vector2(1.19, -1.82),
      new THREE.Vector2(1.19, 0.88),
      new THREE.Vector2(1.17, 0.96),
      new THREE.Vector2(1.1, 0.99),
      new THREE.Vector2(0.0, 0.99),
    ];

    const geometry = new THREE.LatheGeometry(profile, 96);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const labelGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(
      1.285,
      1.285,
      1.95,
      128,
      1,
      true,
      -Math.PI * 0.43,
      Math.PI * 0.86,
    );
  }, []);

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f7f0e2",
        roughness: 0.08,
        metalness: 0.05,
        transmission: 0.42,
        transparent: true,
        opacity: 0.44,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        ior: 1.46,
        thickness: 0.18,
        attenuationColor: "#f4c07a",
        attenuationDistance: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  const liquidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#6c2d0b",
        roughness: 0.18,
        metalness: 0.08,
        transmission: 0.06,
        transparent: true,
        opacity: 0.98,
        clearcoat: 0.45,
        clearcoatRoughness: 0.14,
        emissive: "#2f0c05",
        side: THREE.DoubleSide,
      }),
    [],
  );

  const liquidSurfaceMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#c66a1a",
        roughness: 0.12,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.08,
        emissive: "#3d1407",
      }),
    [],
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9a45b",
        metalness: 0.88,
        roughness: 0.2,
        emissive: "#5e4312",
      }),
    [],
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#211b17",
        metalness: 0.72,
        roughness: 0.24,
      }),
    [],
  );

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        roughness: 0.72,
        metalness: 0,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
      }),
    [labelTexture],
  );

  return (
    <group ref={ref} position={[0, 0, 0]} rotation={[0, -0.18, 0]}>
      <mesh position={[0, -0.18, 0]} renderOrder={0}>
        <cylinderGeometry args={[1.92, 1.92, 6.25, 128]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.1} />
      </mesh>

      {/* One continuous, rounded bottle silhouette */}
      <mesh
        geometry={bottleGeometry}
        material={glassMaterial}
        renderOrder={2}
      />

      {/* Amber spirit inside the glass */}
      <mesh
        geometry={liquidGeometry}
        material={liquidMaterial}
        position={[0, 0, 0]}
        renderOrder={1}
      />

      {/* Glossy liquid meniscus */}
      <mesh
        position={[0, 0.985, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        renderOrder={2}
      >
        <circleGeometry args={[1.145, 96]} />
        <primitive object={liquidSurfaceMaterial} attach="material" />
      </mesh>

      {/* Curved front label */}
      <mesh
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, 0.02, 0]}
        renderOrder={3}
      />

      {/* Fine gold line beneath the shoulder */}
      <mesh position={[0, 1.17, 0]} renderOrder={4}>
        <cylinderGeometry args={[1.253, 1.253, 0.025, 96]} />
        <meshStandardMaterial
          color="#b18a4b"
          metalness={0.65}
          roughness={0.32}
        />
      </mesh>

      {/* Neck band */}
      <mesh position={[0, 2.45, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.425, 0.425, 0.09, 64]} />
      </mesh>

      {/* Dark premium cap with narrow gold edges */}
      <mesh position={[0, 3.19, 0]} material={capMaterial}>
        <cylinderGeometry args={[0.405, 0.405, 0.46, 64, 1]} />
      </mesh>

      <mesh position={[0, 3.425, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.412, 0.412, 0.035, 64]} />
      </mesh>

      <mesh position={[0, 2.955, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.413, 0.413, 0.035, 64]} />
      </mesh>

      {/* Thick glass base — no separate gold disk */}
      <mesh position={[0, -2.29, 0]} renderOrder={3}>
        <cylinderGeometry args={[1.03, 0.88, 0.12, 96]} />
        <meshPhysicalMaterial
          color="#c8b69a"
          roughness={0.16}
          metalness={0}
          transmission={0.16}
          transparent
          opacity={0.5}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
});

export default KaalBottle;
