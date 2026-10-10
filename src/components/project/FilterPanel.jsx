import React from 'react';
import { Filter, X, RefreshCw } from 'lucide-react';
import './FilterPanel.css';

export default function FilterPanel({
  availableDomains,
  selectedDomains,
  setSelectedDomains,
  selectedTechs,
  setSelectedTechs,
  selectedStatus,
  setSelectedStatus,
  onClearAll
}) {
  const popularTechCategories = [
    { title: "Languages", techs: ["Python", "JavaScript", "Java", "Solidity"] },
    { title: "Frontend", techs: ["React", "Flutter", "Tailwind CSS"] },
    { title: "Backend", techs: ["FastAPI", "Django", "Node.js", "Spring Boot", "Express", "Flask"] },
    { title: "Database", techs: ["PostgreSQL", "MySQL", "MongoDB"] },
    { title: "AI/ML", techs: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV"] }
  ];

  const handleDomainToggle = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleTechToggle = (tech) => {
    const isSelected = selectedTechs.some(t => t.toLowerCase() === tech.toLowerCase());
    if (isSelected) {
      setSelectedTechs(selectedTechs.filter(t => t.toLowerCase() !== tech.toLowerCase()));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const hasActiveFilters = selectedDomains.length > 0 || selectedTechs.length > 0 || selectedStatus !== 'all';

  return (
    <aside className="filter-panel card">
      <div className="filter-header">
        <div className="filter-title">
          <Filter size={18} />
          <span>Faceted Filters</span>
        </div>
        {hasActiveFilters && (
          <button className="btn-clear" onClick={onClearAll}>
            <RefreshCw size={12} /> Clear All
          </button>
        )}
      </div>

      {/* Validation Status Filter */}
      <div className="filter-section">
        <h4 className="filter-label">Validation Status</h4>
        <div className="status-options">
          <button
            className={`status-btn ${selectedStatus === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All
          </button>
          <button
            className={`status-btn ${selectedStatus === 'validated' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('validated')}
          >
            Validated
          </button>
          <button
            className={`status-btn ${selectedStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Domain Filter */}
      <div className="filter-section">
        <h4 className="filter-label">Problem Domain</h4>
        <div className="checkbox-group">
          {availableDomains.map((dom, idx) => (
            <label key={idx} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedDomains.includes(dom)}
                onChange={() => handleDomainToggle(dom)}
              />
              <span>{dom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Technology Stack Categories */}
      {popularTechCategories.map((cat, idx) => (
        <div key={idx} className="filter-section">
          <h4 className="filter-label">{cat.title}</h4>
          <div className="tech-chip-group">
            {cat.techs.map((tech, tIdx) => {
              const active = selectedTechs.some(t => t.toLowerCase() === tech.toLowerCase());
              return (
                <button
                  key={tIdx}
                  className={`filter-chip ${active ? 'active' : ''}`}
                  onClick={() => handleTechToggle(tech)}
                >
                  {tech} {active && <X size={12} />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
