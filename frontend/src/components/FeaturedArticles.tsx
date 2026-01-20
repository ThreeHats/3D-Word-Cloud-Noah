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
      <p style={styles.title}>Try these articles:</p>
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
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    fontSize: '13px',
    color: '#888',
    margin: 0,
    fontWeight: 400,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '8px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  card: {
    padding: '6px 12px',
    border: '1px solid #333',
    borderRadius: '6px',
    background: '#1a1a1a',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap' as const,
  },
};
