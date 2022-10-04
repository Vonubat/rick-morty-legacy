import { Route, Routes } from 'react-router-dom';

import React from 'react';
import About from 'pages/About';
import Home from 'pages/Home';
import PageNotFound from 'pages/PageNotFound';
import Layout from 'components/layout/Layout';
import Forms from 'pages/Forms';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="forms" element={<Forms />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
