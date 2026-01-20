import { WordCloud3D } from '../components/WordCloud3D';
import { decodeEmbedData } from '../utils/embedGenerator';

export function Viewer() {
  const data = decodeEmbedData();

  if (!data) {
    return (
      <div style={styles.error}>
        <h1>Invalid embed URL</h1>
        <p>The word cloud data could not be loaded.</p>
      </div>
    );
  }

  return <WordCloud3D words={data.words} title={data.title} isEmbedded={true} />;
}

const styles = {
  error: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#fff',
    textAlign: 'center' as const,
  },
};
