"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import { Group } from "three";

export type KaalBottleHandle = Group;

const KaalBottle = forwardRef<KaalBottleHandle>((_, ref) => {
  const bottleRef = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => bottleRef.current as THREE.Group);

  /*
   * ------------------------------------------------
   * BOTTLE PROFILE
   * ------------------------------------------------
   *
   * Each point = [radius, height]
   *
   * LatheGeometry revolves this profile around
   * the Y axis to create the 3D bottle.
   */

  const bottleProfile = useMemo(
    () => [
      new THREE.Vector2(1.18, -2.0),
      new THREE.Vector2(1.3, -1.9),
      new THREE.Vector2(1.38, -1.6),
      new THREE.Vector2(1.4, -1.2),
      new THREE.Vector2(1.4, 0.8),
      new THREE.Vector2(1.37, 1.15),
      new THREE.Vector2(1.28, 1.45),
      new THREE.Vector2(1.1, 1.7),
      new THREE.Vector2(0.82, 1.9),
      new THREE.Vector2(0.62, 2.1),
      new THREE.Vector2(0.54, 2.65),
      new THREE.Vector2(0.48, 3.1),
    ],
    [],
  );

  /*
   * Slightly smaller profile for liquid.
   */

  const liquidProfile = useMemo(
    () =>
      bottleProfile.map(
        (point) => new THREE.Vector2(point.x * 0.91, Math.max(point.y, -1.75)),
      ),
    [bottleProfile],
  );

  return (
    <group ref={bottleRef}>
      {/* ==========================================
          MAIN DARK GLASS BOTTLE
          ========================================== */}

      <mesh castShadow receiveShadow>
        <latheGeometry args={[bottleProfile, 128]} />

        <meshPhysicalMaterial
          color="#090909"
          roughness={0.1}
          metalness={0.05}
          /*
           * Glass characteristics
           */

          transmission={0.28}
          thickness={0.7}
          ior={1.45}
          /*
           * Premium surface reflection
           */

          clearcoat={1}
          clearcoatRoughness={0.06}
          /*
           * Keep the bottle dark rather than transparent.
           */

          attenuationColor="#180d06"
          attenuationDistance={2.5}
        />
      </mesh>

      {/* ==========================================
          AMBER SPIRIT / LIQUID
          ========================================== */}

      <mesh position={[0, -0.08, 0]} scale={[0.98, 0.98, 0.98]}>
        <latheGeometry args={[liquidProfile, 128]} />

        <meshPhysicalMaterial
          color="#5a2508"
          roughness={0.16}
          metalness={0}
          transmission={0.12}
          thickness={0.5}
          ior={1.42}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          attenuationColor="#6b2608"
          attenuationDistance={1.8}
        />
      </mesh>

      {/* ==========================================
          LIQUID SURFACE
          ========================================== */}

      <mesh position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.28, 96]} />

        <meshPhysicalMaterial
          color="#6e2c09"
          roughness={0.12}
          transmission={0.08}
          thickness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* ==========================================
          NECK BAND
          ========================================== */}

      <mesh position={[0, 3.05, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.12, 96]} />

        <meshStandardMaterial
          color="#161616"
          metalness={0.75}
          roughness={0.22}
        />
      </mesh>

      {/* ==========================================
          GOLD CAP
          ========================================== */}

      <mesh position={[0, 3.4, 0]} castShadow>
        <cylinderGeometry args={[0.51, 0.51, 0.58, 96]} />

        <meshStandardMaterial color="#a98246" metalness={1} roughness={0.2} />
      </mesh>

      {/* ==========================================
          CAP TOP
          ========================================== */}

      <mesh position={[0, 3.7, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.08, 96]} />

        <meshStandardMaterial color="#d2ad68" metalness={1} roughness={0.14} />
      </mesh>

      {/* ==========================================
          FRONT LABEL
          ========================================== */}

      <group position={[0, 0.05, 1.405]}>
        {/* Outer label */}

        <mesh>
          <planeGeometry args={[1.82, 1.75]} />

          <meshStandardMaterial color="#eee8db" roughness={0.78} />
        </mesh>

        {/* Inner dark frame */}

        <mesh position={[0, 0, 0.008]}>
          <planeGeometry args={[1.55, 1.48]} />

          <meshStandardMaterial color="#111111" roughness={0.7} />
        </mesh>

        {/* Inner gold frame */}

        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[1.43, 1.36]} />

          <meshStandardMaterial
            color="#b08d57"
            roughness={0.35}
            metalness={0.55}
          />
        </mesh>

        {/* Main label face */}

        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.34, 1.27]} />

          <meshStandardMaterial color="#f4efe4" roughness={0.82} />
        </mesh>
      </group>

      {/* ==========================================
          LABEL TEXT
          ========================================== */}

      <group position={[0, 0.05, 1.435]}>
        {/* THE SPIRIT */}

        <sprite position={[0, 0.43, 0]}>
          <spriteMaterial
            map={createTextTexture("THE SPIRIT", 42, "#151515")}
            transparent
          />
        </sprite>

        {/* KAAL */}

        <sprite position={[0, 0.02, 0.01]}>
          <spriteMaterial
            map={createTextTexture("KAAL", 115, "#111111")}
            transparent
          />
        </sprite>

        {/* SPIRITS OF THE MONSOON */}

        <sprite position={[0, -0.34, 0]}>
          <spriteMaterial
            map={createTextTexture("SPIRITS OF THE MONSOON", 28, "#333333")}
            transparent
          />
        </sprite>

        {/* PUNE • INDIA */}

        <sprite position={[0, -0.5, 0]}>
          <spriteMaterial
            map={createTextTexture("PUNE • INDIA", 24, "#555555")}
            transparent
          />
        </sprite>
      </group>
    </group>
  );
});

/*
 * ==================================================
 * TEXTURE GENERATOR
 * ==================================================
 *
 * Creates label typography without needing an image.
 */

function createTextTexture(text: string, fontSize: number, color: string) {
  const canvas = document.createElement("canvas");

  canvas.width = 1024;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = color;
  context.font = `${fontSize}px Arial`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

KaalBottle.displayName = "KaalBottle";

export default KaalBottle;
