import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { CartProvider } from './store/CartContext.tsx';
import { Provider } from 'react-redux';
import store from './redux-store/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
