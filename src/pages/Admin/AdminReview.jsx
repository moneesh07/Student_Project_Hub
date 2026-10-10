import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Clock, ArrowRight, Check, X, AlertTriangle } from 'lucide-react';
import { projectService } from '../../services';
import ConfidenceBadge from '../../components/common/ConfidenceBadge';
import './AdminReview.css';

export default function AdminReview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    async function loadAdminQueue() {
      setLoading(true);
      const all = await projectService.getProjects({}, '', 'relevance');
      setProjects(all);
      setLoading(false);
    }
    loadAdminQueue();
  }, []);

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'pending') return p.validationStatus === 'pending';
    if (activeTab === 'validated') return p.validationStatus === 'validated';
    return true;
  });

  const pendingCount = projects.filter(p => p.validationStatus === 'pending').length;
  const validatedCount = projects.filter(p => p.validationStatus === 'validated').length;

  return (
    <div className="admin-review-page container section">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Technology Tag Validation Portal</h1>
          <p className="page-subtitle">
            Evaluator review queue for inspecting automated stack extraction evidence, confirming taxonomy accuracy, and approving repository indexing.
          </p>
        </div>

        <div className="admin-stats-pills">
          <div className="stat-pill yellow">
            <Clock size={16} />
            <span>{pendingCount} Pending Review</span>
          </div>
          <div className="stat-pill green">
            <CheckCircle2 size={16} />
            <span>{validatedCount} Validated</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="admin-tabs-row">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Projects ({projects.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Review ({pendingCount})
        </button>
        <button
          className={`tab-btn ${activeTab === 'validated' ? 'active' : ''}`}
          onClick={() => setActiveTab('validated')}
        >
          Validated ({validatedCount})
        </button>
      </div>

      {/* Queue Table */}
      <div className="card queue-table-card">
        {loading ? (
          <div className="skeleton-line" style={{ height: '200px' }} />
        ) : (
          <table className="queue-table">
            <thead>
              <tr>
                <th>Project & Domain</th>
                <th>Detected Technology Stack</th>
                <th>Confidence Profile</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(proj => {
                const isValidated = proj.validationStatus === 'validated';
                return (
                  <tr key={proj.id}>
                    <td>
                      <div className="table-proj-info">
                        <Link to={`/projects/${proj.id}`} className="proj-title-link">
                          {proj.title}
                        </Link>
                        <span className="proj-domain">{proj.domain} • ID: {proj.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-tags-cell">
                        {proj.taxonomyTags.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="table-tech-chip">
                            {t.name}
                          </span>
                        ))}
                        {proj.taxonomyTags.length > 3 && (
                          <span className="more-count">+{proj.taxonomyTags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {proj.taxonomyTags[0] && (
                        <ConfidenceBadge confidence={proj.taxonomyTags[0].confidence} />
                      )}
                    </td>
                    <td>
                      <span className={`badge ${isValidated ? 'badge-validated' : 'badge-pending'}`}>
                        {isValidated ? 'Validated' : 'Needs Review'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/review/${proj.id}`} className="btn btn-primary btn-sm">
                        Review Tags <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
