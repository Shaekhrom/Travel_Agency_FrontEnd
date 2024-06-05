import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/estiloReservas.css';

function Reservas() {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [idVuelo, setIdVuelo] = useState('');
  const [idHotel, setIdHotel] = useState('');
  const [numPersonas, setNumPersonas] = useState('');
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  const [nombreHotel, setNombreHotel] = useState(''); // Estado para el nombre del hotel
  const [reservas, setReservas] = useState([]); // Estado para las reservas obtenidas

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reserva = {
      nombreCliente: nombre,
      dni: dni,
      idVuelo: parseInt(idVuelo),
      idHotel: parseInt(idHotel),
      numPersonas: parseInt(numPersonas)
    };
  
    try {
      const response = await fetch('http://localhost:8080/insertarReserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva)
      });
  
      const data = await response.text(); // Para capturar el cuerpo de respuesta como texto
  
      console.log('Response status:', response.status);
      console.log('Response body:', data);
  
      if (response.ok) {
        window.alert('¡Reserva creada con éxito! ¡Gracias por confiar en nosotros!');
      } else {
        window.alert(`Error al enviar la reserva: ${response.status} - ${data}`);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      window.alert('Error al crear la reserva, intentalo mas tarde');
    }
  };

  const handleListarReservas = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reserva/${nombreHotel}`);
      const data = await response.json();
  
      console.log('Response status:', response.status);
      console.log('Response data:', data);
  
      if (response.ok) {
        setReservas(data);
      } else {
        window.alert(`Error al obtener las reservas: ${response.status} - ${data}`);
      }
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      window.alert('Hotel sin reservas asociadas o error al conectar.');
    }
  };
  
  return (
    <div className="container">
      <h1 className="title">Reservas</h1>
      <p>Esta es la página de reservas dentro del proyecto.</p>
      {error && <p>{error}</p>} {/* Mostrar el mensaje de error si está presente */}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="input-field" required />
        </label>
        <label>
          DNI:
          <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} className="input-field" required />
        </label>
        <label>
          ID Vuelo:
          <input type="number" value={idVuelo} onChange={(e) => setIdVuelo(e.target.value)} className="input-field" required />
        </label>
        <label>
          ID Hotel:
          <input type="number" value={idHotel} onChange={(e) => setIdHotel(e.target.value)} className="input-field" required />
        </label>
        <label>
          Número de personas:
          <input type="number" value={numPersonas} onChange={(e) => setNumPersonas(e.target.value)} className="input-field" required />
        </label>
        <button type="submit" className="submit-button">Enviar Reserva</button>
      </form>
      
      <div className="listar-reservas">
        <h2>Listar Reservas por Nombre de Hotel</h2>
        <label>
          Nombre del Hotel:
          <input type="text" value={nombreHotel} onChange={(e) => setNombreHotel(e.target.value)} className="input-field" required />
        </label>
        <button onClick={handleListarReservas} className="submit-button">Listar Reservas</button>
        {reservas.length > 0 && (
          <div className="reservas-list">
            <h3>Reservas para {nombreHotel}</h3>
            <ul>
              {reservas.map((reserva, index) => (
                <li key={index}>
                  <p>Nombre Cliente: {reserva.nombreCliente}</p>
                  <p>DNI: {reserva.dni}</p>
                  <p>ID Vuelo: {reserva.idVuelo}</p>
                  <p>ID Hotel: {reserva.idHotel}</p>
                  <p>Número de Personas: {reserva.numPersonas}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link to="/" className="link">
        Volver
      </Link>
    </div>
  );
}

export default Reservas;
