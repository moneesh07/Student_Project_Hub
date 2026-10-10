import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, Layers, Cpu, Globe, FolderGit2, Check, ExternalLink } from 'lucide-react';
import { analyticsService, projectService } from '../../services';
import ProjectCard from '../../components/project/ProjectCard';
import TagBadge from '../../components/common/TagBadge';
import './Home.css';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [domains, setDomains] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadHomeData() {
      const s = await analyticsService.getPlatformStats();
      const d = await analyticsService.getDomains();
      const p = await projectService.getProjects({}, '', 'relevance');
      setStats(s);
      setDomains(d);
      setFeaturedProjects(p.slice(0, 6));
    }
    loadHomeData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/projects');
    }
  };

  const techCloud = [
    "Python", "Java", "JavaScript", "React", "Node.js", "Django", "FastAPI",
    "Spring Boot", "TensorFlow", "PyTorch", "Flutter", "PostgreSQL", "MySQL", "MongoDB"
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Layers size={14} /> Smart India Hackathon Repository Architecture
            </div>
            <h1 className="hero-title">
              Discover Student Hackathon Projects by <span className="highlight-text">Technology Stack</span>
            </h1>
            <p className="hero-description">
              Explore student projects by problem domain, programming language, framework, database and automated technology taxonomy tags.
            </p>

            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search projects, technologies, frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary search-btn">
                Search
              </button>
            </form>

            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                Explore Projects <ArrowRight size={16} />
              </Link>
              <Link to="/submit" className="btn btn-secondary">
                Submit Project
              </Link>
            </div>
          </div>

          {/* Metrics Panel */}
          {stats && (
            <div className="hero-stats-grid">
              <div className="stat-card">
                <span className="stat-value">{stats.projectsCount}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.technologiesCount}</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.domainsCount}</span>
                <span className="stat-label">Domains</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.validatedCount}</span>
                <span className="stat-label">Validated Projects</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Hackathon Projects</h2>
            <p className="section-subtitle">High-impact student innovations with validated technology taxonomy tags</p>
          </div>
          <Link to="/projects" className="btn btn-outline btn-sm">
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
          {featuredProjects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>

      {/* Technology Cloud Explorer */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Explore Technologies</h2>
            <p className="section-subtitle">Click any technology to discover student projects utilizing that stack</p>
          </div>

          <div className="tech-cloud">
            {techCloud.map((tech, idx) => (
              <Link 
                key={idx} 
                to={`/projects?technology=${encodeURIComponent(tech.toLowerCase())}`}
                className="tech-cloud-item"
              >
                <Cpu size={16} />
                <span>{tech}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Explorer */}
      <section className="section container">
        <div className="section-header text-center">
          <h2 className="section-title">Explore Problem Domains</h2>
          <p className="section-subtitle">Categorized by national hackathon tracks and engineering focus areas</p>
        </div>

        <div className="domain-grid">
          {domains.map((dom, idx) => (
            <Link key={idx} to={`/projects?domain=${encodeURIComponent(dom)}`} className="domain-card">
              <Globe className="domain-icon" size={24} />
              <span className="domain-name">{dom}</span>
              <ArrowRight size={16} className="domain-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">How the Automated Repository System Works</h2>
            <p className="section-subtitle">End-to-end automated stack extraction and verification pipeline</p>
          </div>

          <div className="workflow-container">
            <div className="workflow-step">
              <div className="step-number">01</div>
              <h3 className="step-title">Submit Project</h3>
              <p className="step-desc">Student team submits repository link and technical abstract.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step">
              <div className="step-number">02</div>
              <h3 className="step-title">Analyze Project</h3>
              <p className="step-desc">System parses source files, manifests, and documentation.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step">
              <div className="step-number">03</div>
              <h3 className="step-title">Extract Technologies</h3>
              <p className="step-desc">Identifies imports, dependencies, and configuration signals.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step">
              <div className="step-number">04</div>
              <h3 className="step-title">Normalize Aliases</h3>
              <p className="step-desc">Maps raw names (e.g., TF, py-torch) to standard tech names.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step">
              <div className="step-number">05</div>
              <h3 className="step-title">Map to Taxonomy</h3>
              <p className="step-desc">Links tech tags to domain categories in hierarchical taxonomy.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step">
              <div className="step-number">06</div>
              <h3 className="step-title">Generate Tags</h3>
              <p className="step-desc">Computes automated confidence metrics per detected technology.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step">
              <div className="step-number">07</div>
              <h3 className="step-title">Admin Validation</h3>
              <p className="step-desc">Evaluator reviews signals and approves tag accuracy.</p>
            </div>
            <div className="workflow-connector">→</div>

            <div className="workflow-step highlight-step">
              <div className="step-number">08</div>
              <h3 className="step-title">Publish</h3>
              <p className="step-desc">Project is indexed into searchable research taxonomy repository.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
