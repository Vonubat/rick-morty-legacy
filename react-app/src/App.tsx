import { Route, Routes } from 'react-router-dom';
import Navigation from 'components/Navigation';
import React from 'react';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* <Route path="/" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
