const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // Esto llama a tu archivo de conexión para probarla

const app = express();

// Middlewares esenciales
app.use(cors());
app.use(express.json()); // Permite recibir datos de tus formularios en la SPA

// Servir los archivos del Frontend (SPA)
app.use(express.static('public'));

// Importar y usar las rutas de los catálogos
const catalogosRoutes = require('./routes/catalogos');
app.use('/api/catalogos', catalogosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});