import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Folder, Cpu, ArrowRight, Layers, Database, Globe, Network } from 'lucide-react';
import { taxonomyService, projectService } from '../../services';
import ProjectCard from '../../components/project/ProjectCard';
import TagBadge from '../../components/common/TagBadge';
import './Taxonomy.css';

export default function Taxonomy() {
  const [taxonomy, setTaxonomy] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({
    'dom-web': true,
    'cat-frontend': true,
    'cat-backend': true,
    'dom-ai': true,
    'cat-ml': true,
    'dom-db': true,
    'cat-relational': true
  });

  const [selectedTech, setSelectedTech] = useState(null);
  const [techProjects, setTechProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    async function loadTaxonomyData() {
      const data = await taxonomyService.getTaxonomy();
      setTaxonomy(data);
      // Select React by default
      const defaultTech = data.domains[0].categories[0].technologies[1]; // React
      handleSelectTech(defaultTech);
    }
    loadTaxonomyData();
  }, []);

  const toggleExpand = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleSelectTech = async (tech) => {
    setSelectedTech(tech);
    setLoadingProjects(true);
    const projects = await projectService.getProjects({ technologies: [tech.name] });
    setTechProjects(projects);
    setLoadingProjects(false);
  };

  if (!taxonomy) {
    return (
      <div className="container section">
        <div className="card skeleton-card" style={{ height: '400px' }} />
      </div>
    );
  }

  return (
    <div className="taxonomy-page container section">
      <div className="taxonomy-header">
        <h1 className="page-title">Technology Taxonomy Explorer</h1>
        <p className="page-subtitle">
          Hierarchical classification tree mapping software engineering domains, categories, programming languages, frameworks, and tools.
        </p>
      </div>

      <div className="taxonomy-grid">
        {/* Left Hierarchy Tree */}
        <div className="card taxonomy-tree-card">
          <div className="tree-header">
            <Network size={18} className="icon-blue" />
            <span>Taxonomy Hierarchy</span>
          </div>

          <div className="tree-body">
            {taxonomy.domains.map(domain => {
              const isDomOpen = expandedNodes[domain.id];
              return (
                <div key={domain.id} className="tree-domain-node">
                  <div className="node-row domain-row" onClick={() => toggleExpand(domain.id)}>
                    {isDomOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <Globe size={16} className="node-icon domain-icon" />
                    <span className="node-title">{domain.name}</span>
                  </div>

                  {isDomOpen && (
                    <div className="tree-sub-tree">
                      {domain.categories.map(cat => {
                        const isCatOpen = expandedNodes[cat.id];
                        return (
                          <div key={cat.id} className="tree-cat-node">
                            <div className="node-row cat-row" onClick={() => toggleExpand(cat.id)}>
                              {isCatOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              <Folder size={14} className="node-icon cat-icon" />
                              <span className="node-title">{cat.name}</span>
                            </div>

                            {isCatOpen && (
                              <div className="tree-tech-list">
                                {cat.technologies.map(tech => {
                                  const isSelected = selectedTech?.id === tech.id;
                                  return (
                                    <div
                                      key={tech.id}
                                      className={`node-row tech-row ${isSelected ? 'selected' : ''}`}
                                      onClick={() => handleSelectTech(tech)}
                                    >
                                      <Cpu size={14} className="node-icon tech-icon" />
                                      <span className="node-title">{tech.name}</span>
                                      <span className="tech-badge-count">{tech.projectCount}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Technology Detail & Associated Projects Pane */}
        <main className="taxonomy-detail-pane">
          {selectedTech ? (
            <>
              <div className="card tech-detail-card">
                <div className="tech-header-row">
                  <div>
                    <span className="tech-category-pill">{selectedTech.category}</span>
                    <h2 className="selected-tech-title">{selectedTech.name}</h2>
                  </div>
                  <div className="tech-stat">
                    <span className="stat-num">{selectedTech.projectCount}</span>
                    <span className="stat-txt">Projects Tagged</span>
                  </div>
                </div>

                <div className="tech-meta-row">
                  <span className="meta-label">Parent Domain:</span>
                  <span className="meta-val">{selectedTech.parentDomain}</span>
                </div>

                <p className="tech-description">{selectedTech.description}</p>

                <div className="related-tech-row">
                  <span className="related-label">Related Taxonomy Technologies:</span>
                  <div className="related-chips">
                    {selectedTech.relatedTechnologies.map((rel, idx) => (
                      <TagBadge key={idx} text={rel} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Using this Technology */}
              <div className="projects-by-tech">
                <div className="section-header">
                  <h3 className="section-title">Projects utilizing {selectedTech.name}</h3>
                  <Link to={`/projects?technology=${encodeURIComponent(selectedTech.name.toLowerCase())}`} className="btn btn-outline btn-sm">
                    Open in Discovery <ArrowRight size={14} />
                  </Link>
                </div>

                {loadingProjects ? (
                  <div className="card skeleton-card" style={{ height: '200px' }} />
                ) : techProjects.length > 0 ? (
                  <div className="grid grid-cols-1 grid-cols-2">
                    {techProjects.map(proj => (
                      <ProjectCard key={proj.id} project={proj} />
                    ))}
                  </div>
                ) : (
                  <div className="card empty-state">
                    <p>No projects currently tagged with {selectedTech.name} in mock registry.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="card empty-state">
              <p>Select a technology node from the hierarchy tree on the left to inspect detailed taxonomy tags.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
