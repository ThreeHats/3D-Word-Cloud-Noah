export function getColorForWeight(weight: number): string {
  // Clamp weight to 0-1 range
  const clampedWeight = Math.max(0, Math.min(1, weight));
  
  const blue = { r: 65, g: 105, b: 225 };
  const red = { r: 220, g: 20, b: 60 };

  const r = Math.round(blue.r + (red.r - blue.r) * clampedWeight);
  const g = Math.round(blue.g + (red.g - blue.g) * clampedWeight);
  const b = Math.round(blue.b + (red.b - blue.b) * clampedWeight);

  return `rgb(${r}, ${g}, ${b})`;
}
