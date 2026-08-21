import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CompareProvider } from './context/CompareContext';
import router from './routes';

function App() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      const timer = setTimeout(() => {
        preloader.remove();
      }, 400); // matches the transition duration in CSS
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <HelmetProvider>
      <CompareProvider>
        <RouterProvider router={router} />
      </CompareProvider>
    </HelmetProvider>
  );
}

export default App;
