"use client";

import { useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";

import { Environment, PerspectiveCamera } from "@react-three/drei";

import MonsoonRain from "./MonsoonRain";

import MonsoonMist from "./MonsoonMist";

import * as THREE from "three";

import KaalBottle from "./KaalBottle";
import BotanicalParticles from "./BotanicalParticles";
import ForegroundDroplets from "./ForegroundDroplets";

type BottleSceneProps = {
  bottleRef: React.RefObject<THREE.Group | null>;

  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;

  onReady?: () => void;
};

/*
 * ============================================================
 * SCENE READY
 * ============================================================
 */

function SceneReady({
  bottleRef,
  cameraRef,
  onReady,
}: {
  bottleRef: React.RefObject<THREE.Group | null>;

  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;

  onReady?: () => void;
}) {
  const calledRef = useRef(false);

  useEffect(() => {
    let frame1 = 0;
    let frame2 = 0;
    let frame3 = 0;

    const checkScene = () => {
      if (!calledRef.current && bottleRef.current && cameraRef.current) {
        calledRef.current = true;

        console.log("✅ Three.js bottle + camera ready");

        onReady?.();

        return;
      }

      frame3 = requestAnimationFrame(checkScene);
    };

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        frame3 = requestAnimationFrame(checkScene);
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      cancelAnimationFrame(frame3);
    };
  }, [bottleRef, cameraRef, onReady]);

  return null;
}

/*
 * ============================================================
 * BOTTLE SCENE
 * ============================================================
 */

export default function BottleScene({
  bottleRef,
  cameraRef,
  onReady,
}: BottleSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.15]}
      shadows={false}
      frameloop="always"
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        depth: true,
        stencil: false,
        preserveDrawingBuffer: false,
      }}
      camera={{
        position: [0, 0, 11],
        fov: 42,
        near: 0.1,
        far: 100,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* ======================================================
          CAMERA
      ====================================================== */}

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 11]}
        fov={42}
        near={0.1}
        far={100}
      />

      {/* ======================================================
          GENERAL AMBIENT
      ====================================================== */}

      <ambientLight intensity={0.22} />

      {/* ======================================================
          LARGE KEY LIGHT
      ====================================================== */}

      <directionalLight position={[4, 7, 6]} intensity={1.7} />

      {/* ======================================================
          WARM RIM
      ====================================================== */}

      <pointLight
        position={[4.5, 2.5, 3]}
        intensity={12}
        distance={12}
        decay={2}
        color="#ff9d45"
      />

      {/* ======================================================
          COOL RIM
      ====================================================== */}

      <pointLight
        position={[-4.5, 2.5, 3]}
        intensity={9}
        distance={11}
        decay={2}
        color="#729cff"
      />

      {/* ======================================================
          FRONT LABEL LIGHT
      ====================================================== */}

      <pointLight
        position={[0, 1, 6]}
        intensity={5}
        distance={12}
        decay={2}
        color="#fff8ed"
      />

      {/* ======================================================
          TOP HIGHLIGHT
      ====================================================== */}

      <pointLight
        position={[0, 6, 1]}
        intensity={4}
        distance={10}
        decay={2}
        color="#ffe0ad"
      />

      {/* ======================================================
          LOWER WARM LIGHT
      ====================================================== */}

      <pointLight
        position={[0, -3, 3]}
        intensity={2.5}
        distance={8}
        decay={2}
        color="#9a3d0d"
      />

      <pointLight
        position={[0, 1, -4]}
        intensity={8}
        distance={10}
        decay={2}
        color="#fff1d0"
      />

      {/* ======================================================
          ENVIRONMENT
      ====================================================== */}

      <Environment preset="studio" environmentIntensity={0.2} />

      <MonsoonMist />

      <MonsoonRain />
      {/* ======================================================
          BOTTLE
      ====================================================== */}

      <KaalBottle ref={bottleRef} />

      <ForegroundDroplets />

      {/* ======================================================
          PARTICLES
      ====================================================== */}

      <BotanicalParticles />

      {/* ======================================================
          READY
      ====================================================== */}

      <SceneReady
        bottleRef={bottleRef}
        cameraRef={cameraRef}
        onReady={onReady}
      />
    </Canvas>
  );
}
