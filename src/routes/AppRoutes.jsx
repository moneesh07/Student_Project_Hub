import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import ProjectDetails from '../pages/ProjectDetails/ProjectDetails';
import Taxonomy from '../pages/Taxonomy/Taxonomy';
import SubmitProject from '../pages/SubmitProject/SubmitProject';
import SubmissionStatus from '../pages/SubmissionStatus/SubmissionStatus';
import AdminReview from '../pages/Admin/AdminReview';
import AdminValidationDetails from '../pages/Admin/AdminValidationDetails';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/taxonomy" element={<Taxonomy />} />
      <Route path="/taxonomy/:id" element={<Taxonomy />} />
      <Route path="/submit" element={<SubmitProject />} />
      <Route path="/submission/:id" element={<SubmissionStatus />} />
      <Route path="/admin" element={<Navigate to="/admin/review" replace />} />
      <Route path="/admin/review" element={<AdminReview />} />
      <Route path="/admin/review/:id" element={<AdminValidationDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
