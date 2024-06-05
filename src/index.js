// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Routes en lugar de Switch
import App from './App';
import './index.css';
import Vuelos from './pages/Vuelos'; // Importar OtraPagina desde la carpeta pages
import Reservas from './pages/Reservas'; // Importar Reservas desde la carpeta pages
import Hoteles from './pages/Hoteles'; // Importar Hoteles desde la carpeta pages

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/vuelos" element={<Vuelos />} />
      <Route path="/reservas" element={<Reservas />} /> {/* Nueva ruta para Reservas */}
      <Route path="/hoteles" element={<Hoteles />} /> {/* Nueva ruta para Hoteles */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
