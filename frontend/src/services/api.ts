import axios from 'axios';
import { AnalyzeResponse } from '../types';

const isLocalNetwork = () => {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || 
         hostname.match(/^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./);
};

const API_BASE = import.meta.env.VITE_API_URL || 
  (isLocalNetwork()
    ? `http://${window.location.hostname}:8000`
    : 'https://threed-word-cloud-noah-backend.onrender.com');

export async function analyzeArticle(url: string): Promise<AnalyzeResponse> {
  const { data } = await axios.post<AnalyzeResponse>(`${API_BASE}/analyze`, { url });
  return data;
}

export async function checkHealth(): Promise<{ status: string; version: string }> {
  const { data } = await axios.get(`${API_BASE}/health`);
  return data;
}
