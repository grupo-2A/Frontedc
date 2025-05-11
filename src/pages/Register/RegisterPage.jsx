import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

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

  // Validar correo con regex simple
  const validarCorreo = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validar formulario al enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!formData.cedula.trim()) newErrors.cedula = 'La cédula es obligatoria';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio';
    else if (!validarCorreo(formData.correo)) newErrors.correo = 'Correo no válido';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    if (!formData.contrasena) newErrors.contrasena = 'La contraseña es obligatoria';
    if (!formData.repetirContrasena) newErrors.repetirContrasena = 'Repite la contraseña';
    else if (formData.contrasena !== formData.repetirContrasena) newErrors.repetirContrasena = 'Las contraseñas no coinciden';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí iría la lógica para enviar datos al servidor o continuar
      alert('Registro exitoso!');
      // Por ejemplo, redirigir al login
      navigate('/login');
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

          {/* Pie de página */}
          <div id="contacto" className="footerContainer">
        <div className="footerLogoSection">
          <img src="/images/logo.png" alt="Ícono" className="footerLogoImage" />
          <h2 className="footerLogoText">Loot para tu Setup</h2>
        </div>

        <div className="footerBox">
          <h3>Contacto</h3>
          <p>Bogotá, Colombia</p>
          <p>overloot@loot.com</p>
          <p>0000-0000-0000</p>
        </div>

        <div className="footerBox">
          <h3>Cuenta</h3>
          <p>Mi cuenta</p>
          <p>Iniciar sesión / Registrarse</p>
          <p>Carrito</p>
        </div>
      </div>

      <p className="copyright">Copyright Rimel 2025. Todos los derechos reservados.</p>
    </div>
  );
};

export default RegisterPage;
