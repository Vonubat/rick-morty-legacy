import React from 'react';
import githubLogo from 'assets/GitHub-Mark-120px-plus.png';

export const Footer: () => JSX.Element = (): JSX.Element => {
  return (
    <footer className="flex justify-between items-center py-2.5 px-6 bg-gray-200">
      <a
        className="text-gray-600 underline decoration-transparent hover:decoration-inherit transition duration-300 ease-in-out"
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
      >
        © 2022 The Rolling Scopes
      </a>

      <a href="https://github.com/Vonubat" target="_blank" rel="noopener noreferrer">
        <img src={githubLogo} alt="githubLogo" className="w-12 hover:animate-spin" />
      </a>
    </footer>
  );
};
