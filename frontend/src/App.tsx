import { useState } from 'react';
import { URLInput } from './components/URLInput';
import { FeaturedArticles } from './components/FeaturedArticles';
import { ErrorMessage } from './components/ErrorMessage';
import { Loading3D } from './components/Loading3D';
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>3D Word Cloud</h1>
        <URLInput onAnalyze={handleAnalyze} loading={loading} />
        <FeaturedArticles onSelect={handleAnalyze} disabled={loading} />
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      
      {loading && <Loading3D />}
      
      {result && (
        <div style={styles.result}>
          <h2>{result.data.title}</h2>
          <p>{result.data.words.length} keywords extracted</p>
          <div style={styles.wordList}>
            {result.data.words.slice(0, 10).map(word => (
              <span key={word.text} style={styles.wordItem}>
                {word.text} ({word.weight.toFixed(2)})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '40px 20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
    zIndex: 1,
  },
  title: {
  wordList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
    marginTop: '20px',
    justifyContent: 'center',
  },
  wordItem: {
    padding: '8px 12px',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#4CAF50',
  },
    fontSize: '32px',
    fontWeight: 700,
  },
  result: {
    marginTop: '40px',
    textAlign: 'center' as const,
  },
};

export default App;
