import React, { ReactElement } from 'react';
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
      <FormsContextProvider>{children}</FormsContextProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
