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
        padding: '10px 18px',
        backgroundColor: hovered ? 'rgba(37, 99, 235, 0.25)' : 'rgba(37, 99, 235, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        boxShadow: hovered 
          ? '0 8px 24px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
          : '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
        transform: hovered ? 'translateY(-1px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      PNG
    </button>
  );
}
