import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Vuelos from './pages/Vuelos';
import Reservas from './pages/Reservas';
import Hoteles from './pages/Hoteles';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/vuelos" element={<Vuelos />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/hoteles" element={<Hoteles />} />
    </Routes>
  </Router>
);
