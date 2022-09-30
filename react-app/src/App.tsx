import { Route, Routes } from 'react-router-dom';
import Navigation from 'components/Navigation';
import React from 'react';
import About from 'pages/About';
import Home from 'pages/Home';
import PageNotFound from 'pages/PageNotFound';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
