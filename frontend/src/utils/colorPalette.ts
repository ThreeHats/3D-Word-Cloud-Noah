export function getColorForWeight(weight: number): string {
  const blue = { r: 65, g: 105, b: 225 };
  const red = { r: 220, g: 20, b: 60 };

  const r = Math.round(blue.r + (red.r - blue.r) * weight);
  const g = Math.round(blue.g + (red.g - blue.g) * weight);
  const b = Math.round(blue.b + (red.b - blue.b) * weight);

  return `rgb(${r}, ${g}, ${b})`;
}
