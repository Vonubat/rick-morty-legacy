import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navigation from './Navigation';

export default class Layout extends Component {
  render(): JSX.Element {
    return (
      <>
        <header>
          <Navigation />
        </header>
        <Outlet />
        <Footer />
      </>
    );
  }
}
