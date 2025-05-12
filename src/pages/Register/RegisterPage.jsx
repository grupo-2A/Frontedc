import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';
import Footer from '../../components/Footer/Footer'; // Componente de pie de página

const RegisterPage = () => {
  const navigate = useNavigate();

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    correo: '',
    direccion: '',
    contrasena: '',
    repetirContrasena: '',
  });

  // Estado para errores
  const [errors, setErrors] = useState({});

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Para cédula y teléfono, permitir solo números
    if ((name === 'cedula' || name === 'telefono') && value && !/^\d*$/.test(value)) {
      return; // No actualizar si no es número
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Validar formulario al enviar
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
  
    // Validaciones (igual que antes)
    // ...
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            cedula: formData.cedula,
            telefono: formData.telefono,
            correo: formData.correo,
            direccion: formData.direccion,
            contrasena: formData.contrasena,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert('Registro exitoso!');
          navigate('/login');
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        alert('Error al conectar con el servidor');
        console.error(error);
      }
    }
  };
  

  return (
    <div className="register-container">
      {/* Botón Volver al Home fijo arriba derecha */}
      <button
        onClick={() => navigate('/')}
        className="volver-button"
      >
        Volver al Home
      </button>

      <div className="register-content">
        <div className="register-form">
          <h2>REGISTRARTE EN OVERLOOT</h2>
          <p><strong>Ingresa tus datos a continuación</strong></p>

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className="error">{errors.nombre}</p>}

            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
            {errors.apellido && <p className="error">{errors.apellido}</p>}

            <input
              type="text"
              name="cedula"
              placeholder="Cédula (solo números)"
              value={formData.cedula}
              onChange={handleChange}
              maxLength={15}
            />
            {errors.cedula && <p className="error">{errors.cedula}</p>}

            <input
              type="text"
              name="telefono"
              placeholder="Teléfono (solo números)"
              value={formData.telefono}
              onChange={handleChange}
              maxLength={15}
            />
            {errors.telefono && <p className="error">{errors.telefono}</p>}

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
            />
            {errors.correo && <p className="error">{errors.correo}</p>}

            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
            />
            {errors.direccion && <p className="error">{errors.direccion}</p>}

            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
            />
            {errors.contrasena && <p className="error">{errors.contrasena}</p>}

            <input
              type="password"
              name="repetirContrasena"
              placeholder="Vuelve a colocar la contraseña"
              value={formData.repetirContrasena}
              onChange={handleChange}
            />
            {errors.repetirContrasena && <p className="error">{errors.repetirContrasena}</p>}

            <button type="submit" className="register-button">REGISTRARSE</button>
          </form>

          <p className="login-link">
            ¿Ya estás registrado?{' '}
            <Link to="/login" className="login-link-color">
              Inicia sesión
            </Link>
          </p>
        </div>

        <div className="register-image">
          <img src="/images/icon.png" alt="Loot box" />
          <h1>OVERLOOT</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
