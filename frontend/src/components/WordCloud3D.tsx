import { Canvas, useFrame, ThreeEvent, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Word } from '../types';
import { calculateWordPositions } from '../utils/wordLayout';
import { getColorForWeight } from '../utils/colorPalette';
import { ExportButton } from './ExportButton';
import * as THREE from 'three';

interface WordCloud3DProps {
  words?: Word[];
  title?: string;
}

function WordMesh({ word, position }: { word: Word; position: [number, number, number] }) {
  const fontSize = 2 + word.weight * 3;
  const color = getColorForWeight(word.weight);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
      
      // Smooth scale animation
      const targetScale = hovered ? 1.1 : 1;
      setScale(prev => prev + (targetScale - prev) * 0.12);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      <Text
        ref={meshRef}
        position={position}
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={fontSize * (hovered ? 0.06 : 0.05)}
        outlineColor="#000000"
        fillOpacity={hovered ? 1 : 0.95}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        {word.text}
      </Text>
      {hovered && (
        <Html position={position} center>
          <div style={{
            background: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transform: 'translateY(-30px)'
          }}>
            {(word.weight * 100).toFixed(0)}%
          </div>
        </Html>
      )}
    </>
  );
}

function Scene({ words }: { words?: Word[] }) {
  const { camera, size, gl, scene } = useThree();
  
  const positions = useMemo(() => {
    if (!words) return [];
    return calculateWordPositions(words);
  }, [words]);

  const sortedWords = useMemo(() => {
    if (!words) return [];
    return [...words].sort((a, b) => b.weight - a.weight);
  }, [words]);

  // Responsive camera positioning based on window size
  useEffect(() => {
    const aspectRatio = size.width / size.height;
    
    // Adjust camera distance based on aspect ratio and screen size
    // Mobile portrait: zoom way out; Portrait tablet: zoom out more; Landscape: standard
    const baseDistance = 50;
    const isMobile = size.width < 768;
    
    let distance;
    if (aspectRatio < 0.75 && isMobile) {
      // Mobile portrait - zoom out significantly
      distance = baseDistance * 1.8;
    } else if (aspectRatio < 1) {
      // Portrait tablet or larger portrait screen
      distance = baseDistance * 1.4;
    } else {
      // Landscape or square
      distance = baseDistance;
    }
    
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
  }, [size, camera]);

  // Expose export function to parent
  useEffect(() => {
    (window as any).__exportWordCloud = () => {
      gl.render(scene, camera);
      return gl.domElement;
    };
  }, [gl, scene, camera]);

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
  const handleExport = () => {
    const canvas = (window as any).__exportWordCloud?.();
    if (!canvas) return;

    canvas.toBlob((blob: Blob | null) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = Date.now();
      const filename = title 
        ? `wordcloud-${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${timestamp}.png`
        : `wordcloud-${timestamp}.png`;
      
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

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
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene words={words} />
      </Canvas>
      {words && <ExportButton onClick={handleExport} />}
      {words && title && (
        <div style={{ 
          position: 'absolute',
          top: '60px',
          left: '50%',
          width: '100%',
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
