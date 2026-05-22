'use client';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error; 
  reset: () => void;
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ color: '#e74c3c' }}>Une erreur est survenue</h2>
      <p style={{ color: '#666', margin: '1rem 0' }}>{error.message}</p>
      <button 
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Réessayer
      </button>
    </div>
  );
}