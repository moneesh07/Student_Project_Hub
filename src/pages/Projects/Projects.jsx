import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, RefreshCw, FolderSearch } from 'lucide-react';
import { projectService, analyticsService } from '../../services';
import ProjectCard from '../../components/project/ProjectCard';
import FilterPanel from '../../components/project/FilterPanel';
import './Projects.css';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [availableDomains, setAvailableDomains] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedDomains, setSelectedDomains] = useState(
    searchParams.get('domain') ? [searchParams.get('domain')] : []
  );
  const [selectedTechs, setSelectedTechs] = useState(
    searchParams.get('technology') ? [searchParams.get('technology')] : []
  );
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    async function initData() {
      const d = await analyticsService.getDomains();
      setAvailableDomains(d);
    }
    initData();
  }, []);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const filters = {
        domain: selectedDomains,
        technologies: selectedTechs,
        status: selectedStatus === 'all' ? null : selectedStatus
      };
      const result = await projectService.getProjects(filters, searchQuery, sortBy);
      setProjects(result);
      setLoading(false);
    }
    fetchFiltered();
  }, [searchQuery, selectedDomains, selectedTechs, selectedStatus, sortBy]);

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedDomains([]);
    setSelectedTechs([]);
    setSelectedStatus('all');
    setSearchParams({});
  };

  const removeDomainTag = (dom) => {
    setSelectedDomains(selectedDomains.filter(d => d !== dom));
  };

  const removeTechTag = (tech) => {
    setSelectedTechs(selectedTechs.filter(t => t.toLowerCase() !== tech.toLowerCase()));
  };

  return (
    <div className="projects-page container section">
      <div className="projects-header">
        <h1 className="page-title">Project Discovery Platform</h1>
        <p className="page-subtitle">
          Search and filter verified student hackathon projects by domain, programming language, framework, database, and taxonomy tags.
        </p>
      </div>

      <div className="projects-layout">
        {/* Left Filter Sidebar */}
        <FilterPanel
          availableDomains={availableDomains}
          selectedDomains={selectedDomains}
          setSelectedDomains={setSelectedDomains}
          selectedTechs={selectedTechs}
          setSelectedTechs={setSelectedTechs}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onClearAll={handleClearAll}
        />

        {/* Right Search & Results Pane */}
        <main className="results-pane">
          {/* Top Bar with Search & Sort */}
          <div className="search-bar-row">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search title, technology, framework, domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="sort-wrapper">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges Row */}
          {(selectedDomains.length > 0 || selectedTechs.length > 0 || searchQuery) && (
            <div className="active-filters-row">
              <span className="active-label">Active Filters:</span>
              {searchQuery && (
                <span className="active-badge">
                  Query: "{searchQuery}" <X size={12} onClick={() => setSearchQuery('')} />
                </span>
              )}
              {selectedDomains.map((dom, i) => (
                <span key={i} className="active-badge">
                  {dom} <X size={12} onClick={() => removeDomainTag(dom)} />
                </span>
              ))}
              {selectedTechs.map((tech, i) => (
                <span key={i} className="active-badge">
                  {tech} <X size={12} onClick={() => removeTechTag(tech)} />
                </span>
              ))}
              <button className="clear-link" onClick={handleClearAll}>Clear All</button>
            </div>
          )}

          {/* Results Count Header */}
          <div className="results-count-bar">
            <h2>{loading ? 'Searching projects...' : `${projects.length} project${projects.length === 1 ? '' : 's'} found`}</h2>
          </div>

          {/* Results Grid / Skeleton / Empty State */}
          {loading ? (
            <div className="grid grid-cols-1 grid-cols-2">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="card skeleton-card">
                  <div className="skeleton-line title" />
                  <div className="skeleton-line text" />
                  <div className="skeleton-line text short" />
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 grid-cols-2">
              {projects.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <FolderSearch size={48} className="empty-icon" />
              <h3>No matching projects found</h3>
              <p>Try clearing active tech filters or modifying your search query terms.</p>
              <button className="btn btn-primary" onClick={handleClearAll}>
                <RefreshCw size={14} /> Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
