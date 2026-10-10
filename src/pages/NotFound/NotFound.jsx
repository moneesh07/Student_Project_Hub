import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container section text-center" style={{ padding: '6rem 1rem' }}>
      <ShieldAlert size={64} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
      <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>404 - Page Not Found</h1>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        The requested repository endpoint or route does not exist in SIH Project Hub.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} /> Return to Home
      </Link>
    </div>
  );
}
