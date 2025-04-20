import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        setPokemon({
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          weight: data.weight / 10, // en kg
          height: data.height / 10, // en m
          types: data.types.map(t => t.type.name).join(', '),
          abilities: data.abilities.map(a => a.ability.name).join(', '),
          baseExp: data.base_experience,
          stats: data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')
        });
      });
  }, [name]);

  if (!pokemon) return <p>Cargando datos...</p>;

  return (
    <div className="text-center">
      <Link to="/" className="btn btn-secondary mb-4">⬅ Volver a la lista</Link>
      <div className="card p-4">
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto" style={{ maxWidth: '200px' }} />
        <h2 className="mt-3 text-capitalize">{pokemon.name}</h2>
        <p><strong>Peso:</strong> {pokemon.weight} kg</p>
        <p><strong>Altura:</strong> {pokemon.height} m</p>
        <p><strong>Tipos:</strong> {pokemon.types}</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities}</p>
        <p><strong>Experiencia base:</strong> {pokemon.baseExp}</p>
        <p><strong>Estadísticas:</strong> {pokemon.stats}</p>
      </div>
    </div>
  );
};

export default PokemonDetail;
