import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import ArticleDetail from './pages/ArticleDetail';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:id" element={<ArticleDetail />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="warden-login" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}