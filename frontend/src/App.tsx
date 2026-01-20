import { useState, useEffect } from 'react';
import { URLInput } from './components/URLInput';
import { FeaturedArticles } from './components/FeaturedArticles';
import { ErrorMessage } from './components/ErrorMessage';
import { Loading3D } from './components/Loading3D';
import { WordCloud3D } from './components/WordCloud3D';
import { EmbedModal } from './components/EmbedModal';
import { analyzeArticle } from './services/api';
import { generateEmbedCode } from './utils/embedGenerator';
import { AnalyzeResponse } from './types';
import LZString from 'lz-string';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [embedCode, setEmbedCode] = useState<string | null>(null);
  const [embedData, setEmbedData] = useState<string | null>(null);

  // Load from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const compressed = params.get('data');
    
    if (compressed) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
        if (decompressed) {
          const data = JSON.parse(decompressed);
          if (data.words && data.title) {
            setResult({
              status: 'success',
              data: {
                title: data.title,
                words: data.words,
              },
            });
          }
        }
      } catch (err) {
        console.error('Failed to load word cloud from URL:', err);
      }
    }
  }, []);

  async function handleAnalyze(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    setEmbedCode(null);
    setEmbedData(null);
    
    // Clear URL params when analyzing new article
    window.history.pushState({}, '', '/');

    try {
      const data = await analyzeArticle(url);
      setResult(data);
      
      // Update URL with word cloud data
      const cloudData = { words: data.data.words, title: data.data.title };
      const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(cloudData));
      window.history.pushState({}, '', `/?data=${compressed}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze article. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleEmbed() {
    if (!result) return;
    const code = generateEmbedCode(result.data.words, result.data.title);
    const data = { words: result.data.words, title: result.data.title };
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data));
    setEmbedCode(code);
    setEmbedData(compressed);
  }

  return (
    <>
      <WordCloud3D 
        words={result?.data.words} 
        title={result?.data.title}
        onEmbed={result ? handleEmbed : undefined}
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
      
      {embedCode && <EmbedModal embedCode={embedCode} embedData={embedData || undefined} onClose={() => setEmbedCode(null)} />}
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
    bottom: 35,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px',
    padding: '30px',
    pointerEvents: 'none' as const,
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    margin: 0,
    pointerEvents: 'none' as const,
  },
};

export default App;
