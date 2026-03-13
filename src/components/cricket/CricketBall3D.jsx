import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function CricketBallMesh() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;

    const targetRotX = (mouse.current.y - 0.5) * 0.26;
    const targetRotZ = (mouse.current.x - 0.5) * -0.26;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.05;

    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1;
    meshRef.current.scale.setScalar(pulse);
  });

  React.useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const seamCurve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2;
      const x = Math.cos(t) * 1.52;
      const y = Math.sin(t * 2) * 0.3;
      const z = Math.sin(t) * 1.52;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  const seamGeometry = useMemo(() => {
    return new THREE.TubeGeometry(seamCurve, 100, 0.025, 8, true);
  }, [seamCurve]);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Main ball */}
        <mesh castShadow>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color="#b11226"
            roughness={0.55}
            metalness={0.1}
            bumpScale={0.02}
          />
        </mesh>

        {/* Seam line */}
        <mesh geometry={seamGeometry}>
          <meshStandardMaterial
            color="#f5f5dc"
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Seam stitches */}
        {Array.from({ length: 40 }).map((_, i) => {
          const t = i / 40;
          const pos = seamCurve.getPointAt(t);
          const tangent = seamCurve.getTangentAt(t);
          const normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
          return (
            <group key={i} position={[pos.x, pos.y, pos.z]}>
              <mesh position={[normal.x * 0.04, normal.y * 0.04, normal.z * 0.04]}>
                <cylinderGeometry args={[0.008, 0.008, 0.08, 4]} />
                <meshStandardMaterial color="#f5f5dc" roughness={0.3} />
              </mesh>
            </group>
          );
        })}

        {/* Red glow */}
        <pointLight color="#b11226" intensity={2} distance={5} position={[0, 0, 0]} />
      </group>
    </Float>
  );
}

function CSSFallbackBall() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 'clamp(150px, 30vw, 280px)', height: 'clamp(150px, 30vw, 280px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #d42a3e 0%, #b11226 50%, #8a0e1e 100%)',
        boxShadow: '0 0 60px rgba(177,18,38,0.5), 0 0 120px rgba(177,18,38,0.2), inset -15px -15px 30px rgba(0,0,0,0.3)',
        position: 'relative',
        animation: 'cssSpinBall 8s linear infinite',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '8%', right: '8%',
          height: '3px', background: '#f5f5dc', transform: 'translateY(-50%) rotate(-15deg)',
          borderRadius: '50%', boxShadow: '0 0 8px rgba(245,245,220,0.4)',
        }} />
      </div>
      <style>{`@keyframes cssSpinBall { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

class Ball3DErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <CSSFallbackBall />;
    return this.props.children;
  }
}

export default function CricketBall3D({ className = '', style = {} }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <Ball3DErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
            });
          }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#f5f5dc" castShadow />
          <pointLight position={[-5, 5, 5]} intensity={1.5} color="#1a3a5c" castShadow />
          <pointLight position={[5, -5, -5]} intensity={1} color="#d4af37" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#1a3a5c" />

          <CricketBallMesh />

          <Environment preset="night" />
          <fog attach="fog" args={['#050d0a', 8, 20]} />
        </Canvas>
      </Ball3DErrorBoundary>
    </div>
  );
}
