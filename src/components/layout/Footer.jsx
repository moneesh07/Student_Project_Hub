import React from 'react';
import { Layers, Code, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-header">
            <Layers size={20} className="brand-icon" />
            <span className="brand-name">SIH Project Hub</span>
          </div>
          <p className="brand-desc">
            Automated technology stack extraction, taxonomy tagging, and research repository platform for national student hackathon initiatives.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4 className="col-title">Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/projects">Explore Projects</Link>
            <Link to="/taxonomy">Technology Taxonomy</Link>
            <Link to="/submit">Submit Project</Link>
          </div>

          <div className="footer-col">
            <h4 className="col-title">Validation</h4>
            <Link to="/admin/review">Admin Tag Validation</Link>
            <Link to="/admin">Platform Analytics</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              Repository Engine <ExternalLink size={12} />
            </a>
          </div>

          <div className="footer-col">
            <h4 className="col-title">Academic Context</h4>
            <span className="footer-text">SIH Aligned Project Repository</span>
            <span className="footer-text">Automated Taxonomy Tagging</span>
            <span className="footer-text">Week 1 Review MVP Prototype</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>© 2026 SIH Project Hub. Academic Prototype for Project Evaluation.</p>
          <span className="badge-demo">Frontend MVP (Mock Services Active)</span>
        </div>
      </div>
    </footer>
  );
}
