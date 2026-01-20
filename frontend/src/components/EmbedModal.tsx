import { useState } from 'react';

interface EmbedModalProps {
  embedCode: string;
  onClose: () => void;
  embedData?: string;
}

export function EmbedModal({ embedCode, onClose, embedData }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Embed Code</h2>
        <textarea
          readOnly
          value={embedCode}
          style={styles.textarea}
          onClick={(e) => e.currentTarget.select()}
        />
        <div style={styles.buttons}>
          <button onClick={handleCopy} style={styles.copyButton}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {embedData && (
            <a 
              href={`/demo?data=${embedData}`} 
              style={styles.demoButton}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/demo?data=${embedData}`;
              }}
            >
              View Demo →
            </a>
          )}
          <button onClick={onClose} style={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '24px',
    color: '#fff',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '12px',
    fontSize: '14px',
    fontFamily: 'monospace',
    backgroundColor: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    resize: 'none' as const,
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  copyButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  },
  demoButton: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    textDecoration: 'none',
  },
  closeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: '1px solid #666',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
  },
};
