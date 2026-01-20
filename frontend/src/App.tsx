import { useState } from 'react';
import { URLInput } from './components/URLInput';
import { FeaturedArticles } from './components/FeaturedArticles';
import { ErrorMessage } from './components/ErrorMessage';
import { Loading3D } from './components/Loading3D';
import { WordCloud3D } from './components/WordCloud3D';
import { analyzeArticle } from './services/api';
import { AnalyzeResponse } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  async function handleAnalyze(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeArticle(url);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze article. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <WordCloud3D 
        words={result?.data.words} 
        title={result?.data.title} 
      />
      
      <div style={styles.topBar}>
        <h1 style={styles.title}>3D Word Cloud</h1>
      </div>

      <div style={styles.bottomBar}>
        <URLInput onAnalyze={handleAnalyze} loading={loading} />
        <FeaturedArticles onSelect={handleAnalyze} disabled={loading} />
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      
      {loading && <Loading3D />}
    </>
  );
}

const styles = {
  topBar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    pointerEvents: 'none' as const,
  },
  bottomBar: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px',
    padding: '30px',
    pointerEvents: 'auto' as const,
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    margin: 0,
    pointerEvents: 'none' as const,
  },
};

export default App;
