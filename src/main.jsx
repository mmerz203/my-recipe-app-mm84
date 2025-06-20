// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './RootApp'; // Import your RootApp component
import './index.css'; // Import your main CSS file (which includes Tailwind)

// This line finds the HTML element where your React app will be displayed
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Your entire application, wrapped in contexts, starts here */}
    <RootApp />
  </React.StrictMode>,
);