import LZString from 'lz-string';
import { Word } from '../types';

export function generateEmbedCode(words: Word[], title: string): string {
  const data = { words, title };
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data));
  const embedUrl = `${window.location.origin}/viewer?data=${compressed}`;
  
  return `<iframe src="${embedUrl}" width="800" height="600" frameborder="0"></iframe>`;
}

export function decodeEmbedData(): { words: Word[]; title: string } | null {
  const params = new URLSearchParams(window.location.search);
  const compressed = params.get('data');
  
  if (!compressed) return null;
  
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    if (!decompressed) return null;
    
    const data = JSON.parse(decompressed);
    
    if (!data.words || !Array.isArray(data.words)) return null;
    
    // Clamp weights to 0-1 range
    data.words = data.words.map((word: any) => ({
      text: String(word.text).substring(0, 50),
      weight: Math.max(0, Math.min(1, Number(word.weight) || 0))
    }));
    
    return data;
  } catch {
    return null;
  }
}
