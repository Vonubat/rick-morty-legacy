import React, { ReactElement } from 'react';
import { FormsContextProvider } from 'context/FormsContext';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';

export const AllTheProviders: ({ children }: { children: React.ReactNode }) => JSX.Element = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FormsContextProvider>{children}</FormsContextProvider>
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
