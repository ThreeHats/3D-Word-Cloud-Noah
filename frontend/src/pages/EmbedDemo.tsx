export function EmbedDemo() {
  const params = new URLSearchParams(window.location.search);
  const embedData = params.get('data');
  
  // Allow scrolling for this page
  document.body.style.overflow = 'auto';
  document.getElementById('root')!.style.height = 'auto';
  
  const baseUrl = window.location.origin;
  const embedCode = embedData 
    ? `<iframe src="${baseUrl}/viewer?data=${embedData}" width="800" height="600" frameborder="0"></iframe>`
    : `<iframe src="${baseUrl}/viewer?data=N4Ig7g9gTgJgziAXAbVAFwKYA81JAawDsIwAbDGAcwxABpwMBLSgC10QEYBfW9bdkI0KZSpZhkIBjGvTBNW7AAwA6ACwBmAOwBWHnxx4oGAIZwIhIZToNmbJCo069ITAcQgADlAgAjcgFtrOVslZS1dXhd+PEoIY1Ig+TtEFXUOACZtRWyc3OyANmdXARYAV39jQkSQ+zCMrLzGwsjivCIScioMAAIjLww4CTRjNEZzaoVatMzGpqLo9z6jQeERsarZJNDphtmc5v0BZZMoSRYJ5NT6vdyDqLcQUsGYC+3rm4L5h+MoUYAzRiSRjxV61TJfASSczSDy4TY1FLKcEtBYgcg-CyEKzwyaI5GHPAeH6jSSlUg-UF4iIE9xPGQ2XEqfH3ATGDweMSSNbjHGXZQcAAcThRDxgFFKklGPIZfMFwppIBgEAqQkpKjl1JZeD+xklav5Qs1rXcAIwpBevNCGohMQkGCgIMttWtIoE1EI9rWADd6cFGQb5Vr3LEIJRyPqXQr-Bg0CwIBaZVbDTb3L4AFYYPVOxGRoMgY4-M72iPJ114QaF87Z9WlhWDOGJ521vOmOCMODDYQR5nGtE-ajdo2o9FQTGUXomMxjwcpkAe0oO0jdD1oSBQfAzsup4QQUihgCem4VHntMKlG0bOZ7qJPUDGCb9suvDy8vgC3XaZAoA+r-OfAlfPwMH8MxSC9SwjzzV9pDgNssUg3tX0oB1Al-epZ1fW80EPND-0MSdzEsbpAICUDwPg3ChweIxyXPBDUTI30tmdPD3A7DAPB8fd2I8eiHjgUp2WgBtHytViXFMDdKNnTAzgsABHUomIRdVxNjCDpK3FwHUYETmKvKiBDQKAlJnABdehRjQcN3AAQV+RgASBeJuiEEQxHdaQQC4IA" width="800" height="600" frameborder="0"></iframe>`;
  
  const viewerUrl = embedData ? `${baseUrl}/viewer?data=${embedData}` : `${baseUrl}/viewer?data=N4Ig7g9gTgJgziAXAbVAFwKYA81JAawDsIwAbDGAcwxABpwMBLSgC10QEYBfW9bdkI0KZSpZhkIBjGvTBNW7AAwA6ACwBmAOwBWHnxx4oGAIZwIhIZToNmbJCo069ITAcQgADlAgAjcgFtrOVslZS1dXhd+PEoIY1Ig+TtEFXUOACZtRWyc3OyANmdXARYAV39jQkSQ+zCMrLzGwsjivCIScioMAAIjLww4CTRjNEZzaoVatMzGpqLo9z6jQeERsarZJNDphtmc5v0BZZMoSRYJ5NT6vdyDqLcQUsGYC+3rm4L5h+MoUYAzRiSRjxV61TJfASSczSDy4TY1FLKcEtBYgcg-CyEKzwyaI5GHPAeH6jSSlUg-UF4iIE9xPGQ2XEqfH3ATGDweMSSNbjHGXZQcAAcThRDxgFFKklGPIZfMFwppIBgEAqQkpKjl1JZeD+xklav5Qs1rXcAIwpBevNCGohMQkGCgIMttWtIoE1EI9rWADd6cFGQb5Vr3LEIJRyPqXQr-Bg0CwIBaZVbDTb3L4AFYYPVOxGRoMgY4-M72iPJ114QaF87Z9WlhWDOGJ521vOmOCMODDYQR5nGtE-ajdo2o9FQTGUXomMxjwcpkAe0oO0jdD1oSBQfAzsup4QQUihgCem4VHntMKlG0bOZ7qJPUDGCb9suvDy8vgC3XaZAoA+r-OfAlfPwMH8MxSC9SwjzzV9pDgNssUg3tX0oB1Al-epZ1fW80EPND-0MSdzEsbpAICUDwPg3ChweIxyXPBDUTI30tmdPD3A7DAPB8fd2I8eiHjgUp2WgBtHytViXFMDdKNnTAzgsABHUomIRdVxNjCDpK3FwHUYETmKvKiBDQKAlJnABdehRjQcN3AAQV+RgASBeJuiEEQxHdaQQC4IA`;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Embed Demo</h1>
        <p style={styles.description}>
          This page demonstrates the embed feature. Below is a live iframe showing an embedded word cloud.
        </p>

        <div style={styles.codeSection}>
          <h2 style={styles.sectionTitle}>Embed Code:</h2>
          <pre style={styles.code}>{embedCode}</pre>
        </div>

        <div style={styles.iframeSection}>
          <h2 style={styles.sectionTitle}>Live Preview:</h2>
          <div style={styles.iframeContainer}>
            <iframe 
              src={viewerUrl}
              width="800" 
              height="600" 
              style={styles.iframe}
              title="Embedded Word Cloud"
            />
          </div>
        </div>

        <a href="/" style={styles.backLink}>← Back to main app</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    padding: '40px 20px',
    overflowY: 'auto' as const,
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
  },
  title: {
    fontSize: '48px',
    fontWeight: 700,
    marginBottom: '16px',
    textAlign: 'center' as const,
  },
  description: {
    fontSize: '18px',
    color: '#999',
    marginBottom: '48px',
    textAlign: 'center' as const,
  },
  codeSection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '16px',
  },
  code: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '8px',
    fontSize: '12px',
    overflowX: 'auto' as const,
    border: '1px solid #333',
    lineHeight: '1.6',
  },
  iframeSection: {
    marginBottom: '48px',
  },
  iframeContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #333',
    overflow: 'auto' as const,
  },
  iframe: {
    border: 'none',
    borderRadius: '4px',
    maxWidth: '100%',
  },
  backLink: {
    display: 'inline-block',
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
  },
};
