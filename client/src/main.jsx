import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Still using the ultra-simplified App.jsx for now

// Log entry into the script
console.log("main.jsx execution started.");

const container = document.getElementById('app');
console.log("Attempting to find element with ID 'app'. Found:", container);

if (container) {
  // Log if container was found
  console.log("Attempting to create root inside #app...");
  try {
    const root = createRoot(container);
    // Log if root creation succeeded
    console.log("React root created successfully. Attempting to render App...");
    
    // Render App without StrictMode
    root.render(
      <App /> 
    );

    // Log after the render call is made
    console.log("root.render() call executed.");
  } catch (error) {
    // Log any error during root creation or initial render
    console.error("Error during React root creation or initial render:", error);
  }
} else {
  // Log an error if the container wasn't found
  console.error("Fatal Error: Could not find root element with ID 'app'. React cannot mount.");
}

// Log end of script execution
console.log("main.jsx execution finished.");