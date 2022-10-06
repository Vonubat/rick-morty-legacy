import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class PageNotFound extends Component {
  html: HTMLHtmlElement = document.querySelector('html') as HTMLHtmlElement;

  componentDidMount(): void {
    this.html.style.overflow = 'hidden';
  }

  componentWillUnmount(): void {
    this.html.style.overflow = 'auto';
  }

  render(): JSX.Element {
    return (
      <>
        <div className="background-img">
          <div className="space"></div>
          <div className="wrapper">
            <div className="img-wrapper">
              <span>44</span>
            </div>
            <p>
              <div>The page you are trying to search has been</div>
              <div>moved to another universe.</div>
            </p>
            <NavLink to="/">
              <button type="button">GET ME HOME</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}
