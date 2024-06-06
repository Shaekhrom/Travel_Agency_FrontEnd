import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/estiloHoteles.css';

function Hoteles() {
  const [hoteles, setHoteles] = useState([]);
  const [nombreHotel, setNombreHotel] = useState('');
  const [hotelEncontrado, setHotelEncontrado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHoteles() {
      try {
        const response = await axios.get('http://localhost:8000/hoteles');
        setHoteles(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchHoteles();
  }, []); 

  const handleBuscarHotel = async () => {
    try {
      console.log('Iniciando búsqueda de hotel...');
      const response = await axios.get(`http://localhost:8000/hotel/${nombreHotel}`);
      console.log('Respuesta del servidor:', response);
      if (response.data.nombre.length > 0) {
        setHotelEncontrado(response.data);
        setError(null); 
      } else {
        setHotelEncontrado(null); 
        setError("No se ha encontrado ningún hotel con ese nombre");
      }
    } catch (error) {
      console.error('Error al buscar hotel:', error);
      setError("Error al encontrar un hotel con ese nombre.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Hoteles</h1>
      <p className="text">Apartado de Hoteles.</p>
      <h2 className="title">Buscar Hotel por nombre:</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>
          Buscar hotel por nombre:
          <input className="input" type="text" value={nombreHotel} onChange={(e) => setNombreHotel(e.target.value)} />
        </label>
        <button className="button" onClick={handleBuscarHotel}>Buscar</button>
      </div>
      {hotelEncontrado && (
        <div className="hotel-container">
          <h2 className="title">Hotel encontrado:</h2>
          <p className="hotel-text">Nombre: {hotelEncontrado.nombre}</p>
          <p className="hotel-text">Categoría: {hotelEncontrado.categoria}</p>
          <p className="hotel-text">Precio: ${hotelEncontrado.precio}</p>
          <p className="hotel-text">Disponible: {hotelEncontrado.disponible}</p>
        </div>
      )}
      <h2 className="title">Listado de hoteles:</h2>
      <ul className="list">
        {hoteles.map((hotel, index) => (
          <li key={index} className="list-item">
            <p className="hotel-text">Nombre: {hotel.nombre}</p>
            <p className="hotel-text">Categoría: {hotel.categoria}</p>
            <p className="hotel-text">Precio: ${hotel.precio}</p>
            <p className="hotel-text">Disponible: {hotel.disponible}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="link">
        Volver
      </Link>
    </div>
  );
}

export default Hoteles;
