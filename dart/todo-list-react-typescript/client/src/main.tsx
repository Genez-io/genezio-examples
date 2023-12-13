import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import logo from './assets/background.jpg';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <img style={{width: "100%", position: "fixed", bottom: "0px", zIndex: -100 }} src={logo} alt="background" />
  </React.StrictMode>,
)
