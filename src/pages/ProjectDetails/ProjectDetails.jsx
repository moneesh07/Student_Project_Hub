import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Code, ExternalLink, ShieldCheck, Users, Cpu, FileText, Layers } from 'lucide-react';
import { projectService } from '../../services';
import ConfidenceBadge from '../../components/common/ConfidenceBadge';
import ProjectCard from '../../components/project/ProjectCard';
import TagBadge from '../../components/common/TagBadge';
import './ProjectDetails.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjectData() {
      setLoading(true);
      try {
        const p = await projectService.getProjectById(id);
        const rel = await projectService.getRelatedProjects(id, 3);
        setProject(p);
        setRelated(rel);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    loadProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="container section">
        <div className="card skeleton-card" style={{ height: '400px' }} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container section text-center">
        <h2>Project Not Found</h2>
        <p>The requested project ID does not exist.</p>
        <Link to="/projects" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Projects
        </Link>
      </div>
    );
  }

  const isValidated = project.validationStatus === 'validated';

  return (
    <div className="project-details-page container section">
      {/* Back Link */}
      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} /> Back to Projects Explorer
      </Link>

      {/* Main Details Header Card */}
      <div className="card details-header-card">
        <div className="header-meta">
          <span className="domain-pill">{project.domain}</span>
          <span className={`badge ${isValidated ? 'badge-validated' : 'badge-pending'}`}>
            {isValidated ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {isValidated ? 'Validated Repository' : 'Pending Tag Review'}
          </span>
        </div>

        <h1 className="project-title">{project.title}</h1>
        <p className="project-lead">{project.shortDescription}</p>

        <div className="header-actions">
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Code size={16} /> View Code Repository <ExternalLink size={14} />
            </a>
          )}
          {project.documentationUrl && (
            <a href={project.documentationUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              <FileText size={16} /> Technical Documentation <ExternalLink size={14} />
            </a>
          )}
          <Link to={`/admin/review/${project.id}`} className="btn btn-outline btn-sm admin-btn">
            <ShieldCheck size={14} /> Admin Tag Review
          </Link>
        </div>
      </div>

      <div className="details-grid">
        {/* Main Content Pane */}
        <div className="details-main">
          {/* Problem Statement */}
          <section className="card details-section">
            <h3 className="section-heading">Problem Statement</h3>
            <p className="section-text">{project.problemStatement}</p>
          </section>

          {/* Technical Abstract */}
          <section className="card details-section">
            <h3 className="section-heading">Technical Abstract</h3>
            <p className="section-text">{project.abstract}</p>
          </section>

          {/* Automated Technology Tags & Confidence Matrix */}
          <section className="card details-section">
            <h3 className="section-heading">
              <Cpu size={20} className="icon-blue" /> Mapped Technology Stack Taxonomy
            </h3>
            <p className="section-subtext">
              Automated taxonomy tags extracted from source tree dependencies, import manifests, and configuration parsing.
            </p>

            <div className="tag-matrix-list">
              {project.taxonomyTags.map((tag, idx) => (
                <div key={idx} className="matrix-row">
                  <div className="matrix-left">
                    <span className="tag-category">{tag.category}</span>
                    <span className="tag-name">{tag.name}</span>
                  </div>
                  <div className="matrix-middle">
                    <span className="evidence-text">Signal: {tag.evidence}</span>
                  </div>
                  <div className="matrix-right">
                    <ConfidenceBadge confidence={tag.confidence} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Members */}
          <section className="card details-section">
            <h3 className="section-heading">
              <Users size={20} className="icon-blue" /> Student Development Team
            </h3>
            <div className="team-info">
              <div className="team-name">Team: <strong>{project.team.name}</strong></div>
              <div className="member-grid">
                {project.team.members.map((m, idx) => (
                  <div key={idx} className="member-card">
                    <span className="member-name">{m.name}</span>
                    <span className="member-role">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info Pane */}
        <aside className="details-sidebar">
          <div className="card sidebar-card">
            <h4 className="sidebar-title">Technology Summary</h4>
            <div className="sidebar-tags">
              {project.technologies.map((tech, idx) => (
                <TagBadge key={idx} text={tech} />
              ))}
            </div>
          </div>

          <div className="card sidebar-card">
            <h4 className="sidebar-title">Audit Metadata</h4>
            <div className="meta-list">
              <div className="meta-item">
                <span className="meta-label">Project ID:</span>
                <span className="meta-val">{project.id}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Last Updated:</span>
                <span className="meta-val">{project.updatedAt}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Verification:</span>
                <span className="meta-val">{project.validationStatus}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="related-section">
          <h3 className="section-heading">Related Student Hackathon Projects</h3>
          <div className="grid grid-cols-1 grid-cols-3" style={{ marginTop: '1rem' }}>
            {related.map(rel => (
              <ProjectCard key={rel.id} project={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
