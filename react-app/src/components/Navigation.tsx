import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
  setActiveNavLink = ({ isActive }: { isActive: boolean }) => (isActive ? 'active-nav-link' : '');

  render(): JSX.Element {
    return (
      <nav className="navbar navbar-expand-md shadow-md py-2 bg-gray-100 relative flex items-center w-full justify-between">
        {/* Logo */}

        <div className="pl-6 pt-2 md:pt-1 text-2xl text-blue-600 font-bold self-start whitespace-nowrap">
          React App
        </div>

        {/* Menu */}

        <div className="px-6 flex justify-end flex-wrap">
          <div className="flex items-end">
            {/* Burger */}

            <button
              className="navbar-toggler border-0 py-3  md:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-900 transition-shadow duration-150 ease-in-out mr-2 self-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContentY"
              aria-controls="navbarSupportedContentY"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="w-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                ></path>
              </svg>
            </button>
          </div>

          {/* Links ul->li */}

          <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
            <ul className="navbar-nav mr-auto md:flex md:flex-row">
              <li className="nav-item mb-2 md:mb-0 nav-link block text-end md:px-2 py-2 font-semibold text-gray-500 hover:text-blue-300  transition duration-150 ease-in-out">
                <NavLink end to="/" className={this.setActiveNavLink}>
                  <span className="hidden md:block">Home</span>
                  <span
                    className="block md:hidden"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContentY"
                    data-mdb-ripple="false"
                    data-mdb-ripple-color="light"
                  >
                    Home
                  </span>
                </NavLink>
              </li>
              <li className="nav-item mb-2 md:mb-0nav-link block text-end md:px-2 py-2 font-semibold text-gray-500 hover:text-blue-300  transition duration-150 ease-in-out">
                <NavLink to="/about" className={this.setActiveNavLink}>
                  <span className="hidden md:block">About</span>
                  <span
                    className="block md:hidden"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContentY"
                    data-mdb-ripple="false"
                    data-mdb-ripple-color="light"
                  >
                    About
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
