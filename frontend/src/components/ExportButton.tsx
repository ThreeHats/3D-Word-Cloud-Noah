import { useState } from 'react';

interface ExportButtonProps {
  onClick: () => void;
}

export function ExportButton({ onClick }: ExportButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 24px',
        backgroundColor: hovered ? '#1d4ed8' : '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        boxShadow: hovered 
          ? '0 4px 12px rgba(0,0,0,0.2)' 
          : '0 2px 8px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      Save PNG
    </button>
  );
}
