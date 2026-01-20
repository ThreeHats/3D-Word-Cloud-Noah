import { Word } from '../types';

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export function calculateWordPositions(words: Word[]): Position3D[] {
  const positions: Position3D[] = [];
  const sortedWords = [...words].sort((a, b) => b.weight - a.weight);
  
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle for even distribution
  
  sortedWords.forEach((word, i) => {
    const weight = word.weight;
    const t = i / sortedWords.length; // 0 to 1 progression
    
    // Radius grows from center outward (0 -> max radius)
    // First word (highest weight) gets smallest radius, last word gets largest
    const minRadius = 20;  // Start further from center to avoid clustering
    const maxRadius = 50; // Extend to edges
    const radius = minRadius + t * (maxRadius - minRadius);
    
    // Spherical coordinates with golden angle for even distribution
    const theta = phi * i; // Azimuthal angle
    const phi_angle = Math.acos(1 - 2 * t); // Polar angle for even distribution
    
    // Convert spherical to Cartesian
    const x = radius * Math.sin(phi_angle) * Math.cos(theta);
    const y = radius * Math.sin(phi_angle) * Math.sin(theta);
    const z = radius * Math.cos(phi_angle);
    
    // Add organic variation (less for high-weight words at center)
    const baseVariation = 6;
    const weightFactor = Math.pow(weight, 1.5);
    const variation = baseVariation * (1 - weightFactor * 0.5);
    
    const offsetX = (Math.random() - 0.5) * variation;
    const offsetY = (Math.random() - 0.5) * variation;
    const offsetZ = (Math.random() - 0.5) * variation;
    
    positions.push({
      x: x + offsetX,
      y: y + offsetY,
      z: z + offsetZ
    });
  });

  return positions;
}
