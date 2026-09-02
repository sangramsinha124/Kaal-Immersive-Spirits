"use client";

import { RefObject } from "react";

import { Canvas } from "@react-three/fiber";

import {
  ContactShadows,
  Environment,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";

import * as THREE from "three";

import KaalBottle from "./KaalBottle";
import BotanicalParticles from "./BotanicalParticles";

interface BottleSceneProps {
  bottleRef: RefObject<THREE.Group | null>;
  cameraRef: RefObject<THREE.PerspectiveCamera | null>;
}

export default function BottleScene({
  bottleRef,
  cameraRef,
}: BottleSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* ======================================
          CAMERA
          ====================================== */}

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0.3, 10]}
        fov={34}
      />

      {/* ======================================
          AMBIENT
          ====================================== */}

      <ambientLight intensity={0.18} />

      {/* ======================================
          MAIN KEY LIGHT
          ====================================== */}

      <directionalLight position={[4, 6, 6]} intensity={2.8} castShadow />

      {/* ======================================
          WARM FIRE LIGHT
          ====================================== */}

      <pointLight
        position={[-4, 0, 4]}
        intensity={18}
        distance={10}
        color="#ff8a3d"
      />

      {/* ======================================
          COOL MONSOON LIGHT
          ====================================== */}

      <pointLight
        position={[4, 2, -3]}
        intensity={12}
        distance={9}
        color="#6e9fff"
      />

      {/* ======================================
          TOP RIM
          ====================================== */}

      <pointLight
        position={[0, 6, 2]}
        intensity={10}
        distance={10}
        color="#fff1d2"
      />

      {/* ======================================
          ENVIRONMENT
          ====================================== */}

      <Environment preset="studio" />

      {/* ======================================
          BOTANICAL PARTICLES
          ====================================== */}

      <BotanicalParticles />

      {/* ======================================
          BOTTLE
          ====================================== */}

      <Float speed={0.8} rotationIntensity={0} floatIntensity={0.06}>
        <KaalBottle ref={bottleRef} />
      </Float>

      {/* ======================================
          GROUND SHADOW
          ====================================== */}

      <ContactShadows
        position={[0, -2.02, 0]}
        opacity={0.55}
        scale={8}
        blur={2.8}
        far={5}
      />
    </Canvas>
  );
}
