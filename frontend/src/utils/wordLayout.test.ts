import { describe, it, expect } from 'vitest';
import { calculateWordPositions } from './wordLayout';
import { Word } from '../types';

describe('wordLayout', () => {
  it('returns correct number of positions', () => {
    const words: Word[] = [
      { text: 'test1', weight: 0.9 },
      { text: 'test2', weight: 0.5 },
      { text: 'test3', weight: 0.3 },
    ];

    const positions = calculateWordPositions(words);
    expect(positions).toHaveLength(3);
  });

  it('places high-weight words closer to center', () => {
    const words: Word[] = [
      { text: 'high', weight: 0.95 },
      { text: 'low', weight: 0.1 },
    ];

    const positions = calculateWordPositions(words);
    
    // High weight word should be at index 0 (after sorting descending)
    const highWeightDistance = Math.sqrt(
      positions[0].x ** 2 + positions[0].y ** 2 + positions[0].z ** 2
    );
    
    const lowWeightDistance = Math.sqrt(
      positions[1].x ** 2 + positions[1].y ** 2 + positions[1].z ** 2
    );

    expect(highWeightDistance).toBeLessThan(lowWeightDistance);
  });

  it('respects minimum radius constraint', () => {
    const words: Word[] = [
      { text: 'word1', weight: 1.0 },
      { text: 'word2', weight: 0.8 },
    ];

    const positions = calculateWordPositions(words);
    const minRadius = 20; // From wordLayout.ts

    positions.forEach(pos => {
      const distance = Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2);
      expect(distance).toBeGreaterThanOrEqual(minRadius - 1); // Allow small floating point variance
    });
  });

  it('handles single word', () => {
    const words: Word[] = [{ text: 'alone', weight: 0.5 }];
    const positions = calculateWordPositions(words);

    expect(positions).toHaveLength(1);
    expect(positions[0]).toHaveProperty('x');
    expect(positions[0]).toHaveProperty('y');
    expect(positions[0]).toHaveProperty('z');
  });

  it('generates spherical distribution', () => {
    const words: Word[] = Array.from({ length: 20 }, (_, i) => ({
      text: `word${i}`,
      weight: 0.5,
    }));

    const positions = calculateWordPositions(words);

    // Check that words are distributed in 3D space (not all on same plane)
    const xValues = positions.map(p => p.x);
    const yValues = positions.map(p => p.y);
    const zValues = positions.map(p => p.z);

    // Standard deviation should be significant if distributed in 3D
    const stdDev = (arr: number[]) => {
      const mean = arr.reduce((a, b) => a + b) / arr.length;
      const variance = arr.reduce((sum, val) => sum + (val - mean) ** 2, 0) / arr.length;
      return Math.sqrt(variance);
    };

    expect(stdDev(xValues)).toBeGreaterThan(5);
    expect(stdDev(yValues)).toBeGreaterThan(5);
    expect(stdDev(zValues)).toBeGreaterThan(5);
  });
});
