import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { AuthProvider } from './context/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
   <AuthProvider>
   <App />
 </AuthProvider>,
  document.getElementById('root')
);
