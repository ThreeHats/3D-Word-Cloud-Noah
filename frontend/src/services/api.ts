import axios from 'axios';
import { AnalyzeResponse } from '../types';

const API_BASE = 'http://localhost:8000';

export async function analyzeArticle(url: string): Promise<AnalyzeResponse> {
  const { data } = await axios.post<AnalyzeResponse>(`${API_BASE}/analyze`, { url });
  return data;
}

export async function checkHealth(): Promise<{ status: string; version: string }> {
  const { data } = await axios.get(`${API_BASE}/health`);
  return data;
}
