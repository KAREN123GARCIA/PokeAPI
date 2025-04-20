const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000; // Puerto para tu backend

// Habilitar CORS para solicitudes desde el frontend
app.use(cors());

// Conexión con la base de datos MySQL (reemplaza con tus datos de AlwaysData)
const db = mysql.createConnection({
  host: 'mysql-karen.alwaysdata.net',
  user: 'karen',
  password: 'rosadoverde123',
  database: 'karen_pokeapi_db'
});

// Conexión exitosa
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Ruta para obtener todos los Pokémon (esto es solo un ejemplo)
app.get('/pokemons', (req, res) => {
  db.query('SELECT * FROM pokemons', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los Pokémon' });
    } else {
      res.json(results); // Devuelve los resultados como respuesta
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
