import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

// Initialize TensorFlow.js backend
console.log('Setting TensorFlow.js backend to WebGL...');
tf.setBackend('webgl');

// Log available backends
console.log('Available backends:', tf.engine().registryFactory);

// Initialize TensorFlow.js
tf.ready().then(() => {
  console.log('TensorFlow.js backend initialized:', tf.getBackend());
  console.log('WebGL version:', tf.backend().getGPGPUContext().gl.getParameter(tf.backend().getGPGPUContext().gl.VERSION));
  
  // Create root and render app after TensorFlow is ready
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
}).catch(err => {
  console.error('Error initializing TensorFlow.js:', err);
  // Still render the app even if TensorFlow fails to initialize
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
});
