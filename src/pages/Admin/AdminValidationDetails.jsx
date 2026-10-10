import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, ShieldCheck, Edit3, Plus, Save, CheckCircle2, FileCode } from 'lucide-react';
import { projectService, submissionService } from '../../services';
import ConfidenceBadge from '../../components/common/ConfidenceBadge';
import './AdminReview.css';

export default function AdminValidationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tags, setTags] = useState([]);
  const [reviewerNote, setReviewerNote] = useState('');
  const [newTechName, setNewTechName] = useState('');
  const [newCategory, setNewCategory] = useState('Framework');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProjectForReview() {
      try {
        const p = await projectService.getProjectById(id);
        setProject(p);
        setTags(p.taxonomyTags || []);
        setReviewerNote(p.reviewerNote || '');
      } catch (err) {
        console.error(err);
      }
    }
    loadProjectForReview();
  }, [id]);

  if (!project) {
    return (
      <div className="container section text-center">
        <h2>Loading Project Review Payload...</h2>
      </div>
    );
  }

  const handleApproveTag = (idx) => {
    const updated = [...tags];
    updated[idx].status = 'validated';
    setTags(updated);
  };

  const handleRejectTag = (idx) => {
    const updated = tags.filter((_, i) => i !== idx);
    setTags(updated);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTechName.trim()) return;
    const newTag = {
      category: newCategory,
      name: newTechName.trim(),
      confidence: 1.0,
      evidence: "Manual evaluator addition",
      status: "validated"
    };
    setTags([...tags, newTag]);
    setNewTechName('');
  };

  const handleApproveAllAndSave = async () => {
    setIsSaving(true);
    const approvedTags = tags.map(t => ({ ...t, status: 'validated' }));
    await submissionService.validateProjectTags(project.id, approvedTags, reviewerNote);
    setIsSaving(false);
    navigate('/admin/review');
  };

  return (
    <div className="admin-validation-page container section">
      <Link to="/admin/review" className="back-link">
        <ArrowLeft size={16} /> Back to Validation Queue
      </Link>

      <div className="card validation-header-card">
        <div className="header-info">
          <span className="domain-pill">{project.domain}</span>
          <h1 className="project-title">{project.title}</h1>
          <span className="repo-url">
            <FileCode size={14} /> Repository Signal Source: {project.repositoryUrl}
          </span>
        </div>

        <div className="header-status">
          <span className={`badge ${project.validationStatus === 'validated' ? 'badge-validated' : 'badge-pending'}`}>
            Status: {project.validationStatus}
          </span>
        </div>
      </div>

      <div className="validation-grid">
        {/* Main Detected Tags Table & Evidence Inspection */}
        <div className="card validation-main-card">
          <h3 className="card-heading">
            <ShieldCheck size={20} className="icon-blue" /> Detected Technology Stack Signals & Evidence
          </h3>

          <div className="evidence-table-wrapper">
            <table className="evidence-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Technology</th>
                  <th>Confidence Score</th>
                  <th>Source Evidence Line</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, idx) => (
                  <tr key={idx} className={tag.status === 'validated' ? 'row-validated' : ''}>
                    <td><span className="cat-label">{tag.category}</span></td>
                    <td><strong className="tech-name">{tag.name}</strong></td>
                    <td><ConfidenceBadge confidence={tag.confidence} /></td>
                    <td><code className="evidence-code">{tag.evidence}</code></td>
                    <td>
                      <div className="action-buttons">
                        {tag.status !== 'validated' ? (
                          <button className="btn-icon approve" title="Approve Tag" onClick={() => handleApproveTag(idx)}>
                            <Check size={16} />
                          </button>
                        ) : (
                          <span className="approved-icon" title="Approved">
                            <CheckCircle2 size={16} color="#15803d" />
                          </span>
                        )}
                        <button className="btn-icon reject" title="Reject / Delete Tag" onClick={() => handleRejectTag(idx)}>
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Manual Tag Form */}
          <div className="add-tag-box">
            <h4 className="box-title">+ Manually Correct or Add Missing Technology Tag</h4>
            <form onSubmit={handleAddTag} className="add-tag-form">
              <select className="form-select" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                <option value="Programming Language">Programming Language</option>
                <option value="Frontend Framework">Frontend Framework</option>
                <option value="Backend Framework">Backend Framework</option>
                <option value="Database">Database</option>
                <option value="AI/ML Framework">AI/ML Framework</option>
              </select>
              <input
                type="text"
                className="form-input"
                placeholder="Technology Name (e.g. Docker, PyTorch)"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Add Tag
              </button>
            </form>
          </div>
        </div>

        {/* Reviewer Notes & Action Controls Pane */}
        <aside className="validation-sidebar">
          <div className="card sidebar-card">
            <h4 className="sidebar-title">Evaluator Signoff & Notes</h4>

            <div className="form-group">
              <label className="form-label">Reviewer Note / Remarks</label>
              <textarea
                rows={4}
                className="form-textarea"
                placeholder="Add audit notes regarding stack validation or file signal accuracy..."
                value={reviewerNote}
                onChange={(e) => setReviewerNote(e.target.value)}
              />
            </div>

            <div className="validation-actions">
              <button
                className="btn btn-primary btn-full"
                onClick={handleApproveAllAndSave}
                disabled={isSaving}
              >
                <CheckCircle2 size={18} />
                {isSaving ? 'Updating Registry...' : 'Approve All Tags & Validate Project'}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
