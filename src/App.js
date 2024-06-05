import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-title">Travel Agency Manager</p>
        <img src={logo} className="App-logo" alt="logo" />
        
        {/* Contenedor para los botones */}
        <div className="App-button-container">
          <Link to="/reservas" className="App-link">
            Ir a Reservas
          </Link>
          <Link to="/hoteles" className="App-link">
            Ir a Hoteles
          </Link>
          <Link to="/vuelos" className="App-link">
            Ir a Vuelos
          </Link>
        </div>
        
        <p className="App-creator">Creado por Alejandro Barbacil</p>
      </header>
    </div>
  );
}

export default App;
