import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Components/redux/Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
<BrowserRouter>
<Provider store={store}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </Provider>
  </BrowserRouter>
);

//TODO need explanation why i needed to take down the <BrowserRouter> from here and leave only in main?



reportWebVitals();
