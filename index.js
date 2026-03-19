const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Agregamos 'path' aquí
require('dotenv').config();
const db = require('./config/db'); 

const app = express();

// Middlewares esenciales
app.use(cors());
app.use(express.json()); 

// 🚀 Servir archivos estáticos con la ruta exacta para Vercel
app.use(express.static(path.join(__dirname, 'public')));

// 🚀 Forzar a que la ruta principal cargue tu interfaz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Importar y usar las rutas de los catálogos
const catalogosRoutes = require('./routes/catalogos');
app.use('/api/catalogos', catalogosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});