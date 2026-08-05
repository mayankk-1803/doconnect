import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

// Lazy Loaded Pages
const Home = lazy(() => import('../pages/Home/Home'));
const HealthInsurance = lazy(() => import('../pages/HealthInsurance/HealthInsurance'));
const FamilyInsurance = lazy(() => import('../pages/FamilyInsurance/FamilyInsurance'));
const SeniorCitizen = lazy(() => import('../pages/SeniorCitizen/SeniorCitizen'));
const CriticalIllness = lazy(() => import('../pages/CriticalIllness/CriticalIllness'));
const TopUp = lazy(() => import('../pages/TopUp/TopUp'));
const Claims = lazy(() => import('../pages/Claims/Claims'));
const Motor = lazy(() => import('../pages/Motor/Motor'));
const Travel = lazy(() => import('../pages/Travel/Travel'));
const Hospitals = lazy(() => import('../pages/Hospitals/Hospitals'));
const Compare = lazy(() => import('../pages/Compare/Compare'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails = lazy(() => import('../pages/BlogDetails/BlogDetails'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms/Terms'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'health-insurance', element: <HealthInsurance /> },
      { path: 'family-insurance', element: <FamilyInsurance /> },
      { path: 'senior-citizen', element: <SeniorCitizen /> },
      { path: 'critical-illness', element: <CriticalIllness /> },
      { path: 'top-up', element: <TopUp /> },
      { path: 'claims', element: <Claims /> },
      { path: 'motor', element: <Motor /> },
      { path: 'travel', element: <Travel /> },
      { path: 'hospitals', element: <Hospitals /> },
      { path: 'compare', element: <Compare /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogDetails /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);
export default router;
