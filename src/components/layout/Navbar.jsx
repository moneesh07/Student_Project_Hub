import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Layers, Search, Menu, X, CheckCircle, ShieldCheck } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <Layers className="logo-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">SIH Project Hub</span>
            <span className="brand-subtitle">Dynamic Hackathon Repository</span>
          </div>
        </Link>

        <nav className="navbar-nav desktop-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Explore Projects
          </NavLink>
          <NavLink to="/taxonomy" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Taxonomy
          </NavLink>
          <NavLink to="/submit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Submit Project
          </NavLink>
          <NavLink to="/admin/review" className={({ isActive }) => isActive ? "nav-link active admin-link" : "nav-link admin-link"}>
            <ShieldCheck size={16} />
            Admin Review
          </NavLink>
        </nav>

        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link" end>Home</NavLink>
          <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Explore Projects</NavLink>
          <NavLink to="/taxonomy" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Taxonomy</NavLink>
          <NavLink to="/submit" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Submit Project</NavLink>
          <NavLink to="/admin/review" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link admin">Admin Review</NavLink>
        </div>
      )}
    </header>
  );
}
