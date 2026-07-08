import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CompareProvider } from './context/CompareContext';
import router from './routes';

function App() {
  return (
    <HelmetProvider>
      <CompareProvider>
        <RouterProvider router={router} />
      </CompareProvider>
    </HelmetProvider>
  );
}

export default App;
