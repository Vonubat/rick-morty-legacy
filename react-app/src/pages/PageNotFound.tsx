import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const PageNotFound: () => JSX.Element = (): JSX.Element => {
  const html: HTMLHtmlElement = document.querySelector('html') as HTMLHtmlElement;

  useEffect((): (() => void) => {
    html.style.overflow = 'hidden';

    return (): void => {
      html.style.overflow = 'auto';
    };
  }, [html.style]);

  return (
    <div className="background-img">
      <div className="space"></div>
      <div className="wrapper">
        <div className="img-wrapper">
          <span>44</span>
        </div>
        <p>
          The page you are trying to search has been <br />
          moved to another universe.
        </p>
        <NavLink end to="/">
          <button type="button">GET ME HOME</button>
        </NavLink>
      </div>
    </div>
  );
};
