import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Upload, AlertCircle, Cpu, CheckCircle } from 'lucide-react';
import { submissionService } from '../../services';
import './SubmitProject.css';

export default function SubmitProject() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    domain: 'Healthcare',
    shortDescription: '',
    problemStatement: '',
    abstract: '',
    teamName: '',
    teamMembers: [
      { name: '', role: 'Team Lead' },
      { name: '', role: 'Developer' }
    ],
    repositoryUrl: '',
    documentationUrl: '',
    declaredTechs: ''
  });

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleMemberChange = (idx, field, val) => {
    const updated = [...formData.teamMembers];
    updated[idx][field] = val;
    setFormData(prev => ({ ...prev, teamMembers: updated }));
  };

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: 'Developer' }]
    }));
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = "Project Title is required";
      if (!formData.shortDescription.trim()) errs.shortDescription = "Short Summary is required";
      if (!formData.problemStatement.trim()) errs.problemStatement = "Problem Statement is required";
      if (!formData.abstract.trim()) errs.abstract = "Technical Abstract is required";
    } else if (step === 2) {
      if (!formData.teamName.trim()) errs.teamName = "Team Name is required";
    } else if (step === 3) {
      if (!formData.repositoryUrl.trim()) {
        errs.repositoryUrl = "Repository URL is required";
      } else if (!formData.repositoryUrl.startsWith('http')) {
        errs.repositoryUrl = "Valid HTTP/HTTPS URL required (e.g. https://github.com/...)";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    const techArray = formData.declaredTechs
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const submissionPayload = {
      title: formData.title,
      domain: formData.domain,
      shortDescription: formData.shortDescription,
      problemStatement: formData.problemStatement,
      abstract: formData.abstract,
      team: {
        name: formData.teamName,
        members: formData.teamMembers.filter(m => m.name.trim())
      },
      technologies: techArray.length > 0 ? techArray : ["Python", "React", "FastAPI"],
      repositoryUrl: formData.repositoryUrl,
      documentationUrl: formData.documentationUrl
    };

    const newProject = await submissionService.submitProject(submissionPayload);
    setIsSubmitting(false);

    // Navigate to automated tagging simulation status page
    navigate(`/submission/${newProject.id}`);
  };

  return (
    <div className="submit-page container section">
      <div className="submit-header text-center">
        <h1 className="page-title">Submit Hackathon Project</h1>
        <p className="page-subtitle">
          Register your student hackathon project for automated repository stack analysis and taxonomy indexing.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="stepper-bar card">
        <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-badge">{currentStep > 1 ? <Check size={14} /> : '1'}</div>
          <span className="step-label">1. Project Info</span>
        </div>
        <div className="step-divider" />

        <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-badge">{currentStep > 2 ? <Check size={14} /> : '2'}</div>
          <span className="step-label">2. Team</span>
        </div>
        <div className="step-divider" />

        <div className={`step-item ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
          <div className="step-badge">{currentStep > 3 ? <Check size={14} /> : '3'}</div>
          <span className="step-label">3. Repository</span>
        </div>
        <div className="step-divider" />

        <div className={`step-item ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}>
          <div className="step-badge">{currentStep > 4 ? <Check size={14} /> : '4'}</div>
          <span className="step-label">4. Technologies</span>
        </div>
        <div className="step-divider" />

        <div className={`step-item ${currentStep >= 5 ? 'active' : ''}`}>
          <div className="step-badge">5</div>
          <span className="step-label">5. Review</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="card form-card">
        {currentStep === 1 && (
          <div className="form-step">
            <h3 className="form-step-title">Step 1: Project Information</h3>

            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                className={`form-input ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g., Smart Healthcare Assistant"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
              {errors.title && <span className="error-msg">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Problem Domain *</label>
              <select
                className="form-select"
                value={formData.domain}
                onChange={(e) => handleInputChange('domain', e.target.value)}
              >
                <option value="Healthcare">Healthcare</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Education">Education</option>
                <option value="IoT & Smart Cities">IoT & Smart Cities</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="FinTech">FinTech</option>
                <option value="Sustainability">Sustainability</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Short Summary (1-2 sentences) *</label>
              <input
                type="text"
                className={`form-input ${errors.shortDescription ? 'is-invalid' : ''}`}
                placeholder="Brief summary for project discovery cards..."
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              />
              {errors.shortDescription && <span className="error-msg">{errors.shortDescription}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Problem Statement *</label>
              <textarea
                rows={3}
                className={`form-textarea ${errors.problemStatement ? 'is-invalid' : ''}`}
                placeholder="Describe the target problem, user pain points, and institutional challenges..."
                value={formData.problemStatement}
                onChange={(e) => handleInputChange('problemStatement', e.target.value)}
              />
              {errors.problemStatement && <span className="error-msg">{errors.problemStatement}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Technical Abstract *</label>
              <textarea
                rows={4}
                className={`form-textarea ${errors.abstract ? 'is-invalid' : ''}`}
                placeholder="Detail system architecture, algorithms, and key workflow components..."
                value={formData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
              />
              {errors.abstract && <span className="error-msg">{errors.abstract}</span>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-step">
            <h3 className="form-step-title">Step 2: Team Details</h3>

            <div className="form-group">
              <label className="form-label">Team Name *</label>
              <input
                type="text"
                className={`form-input ${errors.teamName ? 'is-invalid' : ''}`}
                placeholder="e.g., BioHealth Innovations"
                value={formData.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
              />
              {errors.teamName && <span className="error-msg">{errors.teamName}</span>}
            </div>

            <label className="form-label">Team Members</label>
            {formData.teamMembers.map((m, idx) => (
              <div key={idx} className="member-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Student Name"
                  value={m.name}
                  onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Role (e.g. AI Lead, Frontend)"
                  value={m.role}
                  onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                />
              </div>
            ))}

            <button type="button" className="btn btn-outline btn-sm" onClick={addMember} style={{ alignSelf: 'flex-start' }}>
              + Add Member
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            <h3 className="form-step-title">Step 3: Repository & Documentation Links</h3>

            <div className="form-group">
              <label className="form-label">Git Code Repository URL *</label>
              <input
                type="text"
                className={`form-input ${errors.repositoryUrl ? 'is-invalid' : ''}`}
                placeholder="https://github.com/organization/repo-name"
                value={formData.repositoryUrl}
                onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
              />
              {errors.repositoryUrl && <span className="error-msg">{errors.repositoryUrl}</span>}
              <span className="form-help">The automated analysis engine will parse package.json, requirements.txt, and source imports from this repository.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Documentation / Live Demo URL (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://docs.myproject.org"
                value={formData.documentationUrl}
                onChange={(e) => handleInputChange('documentationUrl', e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="form-step">
            <h3 className="form-step-title">Step 4: Technology Declaration (Optional)</h3>
            <p className="section-subtext">
              Optionally declare known technology stack keywords. Our automated extraction pipeline will cross-validate your declaration against source manifests.
            </p>

            <div className="form-group">
              <label className="form-label">Declared Stack (Comma-separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Python, React, FastAPI, PostgreSQL, TensorFlow"
                value={formData.declaredTechs}
                onChange={(e) => handleInputChange('declaredTechs', e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="form-step">
            <h3 className="form-step-title">Step 5: Review & Submit</h3>

            <div className="review-summary">
              <div className="review-item">
                <span className="review-label">Title:</span>
                <span className="review-val">{formData.title}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Domain:</span>
                <span className="review-val">{formData.domain}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Team:</span>
                <span className="review-val">{formData.teamName} ({formData.teamMembers.length} members)</span>
              </div>
              <div className="review-item">
                <span className="review-label">Repository:</span>
                <span className="review-val">{formData.repositoryUrl}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Declared Techs:</span>
                <span className="review-val">{formData.declaredTechs || "Automated Detection Only"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Stepper Buttons Footer */}
        <div className="form-footer">
          {currentStep > 1 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={isSubmitting}>
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {currentStep < 5 ? (
            <button type="button" className="btn btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ marginLeft: 'auto' }}
            >
              {isSubmitting ? 'Submitting & Triggering Parser...' : 'Submit & Analyze Stack'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
