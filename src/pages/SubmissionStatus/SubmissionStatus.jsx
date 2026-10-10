import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Cpu, ArrowRight, Clock, ShieldAlert, Layers } from 'lucide-react';
import { projectService, taggingService } from '../../services';
import ConfidenceBadge from '../../components/common/ConfidenceBadge';
import './SubmissionStatus.css';

export default function SubmissionStatus() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [extractedTags, setExtractedTags] = useState([]);

  const pipelineSteps = [
    { title: "Project Payload Received", desc: "Metadata & repository links registered in temporary queue." },
    { title: "Project Text Processed", desc: "Problem statement and technical abstract parsed into tokens." },
    { title: "Technology Signals Extracted", desc: "Imports, manifest entries, and code patterns scanned." },
    { title: "Technology Aliases Normalized", desc: "Mapped variant aliases (e.g. TF -> TensorFlow) to unified dictionary." },
    { title: "Taxonomy Tree Mapped", desc: "Linked extracted terms to domain & category parent nodes." },
    { title: "Automated Tags Generated", desc: "Confidence metrics calculated for detected technology stack." }
  ];

  useEffect(() => {
    async function loadAndRunSimulation() {
      try {
        const p = await projectService.getProjectById(id);
        setProject(p);

        // Progress step by step over 2.4 seconds
        for (let i = 0; i < pipelineSteps.length; i++) {
          await new Promise(res => setTimeout(res, 400));
          setCurrentStepIndex(i + 1);
        }

        // Fetch simulated tagging result
        const tags = await taggingService.analyzeProject(p);
        setExtractedTags(tags);
      } catch (err) {
        console.error(err);
      }
    }
    loadAndRunSimulation();
  }, [id]);

  const isComplete = currentStepIndex >= pipelineSteps.length;

  return (
    <div className="submission-status-page container section">
      <div className="status-header text-center">
        <h1 className="page-title">Automated Technology Tagging Pipeline</h1>
        <p className="page-subtitle">
          Real-time simulation of automated repository analysis, signal extraction, and taxonomy mapping.
        </p>
      </div>

      <div className="status-grid">
        {/* Left Workflow Pipeline Steps */}
        <div className="card pipeline-card">
          <h3 className="card-heading">Extraction Pipeline Progress</h3>
          <div className="pipeline-steps-list">
            {pipelineSteps.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={idx} className={`pipeline-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="step-icon">
                    {isDone ? <CheckCircle2 size={18} /> : <div className="pulse-dot" />}
                  </div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Tag Generation Results */}
        <div className="card results-card">
          <h3 className="card-heading">
            <Cpu size={20} className="icon-blue" /> Generated Technology Tags
          </h3>

          {!isComplete ? (
            <div className="analyzing-loader">
              <div className="spinner" />
              <p>Scanning repository files & computing taxonomy confidence scores...</p>
            </div>
          ) : (
            <div className="generated-tags-wrapper">
              <div className="demo-notice-banner">
                <ShieldAlert size={16} />
                <span>Simulated Analysis Engine — Ready for Admin Review Queue</span>
              </div>

              <div className="generated-tags-list">
                {extractedTags.map((tag, idx) => (
                  <div key={idx} className="generated-tag-item">
                    <div className="tag-info">
                      <span className="cat-name">{tag.category}</span>
                      <span className="tech-name">{tag.name}</span>
                      <span className="evidence-snippet">{tag.evidence}</span>
                    </div>
                    <ConfidenceBadge confidence={tag.confidence} />
                  </div>
                ))}
              </div>

              <div className="status-actions">
                <Link to={`/projects/${id}`} className="btn btn-outline">
                  View Published Details
                </Link>
                <Link to={`/admin/review/${id}`} className="btn btn-primary">
                  Go to Admin Validation <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
