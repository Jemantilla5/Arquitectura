const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Usa la contraseña correcta si configuraste una
  database: 'huella_carbono'
});

conexion.connect(error => {
  if (error) {
    console.error('❌ Error de conexión a la base de datos:', error);
    return;
  }
  console.log('✅ Conectado a la base de datos');
});

// Ruta para registrar un usuario
app.post('/registro', (req, res) => {
  const { nombre, apellido, email, edad, password } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, apellido, email, edad, password) VALUES (?, ?, ?, ?, ?)';
  conexion.query(sql, [nombre, apellido, email, edad, password], (error, resultado) => {
    if (error) {
      console.error('❌ Error al registrar usuario:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.send('Usuario registrado correctamente ✅');
    }
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  conexion.query(sql, [email, password], (error, resultados) => {
    if (error) {
      console.error('❌ Error en la consulta de login:', error);
      res.status(500).send('Error en el servidor');
    } else if (resultados.length > 0) {
      // Retornar los datos del usuario
      const usuario = resultados[0];
      res.json({ usuario });
    } else {
      res.status(401).send('Credenciales incorrectas ❌');
    }
  });
});

// Ruta para actualizar los datos del usuario
app.put('/actualizar', (req, res) => {
  const { nombre, apellido, edad, email } = req.body;
  const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, edad = ? WHERE email = ?';
  conexion.query(sql, [nombre, apellido, edad, email], (error, resultado) => {
    if (error) {
      console.error('❌ Error al actualizar usuario:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.send('Usuario actualizado correctamente ✅');
    }
  });
});

// Ruta para eliminar una cuenta
app.delete('/eliminar', (req, res) => {
  const { email } = req.body;
  const sql = 'DELETE FROM usuarios WHERE email = ?';
  conexion.query(sql, [email], (error, resultado) => {
    if (error) {
      console.error('❌ Error al eliminar usuario:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.send('Cuenta eliminada correctamente ✅');
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
