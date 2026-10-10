import { mockProjects, mockTaxonomy, mockDomains, mockStats } from '../mock/projects';

// Simulated delay helper for asynchronous realism
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  getProjects: async (filters = {}, search = '', sort = 'relevance') => {
    await delay();
    let result = [...mockProjects];

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by domain
    if (filters.domain && filters.domain.length > 0) {
      result = result.filter(p => filters.domain.includes(p.domain));
    }

    // Filter by tech tags (language, frontend, backend, db, ai, etc.)
    if (filters.technologies && filters.technologies.length > 0) {
      result = result.filter(p =>
        filters.technologies.every(tech =>
          p.technologies.some(t => t.toLowerCase() === tech.toLowerCase())
        )
      );
    }

    // Filter by validation status
    if (filters.status) {
      result = result.filter(p => p.validationStatus === filters.status);
    }

    // Sorting
    if (sort === 'newest') {
      result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return result;
  },

  getProjectById: async (id) => {
    await delay();
    const project = mockProjects.find(p => p.id === id);
    if (!project) throw new Error("Project not found");
    return project;
  },

  getRelatedProjects: async (projectId, limit = 3) => {
    await delay();
    const current = mockProjects.find(p => p.id === projectId);
    if (!current) return mockProjects.slice(0, limit);

    return mockProjects
      .filter(p => p.id !== projectId && (p.domain === current.domain || p.technologies.some(t => current.technologies.includes(t))))
      .slice(0, limit);
  }
};

export const taxonomyService = {
  getTaxonomy: async () => {
    await delay();
    return mockTaxonomy;
  },

  getTechnologyByName: async (techName) => {
    await delay();
    let match = null;
    for (const dom of mockTaxonomy.domains) {
      for (const cat of dom.categories) {
        const found = cat.technologies.find(t => t.name.toLowerCase() === techName.toLowerCase());
        if (found) {
          match = found;
          break;
        }
      }
    }
    return match;
  }
};

export const taggingService = {
  analyzeProject: async (projectData) => {
    await delay(1200); // Simulate ML processing step
    // Return extracted technology signals with confidence
    return [
      { name: "Python", category: "Programming Language", confidence: 0.95, evidence: "Declared in project specification, analysis of syntax imports" },
      { name: "React", category: "Frontend Framework", confidence: 0.92, evidence: "package.json dependencies, JSX structure" },
      { name: "FastAPI", category: "Backend Framework", confidence: 0.88, evidence: "requirements.txt, main.py route decorators" },
      { name: "PostgreSQL", category: "Database", confidence: 0.84, evidence: "docker-compose service definition" }
    ];
  }
};

export const submissionService = {
  submitProject: async (formData) => {
    await delay(800);
    const newId = `proj-${Date.now().toString().slice(-3)}`;
    const newSubmission = {
      id: newId,
      ...formData,
      validationStatus: "pending",
      updatedAt: new Date().toISOString().split('T')[0],
      taxonomyTags: [
        { name: "Python", category: "Programming Language", confidence: 0.94, evidence: "Submission declared", status: "pending" },
        { name: "React", category: "Frontend Framework", confidence: 0.91, evidence: "Submission declared", status: "pending" }
      ]
    };
    mockProjects.unshift(newSubmission);
    return newSubmission;
  },

  validateProjectTags: async (projectId, updatedTags, reviewerNote) => {
    await delay(600);
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
      project.taxonomyTags = updatedTags;
      project.validationStatus = "validated";
      project.reviewerNote = reviewerNote;
    }
    return project;
  }
};

export const analyticsService = {
  getPlatformStats: async () => {
    await delay();
    return mockStats;
  },
  getDomains: async () => {
    await delay();
    return mockDomains;
  }
};
