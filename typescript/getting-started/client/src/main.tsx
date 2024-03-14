import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import logo from './background.jpg';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <img style={{width: "100%", position: "fixed", bottom: "0px", zIndex: -100 }} src={logo} alt="background" />
  </React.StrictMode>
);

