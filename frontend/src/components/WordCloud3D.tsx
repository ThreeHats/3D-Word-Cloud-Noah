import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { Word } from '../types';
import { calculateWordPositions } from '../utils/wordLayout';
import { getColorForWeight } from '../utils/colorPalette';
import * as THREE from 'three';

interface WordCloud3DProps {
  words?: Word[];
  title?: string;
}

function WordMesh({ word, position }: { word: Word; position: [number, number, number] }) {
  const fontSize = 2 + word.weight * 3;
  const color = getColorForWeight(word.weight);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={fontSize * 0.05}
      outlineColor="#000000"
      fillOpacity={0.95}
    >
      {word.text}
    </Text>
  );
}

function Scene({ words }: { words?: Word[] }) {
  const positions = useMemo(() => {
    if (!words) return [];
    return calculateWordPositions(words);
  }, [words]);

  const sortedWords = useMemo(() => {
    if (!words) return [];
    return [...words].sort((a, b) => b.weight - a.weight);
  }, [words]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {sortedWords.map((word, i) => (
        <WordMesh
          key={word.text}
          word={word}
          position={[positions[i].x, positions[i].y, positions[i].z]}
        />
      ))}
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={20}
        maxDistance={100}
      />
    </>
  );
}

export function WordCloud3D({ words, title }: WordCloud3DProps) {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0
    }}>
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene words={words} />
      </Canvas>
      {words && title && (
        <div style={{ 
          position: 'absolute',
          bottom: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          {title} • {words.length} keywords • Drag to rotate
        </div>
      )}
    </div>
  );
}
