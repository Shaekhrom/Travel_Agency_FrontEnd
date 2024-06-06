import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/estiloVuelos.css';

function Vuelos() {
  const [plazasSolicitadas, setPlazasSolicitadas] = useState('');
  const [idVuelo, setIdVuelo] = useState('');
  const [plazasReservadas, setPlazasReservadas] = useState('');
  const [vuelos, setVuelos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const obtenerVuelos = () => {
    axios.get(`http://localhost:7000/vuelos/${plazasSolicitadas}`)
      .then(response => {
        setVuelos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener vuelos:', error);
      });
  };

  const actualizarVuelo = () => {
    axios.put(`http://localhost:7000/actualizarVuelo/${idVuelo}/${plazasReservadas}`)
      .then(response => {
        setMensaje(response.data.mensaje);
      })
      .catch(error => {
        console.error('Error al actualizar vuelo:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Vuelos</h1>
      <p className="text">Aqui puedes ver los vuelos disponibles.</p>
      
      <h2 className="section-title">Obtener vuelos según plazas solicitadas:</h2>
      <label className="label">
        Número de plazas solicitadas:
        <input
          className="input"
          type="number"
          value={plazasSolicitadas}
          onChange={(e) => setPlazasSolicitadas(e.target.value)}
        />
      </label>
      <button className="button" onClick={obtenerVuelos}>Obtener Vuelos</button>

      <h2 className="section-title">Actualizar vuelo por ID y plazas reservadas:</h2>
      <label className="label">
        ID del vuelo:
        <input
          className="input"
          type="number"
          value={idVuelo}
          onChange={(e) => setIdVuelo(e.target.value)}
        />
      </label>
      <label className="label">
        Plazas reservadas:
        <input
          className="input"
          type="number"
          value={plazasReservadas}
          onChange={(e) => setPlazasReservadas(e.target.value)}
        />
      </label>
      <button className="button" onClick={actualizarVuelo}>Actualizar Vuelo</button>

      <h2 className="section-title">Vuelos encontrados:</h2>
      <div className="card-container">
  {vuelos.length > 0 ? (
    vuelos.map((vuelo, index) => (
      <div key={index} className="card">
        <h3>ID: {vuelo.idVuelo}</h3>
        <p>Compañía: {vuelo.compania}</p>
        <p>Fecha de vuelo: {vuelo.fechaVuelo}</p>
        <p>Precio: ${vuelo.precio}</p>
        <p>Plazas disponibles: {vuelo.plazasDisponibles}</p>
      </div>
    ))
  ) : (
    <p>No se han encontrado vuelos</p>
  )}
</div>


      <p className="mensaje">{mensaje}</p>
      <Link to="/" className="link">
        Volver
      </Link>
    </div>
  );
}

export default Vuelos;
