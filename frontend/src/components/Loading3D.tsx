import { useState, useEffect } from 'react';

export function Loading3D() {
  const [showSlowMessage, setShowSlowMessage] = useState(false);
  
  const isProduction = window.location.hostname !== 'localhost' && 
                       !window.location.hostname.match(/^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./);
  
  useEffect(() => {
    if (isProduction) {
      const timer = setTimeout(() => {
        setShowSlowMessage(true);
      }, 3000); // Show after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isProduction]);
  
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p style={styles.text}>Analyzing article...</p>
      {showSlowMessage && <p style={styles.subtext}>Waking up server, please wait...</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #333',
    borderTop: '4px solid #4CAF50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    marginTop: '20px',
    color: '#888',
    fontSize: '16px',
  },
  subtext: {
    marginTop: '8px',
    color: '#666',
    fontSize: '13px',
    fontStyle: 'italic' as const,
  },
};
