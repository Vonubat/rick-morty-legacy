import React, { ReactElement } from 'react';
import { HomeContextProvider } from 'context/HomeContext';
import { FormsContextProvider } from 'context/FormsContext';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export const AllTheProviders: ({ children }: { children: React.ReactNode }) => JSX.Element = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <BrowserRouter>
      <HomeContextProvider>
        <FormsContextProvider>{children}</FormsContextProvider>
      </HomeContextProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
