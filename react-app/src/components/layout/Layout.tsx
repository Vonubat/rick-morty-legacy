import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export const Layout: () => JSX.Element = (): JSX.Element => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Outlet />
      <Footer />
    </>
  );
};
