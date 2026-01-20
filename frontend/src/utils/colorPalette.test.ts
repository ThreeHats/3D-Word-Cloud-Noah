import { describe, it, expect } from 'vitest';
import { getColorForWeight } from './colorPalette';

describe('colorPalette', () => {
  it('returns blue for low weight (0)', () => {
    const color = getColorForWeight(0);
    // Blue: rgb(65, 105, 225)
    expect(color).toBe('rgb(65, 105, 225)');
  });

  it('returns red for high weight (1)', () => {
    const color = getColorForWeight(1);
    // Red: rgb(220, 20, 60)
    expect(color).toBe('rgb(220, 20, 60)');
  });

  it('returns gradient color for mid weight', () => {
    const color = getColorForWeight(0.5);
    
    // Should be somewhere between blue and red
    expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    expect(color).not.toBe('rgb(65, 105, 225)'); // Not pure blue
    expect(color).not.toBe('rgb(220, 20, 60)'); // Not pure red
  });

  it('handles weight clamping above 1', () => {
    const color = getColorForWeight(1.5);
    // Should clamp to red (weight 1)
    expect(color).toBe('rgb(220, 20, 60)');
  });

  it('handles negative weights', () => {
    const color = getColorForWeight(-0.5);
    // Should clamp to blue (weight 0)
    expect(color).toBe('rgb(65, 105, 225)');
  });

  it('generates smooth gradient across weights', () => {
    const colors = [0, 0.25, 0.5, 0.75, 1].map(w => getColorForWeight(w));
    
    // All should be valid RGB strings
    colors.forEach(color => {
      expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
    });

    // Colors should be distinct
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBe(5);
  });

  it('produces consistent output for same weight', () => {
    const weight = 0.42;
    const color1 = getColorForWeight(weight);
    const color2 = getColorForWeight(weight);
    
    expect(color1).toBe(color2);
  });
});
