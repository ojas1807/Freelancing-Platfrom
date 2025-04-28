import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { MessagingProvider } from './context/MessagingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MessagingProvider>
        <App />
      </MessagingProvider>
    </BrowserRouter>
  </StrictMode>
);
