interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <span style={styles.icon}>⚠️</span>
        <p style={styles.message}>{message}</p>
        <button onClick={onDismiss} style={styles.button}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    zIndex: 1000,
  },
  content: {
    background: '#2a1a1a',
    border: '2px solid #ff4444',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: '24px',
  },
  message: {
    color: '#ffcccc',
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.5,
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    background: '#ff4444',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
