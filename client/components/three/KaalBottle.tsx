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

  const bottleGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.92, -2.38);
    shape.lineTo(0.92, -2.38);
    shape.quadraticCurveTo(1.15, -2.38, 1.15, -2.15);
    shape.lineTo(1.15, 0.78);
    shape.quadraticCurveTo(1.15, 1.12, 0.91, 1.34);
    shape.lineTo(0.48, 1.74);
    shape.quadraticCurveTo(0.37, 1.85, 0.37, 2.02);
    shape.lineTo(0.37, 2.86);
    shape.quadraticCurveTo(0.37, 2.98, 0.25, 2.98);
    shape.lineTo(-0.25, 2.98);
    shape.quadraticCurveTo(-0.37, 2.98, -0.37, 2.86);
    shape.lineTo(-0.37, 2.02);
    shape.quadraticCurveTo(-0.37, 1.85, -0.48, 1.74);
    shape.lineTo(-0.91, 1.34);
    shape.quadraticCurveTo(-1.15, 1.12, -1.15, 0.78);
    shape.lineTo(-1.15, -2.15);
    shape.quadraticCurveTo(-1.15, -2.38, -0.92, -2.38);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 1.1,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.075,
      bevelThickness: 0.1,
      curveSegments: 20,
      steps: 1,
    });
    geometry.translate(0, 0, -0.55);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const capGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.34, 2.82);
    shape.lineTo(0.34, 2.82);
    shape.quadraticCurveTo(0.39, 2.82, 0.39, 2.87);
    shape.lineTo(0.39, 3.19);
    shape.quadraticCurveTo(0.39, 3.24, 0.34, 3.24);
    shape.lineTo(-0.34, 3.24);
    shape.quadraticCurveTo(-0.39, 3.24, -0.39, 3.19);
    shape.lineTo(-0.39, 2.87);
    shape.quadraticCurveTo(-0.39, 2.82, -0.34, 2.82);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.96,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.025,
      bevelThickness: 0.035,
      curveSegments: 8,
      steps: 1,
    });
    geometry.translate(0, 0, -0.27);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const bottleMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#8c3d16",
        roughness: 0.22,
        metalness: 0.04,
        clearcoat: 0.82,
        clearcoatRoughness: 0.16,
      }),
    [],
  );

  const bottleEdgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#59240e",
        roughness: 0.2,
        metalness: 0.08,
        emissive: "#160600",
        emissiveIntensity: 0.35,
      }),
    [],
  );

  const glassGlintMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#e4a15b",
        transparent: true,
        opacity: 0.42,
        toneMapped: false,
        depthWrite: false,
      }),
    [],
  );

  const softGlintMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffd391",
        transparent: true,
        opacity: 0.12,
        toneMapped: false,
        depthWrite: false,
      }),
    [],
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#100d0a",
        toneMapped: false,
      }),
    [],
  );

  const capSealMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#b78b4b",
        toneMapped: false,
      }),
    [],
  );

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        roughness: 0.76,
        metalness: 0.08,
        side: THREE.DoubleSide,
      }),
    [labelTexture],
  );

  return (
    <group ref={ref} position={[0, 0, 0]} rotation={[0, -0.18, 0]}>
      <mesh
        geometry={bottleGeometry}
        material={[bottleMaterial, bottleEdgeMaterial]}
      />

      {[-0.98, 0.98].map((x) => (
        <mesh
          key={x}
          position={[x, -0.48, 0.7]}
          material={glassGlintMaterial}
        >
          <planeGeometry args={[0.035, 2.15]} />
        </mesh>
      ))}

      <mesh position={[-0.84, 0.28, 0.705]} material={softGlintMaterial}>
        <planeGeometry args={[0.07, 1.42]} />
      </mesh>

      <mesh position={[0, -2.18, 0.705]} material={glassGlintMaterial}>
        <planeGeometry args={[1.72, 0.055]} />
      </mesh>

      <mesh position={[0, 0.04, 0.72]} renderOrder={2}>
        <planeGeometry args={[1.48, 1.9]} />
        <primitive object={labelMaterial} attach="material" />
      </mesh>

      <mesh position={[0, 2.78, 0]} material={bottleEdgeMaterial}>
        <cylinderGeometry args={[0.39, 0.39, 0.1, 24]} />
      </mesh>

      <mesh geometry={capGeometry} material={capMaterial} />
      <mesh position={[0, 2.88, 0.76]} material={capSealMaterial}>
        <planeGeometry args={[0.68, 0.045]} />
      </mesh>
    </group>
  );
});

export default KaalBottle;
