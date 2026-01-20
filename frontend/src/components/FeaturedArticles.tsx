interface Article {
  title: string;
  url: string;
}

const FEATURED: Article[] = [
  {
    title: 'Machine Learning (Wikipedia)',
    url: 'https://en.wikipedia.org/wiki/Machine_learning',
  },
  {
    title: 'Artificial Intelligence (Wikipedia)',
    url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  },
  {
    title: 'Climate Change (Wikipedia)',
    url: 'https://en.wikipedia.org/wiki/Climate_change',
  },
];

interface FeaturedArticlesProps {
  onSelect: (url: string) => void;
  disabled: boolean;
}

export function FeaturedArticles({ onSelect, disabled }: FeaturedArticlesProps) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Try these articles:</h3>
      <div style={styles.grid}>
        {FEATURED.map((article) => (
          <button
            key={article.url}
            onClick={() => onSelect(article.url)}
            disabled={disabled}
            style={styles.card}
          >
            {article.title}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '30px',
  },
  title: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '15px',
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    maxWidth: '600px',
  },
  card: {
    padding: '15px',
    border: '1px solid #333',
    borderRadius: '8px',
    background: '#1a1a1a',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'left' as const,
    transition: 'all 0.2s',
  },
};
