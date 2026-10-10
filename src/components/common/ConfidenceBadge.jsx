import React from 'react';

export default function ConfidenceBadge({ confidence }) {
  const pct = Math.round(confidence * 100);
  let colorClass = 'high-conf';
  let label = 'High Confidence';

  if (pct < 70) {
    colorClass = 'low-conf';
    label = 'Low Confidence';
  } else if (pct < 85) {
    colorClass = 'med-conf';
    label = 'Medium Confidence';
  }

  return (
    <div className={`confidence-badge ${colorClass}`} title={`${pct}% automated score (${label})`}>
      <span className="conf-value">{pct}%</span>
      <span className="conf-label">{label}</span>
    </div>
  );
}
