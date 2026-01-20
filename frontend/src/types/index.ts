export interface Word {
  text: string;
  weight: number;
}

export interface AnalyzeResponse {
  status: string;
  data: {
    title: string;
    words: Word[];
  };
}

export interface AnalyzeRequest {
  url: string;
}
