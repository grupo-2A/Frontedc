const express = require('express');
const mysql = require('mysql2/promise'); // Cliente MySQL con soporte para promesas
const cors = require('cors');             // Middleware para permitir peticiones cross-origin
const bcrypt = require('bcrypt');         // Librería para hashear y comparar contraseñas

const app = express();

// Middleware para permitir peticiones desde cualquier origen (útil para desarrollo frontend/backend separados)
app.use(cors());

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// Crear un pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '999999',
  database: 'overlootdb',
});

// ENDPOINT: Registro de usuario
app.post('/register', async (req, res) => {
  // Extraer datos enviados desde el frontend
  const {
    nombre,
    apellido,
    cedula,
    telefono,
    correo,
    direccion,
    contrasena,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!nombre || !apellido || !cedula || !telefono || !correo || !direccion || !contrasena) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }

  try {
    // Hashear la contraseña con bcrypt (10 saltos de sal)
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Consulta SQL para insertar nuevo usuario
    const sql = `
      INSERT INTO usuarios (nombre, apellido, cedula, telefono, correo, direccion, contrasena)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta con los valores recibidos, incluyendo la contraseña hasheada
    await pool.query(sql, [
      nombre,
      apellido,
      cedula,
      telefono,
      correo,
      direccion,
      hashedPassword,
    ]);

    // Responder con éxito
    res.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);

    // Si el error es por duplicado (correo único), enviar mensaje específico
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, message: 'El correo ya está registrado' });
    } else {
      // Otros errores del servidor
      res.status(500).json({ success: false, message: 'Error al registrar usuario' });
    }
  }
});

// ENDPOINT: Inicio de sesión
app.post('/login', async (req, res) => {
  // Extraer datos enviados desde el frontend
  const { email_or_phone, password } = req.body;

  // Validar que los campos estén presentes
  if (!email_or_phone || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }

  try {
    // Consulta SQL para buscar usuario por correo o teléfono
    const sql = `
      SELECT * FROM usuarios WHERE correo = ? OR telefono = ? LIMIT 1
    `;
    const [rows] = await pool.query(sql, [email_or_phone, email_or_phone]);

    // Si no se encuentra usuario, responder con error
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Comparar la contraseña enviada con la contraseña hasheada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.contrasena);

    // Si no coinciden, responder con error
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    // Si todo es correcto, responder con éxito
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    // Error general del servidor
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Puerto donde correrá el servidor
const PORT = 8000;
console.log('Iniciando servidor...');

// Iniciar servidor y escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
