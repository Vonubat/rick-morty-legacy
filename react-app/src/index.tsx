import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import 'tw-elements';
import ScrollToTop from 'utils/scroll-to-top';
import { Provider } from 'react-redux';
import { store } from 'store/store';

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
