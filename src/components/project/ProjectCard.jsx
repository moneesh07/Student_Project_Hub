import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight, Code, ExternalLink } from 'lucide-react';
import TagBadge from '../common/TagBadge';

export default function ProjectCard({ project }) {
  const isValidated = project.validationStatus === 'validated';

  return (
    <div className="card project-card">
      <div className="card-header">
        <span className="domain-pill">{project.domain}</span>
        <span className={`badge ${isValidated ? 'badge-validated' : 'badge-pending'}`}>
          {isValidated ? (
            <>
              <CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Validated
            </>
          ) : (
            <>
              <Clock size={12} style={{ marginRight: '4px' }} /> Pending Review
            </>
          )}
        </span>
      </div>

      <h3 className="card-title">
        <Link to={`/projects/${project.id}`}>{project.title}</Link>
      </h3>

      <p className="card-desc">{project.shortDescription}</p>

      <div className="card-tags">
        {project.technologies.slice(0, 5).map((tech, idx) => (
          <TagBadge key={idx} text={tech} />
        ))}
        {project.technologies.length > 5 && (
          <span className="more-tags">+{project.technologies.length - 5} more</span>
        )}
      </div>

      <div className="card-footer">
        <span className="card-date">Updated {project.updatedAt}</span>
        <Link to={`/projects/${project.id}`} className="btn btn-outline btn-sm">
          View Project <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
