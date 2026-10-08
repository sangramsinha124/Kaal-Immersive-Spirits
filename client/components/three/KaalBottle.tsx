"use client";

import { forwardRef, useMemo } from "react";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const KaalBottle = forwardRef<THREE.Group>(function KaalBottle(_, ref) {
  const labelTexture = useTexture("/textures/kaal-label.svg");

  useMemo(() => {
    labelTexture.colorSpace = THREE.SRGBColorSpace;

    labelTexture.anisotropy = 4;

    labelTexture.wrapS = THREE.ClampToEdgeWrapping;

    labelTexture.wrapT = THREE.ClampToEdgeWrapping;

    labelTexture.needsUpdate = true;
  }, [labelTexture]);

  /*
   * ------------------------------------------------
   * BOTTLE DIMENSIONS
   * ------------------------------------------------
   */

  const bottleRadius = 1.45;
  const bottleHeight = 4.8;

  /*
   * ------------------------------------------------
   * LABEL
   *
   * Instead of a complete cylinder/ring,
   * we use a curved plane segment.
   *
   * This prevents the unwanted gold circular
   * outline around the bottle.
   * ------------------------------------------------
   */

  const labelGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(
      bottleRadius + 0.012,
      bottleRadius + 0.012,
      2.05,
      96,
      1,
      true,
      -Math.PI * 0.43,
      Math.PI * 0.86,
    );

    return geometry;
  }, []);

  /*
   * ------------------------------------------------
   * MATERIALS
   * ------------------------------------------------
   */

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d7d1c5",
        roughness: 0.08,
        metalness: 0.02,
        transmission: 0.2,
        transparent: true,
        opacity: 0.34,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        ior: 1.45,
        thickness: 0.1,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const liquidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#6f2d0b",
        roughness: 0.16,
        metalness: 0,
        transmission: 0.04,
        transparent: true,
        opacity: 0.94,
        clearcoat: 0.5,
        clearcoatRoughness: 0.14,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const liquidGlowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#c86a19",
        transparent: true,
        opacity: 0.14,
      }),
    [],
  );

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b48a4d",
        metalness: 0.85,
        roughness: 0.22,
      }),
    [],
  );

  /*
   * ------------------------------------------------
   * LABEL MATERIAL
   * ------------------------------------------------
   */

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        transparent: true,
        roughness: 0.75,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
    [labelTexture],
  );

  /*
   * ------------------------------------------------
   * LIQUID GEOMETRY
   * ------------------------------------------------
   */

  const liquidGeometry = useMemo(
    () => new THREE.CylinderGeometry(1.27, 1.31, 3.75, 64),
    [],
  );

  /*
   * ------------------------------------------------
   * MAIN BOTTLE
   * ------------------------------------------------
   */

  return (
    <group ref={ref} position={[0, 0, 0]} rotation={[0, -0.18, 0]}>
      {/* =========================================
            OUTER GLASS BODY
        ========================================= */}

      <mesh material={glassMaterial} castShadow={false} receiveShadow={false}>
        <cylinderGeometry
          args={[bottleRadius, bottleRadius * 0.88, bottleHeight, 96]}
        />
      </mesh>

      {/* =========================================
            GLASS SHOULDERS
        ========================================= */}
      <mesh
        position={[0, 2.52, 0]}
        scale={[0.92, 0.72, 0.92]}
        material={glassMaterial}
      >
        <sphereGeometry args={[1.18, 64, 32]} />
      </mesh>

      {/* =========================================
            AMBER LIQUID
        ========================================= */}

      <mesh
        position={[0, -0.25, 0]}
        geometry={liquidGeometry}
        material={liquidMaterial}
      />

      {/* =========================================
            LIQUID INNER GLOW
        ========================================= */}

      <mesh
        position={[0, -0.25, 0]}
        scale={[0.94, 0.98, 0.94]}
        geometry={liquidGeometry}
        material={liquidGlowMaterial}
      />

      {/* =========================================
            LIQUID SURFACE
        ========================================= */}

      <mesh position={[0, 1.63, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.27, 1.27, 0.035, 64]} />

        <meshPhysicalMaterial
          color="#d9852b"
          roughness={0.12}
          metalness={0}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* =========================================
            LABEL
        ========================================= */}

      <mesh
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, 0.05, 0]}
        rotation={[0, 0, 0]}
      />

      {/* =========================================
            NECK
        ========================================= */}

      <mesh position={[0, 3.05, 0]} material={glassMaterial}>
        <cylinderGeometry args={[0.47, 0.58, 0.72, 48]} />
      </mesh>

      {/* =========================================
            GOLD NECK BAND
        ========================================= */}

      <mesh position={[0, 3.27, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.53, 0.53, 0.12, 48]} />
      </mesh>

      {/* =========================================
            CAP
        ========================================= */}

      <mesh position={[0, 3.65, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.49, 0.49, 0.65, 48]} />
      </mesh>

      {/* =========================================
            CAP TOP
        ========================================= */}

      <mesh position={[0, 3.98, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.43, 0.43, 0.08, 48]} />
      </mesh>

      {/* =========================================
            BOTTLE BASE
        ========================================= */}

      <mesh position={[0, -2.43, 0]} material={glassMaterial}>
        <cylinderGeometry args={[1.28, 1.28, 0.16, 64]} />
      </mesh>

      {/* =========================================
            SMALL GOLD BASE DETAIL
            NOT A FULL RING
        ========================================= */}
    </group>
  );
});

export default KaalBottle;
