import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppStatusProvider from './contexts/AppStatusProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppStatusProvider>
      <App />
    </AppStatusProvider>
  </React.StrictMode> 
);
