const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🚀 1. Súper atajo: Ruta para crear las tablas en Aiven automáticamente
router.get('/init', async (req, res) => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS unidades (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL)`);
    await db.query(`CREATE TABLE IF NOT EXISTS conceptos (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL)`);
    await db.query(`CREATE TABLE IF NOT EXISTS destinos (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL)`);
    await db.query(`CREATE TABLE IF NOT EXISTS productos (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL, precio DECIMAL(10,2) DEFAULT 0)`);
    
    res.send('✅ Tablas creadas con éxito en tu base de datos de Aiven');
  } catch (error) {
    res.status(500).send('❌ Error creando tablas: ' + error.message);
  }
});

// 📦 2. CRUD: Listar Unidades de Medida (GET)
router.get('/unidades', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM unidades');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📝 3. CRUD: Guardar Unidad de Medida (POST)
router.post('/unidades', async (req, res) => {
  try {
    const { nombre } = req.body;
    await db.query('INSERT INTO unidades (nombre) VALUES (?)', [nombre]);
    res.json({ message: 'Unidad guardada correctamente en Aiven' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📦 Listar y Guardar PRODUCTOS
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/productos', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    await db.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio || 0]);
    res.json({ message: 'Producto guardado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nota: Para "Conceptos" y "Destinos" las rutas son idénticas a "Unidades", 
// solo cambiando la palabra en el query SQL y en la ruta (ej. /conceptos).

module.exports = router;