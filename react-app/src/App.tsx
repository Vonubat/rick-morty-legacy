import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { About } from 'pages/About';
import { Home } from 'pages/Home';
import { PageNotFound } from 'pages/PageNotFound';
import { Layout } from 'components/layout/Layout';
import { Forms } from 'pages/Forms';
import { FormsContextProvider } from 'context/FormsContext';
import { Character } from 'pages/Character';

function App(): JSX.Element {
  return (
    <FormsContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="forms" element={<Forms />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </FormsContextProvider>
  );
}

export default App;
