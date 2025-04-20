import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Importar el archivo CSS

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Obtén la función navigate

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: pokemonDetail.data.sprites.front_default, // Imagen del Pokémon
              id: pokemonDetail.data.id, // Número de la Pokédex
              
            };
          })
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1 className="titulo">Lista de Pokémon</h1> 
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} className="pokemon-card"onClick={() => navigate(`/pokemon/${pokemon.name}`)}
          style={{ cursor: 'pointer' }}>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <div className="pokemon-name">{pokemon.name}</div>
            <div className="pokemon-id">ID:{pokemon.id}</div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;



