import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrecisProvider } from './store/precis-store.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrecisProvider>
        <App />
      </PrecisProvider>
    </BrowserRouter>
  </React.StrictMode>
);
