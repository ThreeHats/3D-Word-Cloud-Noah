import { useState } from 'react';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export function URLInput({ onAnalyze, loading }: URLInputProps) {
  const [url, setUrl] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste article URL..."
        disabled={loading}
        style={styles.input}
      />
      <button type="submit" disabled={loading || !url.trim()} style={styles.button}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    maxWidth: '600px',
    pointerEvents: 'auto' as const,
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #333',
    borderRadius: '8px',
    background: '#1a1a1a',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    background: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  },
};
