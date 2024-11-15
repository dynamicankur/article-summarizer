import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

// Select the root element by ID
const rootElement = document.getElementById('root');

// Check if the root element exists before calling createRoot
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element with id 'root' not found.");
}
