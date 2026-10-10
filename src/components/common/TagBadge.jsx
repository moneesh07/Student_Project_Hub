import React from 'react';
import { Link } from 'react-router-dom';

export default function TagBadge({ text, clickable = true }) {
  if (clickable) {
    return (
      <Link to={`/projects?technology=${encodeURIComponent(text.toLowerCase())}`} className="tech-tag">
        {text}
      </Link>
    );
  }
  return <span className="tech-tag">{text}</span>;
}
