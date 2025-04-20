import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail'; // Componente nuevo
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} /> {/* Ruta dinámica */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
