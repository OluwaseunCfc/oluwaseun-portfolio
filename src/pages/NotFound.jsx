import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', color: '#F9FAFB', textAlign: 'center', gap: '1rem' }}>
      <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '2rem' }}>404 — Page not found</h1>
      <Link to="/" style={{ color: '#10B981' }}>Back home</Link>
    </div>
  );
}

export default NotFound;