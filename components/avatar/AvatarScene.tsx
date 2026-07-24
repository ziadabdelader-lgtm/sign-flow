'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAvatarStore } from '@/store/avatarStore';
import type { AvatarStatus } from '@/types/avatar';

function AvatarModel({ status }: { status: AvatarStatus }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (status === 'idle') {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
      if (leftArmRef.current) leftArmRef.current.rotation.z = 0.3 + Math.sin(t) * 0.05;
      if (rightArmRef.current) rightArmRef.current.rotation.z = -0.3 - Math.sin(t) * 0.05;
    } else if (status === 'thinking') {
      groupRef.current.rotation.y = Math.sin(t * 2) * 0.1;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -0.8 + Math.sin(t * 3) * 0.1;
    } else if (status === 'signing') {
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 4) * 0.6;
        leftArmRef.current.rotation.x = Math.cos(t * 4) * 0.4;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.3 - Math.sin(t * 4 + 1) * 0.6;
        rightArmRef.current.rotation.x = Math.cos(t * 4 + 1) * 0.4;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#1A8FD1" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 16]} />
        <meshStandardMaterial color="#0E4F8A" roughness={0.4} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color="#0E4F8A" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Left arm */}
      <mesh ref={leftArmRef} position={[-0.45, 1.1, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
        <meshStandardMaterial color="#1A8FD1" roughness={0.4} />
      </mesh>

      {/* Right arm */}
      <mesh ref={rightArmRef} position={[0.45, 1.1, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
        <meshStandardMaterial color="#1A8FD1" roughness={0.4} />
      </mesh>

      {/* Left hand */}
      <mesh position={[-0.45, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#29C5E6" roughness={0.3} />
      </mesh>

      {/* Right hand */}
      <mesh position={[0.45, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#29C5E6" roughness={0.3} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -0.2, 0]} castShadow>
        <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
        <meshStandardMaterial color="#0A2540" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, -0.2, 0]} castShadow>
        <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
        <meshStandardMaterial color="#0A2540" roughness={0.5} />
      </mesh>
    </group>
  );
}

function StatusIndicator({ status }: { status: AvatarStatus }) {
  const color = useMemo(() => {
    switch (status) {
      case 'idle': return '#10B981';
      case 'thinking': return '#F59E0B';
      case 'signing': return '#1A8FD1';
      case 'loading': return '#29C5E6';
      case 'error': return '#EF4444';
      default: return '#10B981';
    }
  }, [status]);

  return (
    <mesh position={[0, 2.5, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

export function AvatarScene() {
  const status = useAvatarStore((s) => s.status);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 4], fov: 45 }}
      className="!bg-transparent"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#29C5E6" />

      <Float speed={status === 'idle' ? 1.5 : 0} rotationIntensity={0.2} floatIntensity={0.3}>
        <AvatarModel status={status} />
        <StatusIndicator status={status} />
      </Float>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.3}
        scale={5}
        blur={2}
        far={4}
      />

      <Environment preset="city" />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        autoRotate={status === 'idle'}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
