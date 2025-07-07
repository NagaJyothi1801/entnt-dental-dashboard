import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// 👇 Import seed function to preload localStorage data
import { seedDataIfEmpty } from './utils/seed';

// 👇 Seed sample data if localStorage is empty
seedDataIfEmpty();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={2000} />
  </StrictMode>
);
