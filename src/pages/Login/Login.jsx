import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importamos el CSS

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Botón para volver al Home */}
      <button
  onClick={() => navigate('/')}
  className="volverButton"
>
  Volver al Home
</button>


      {/* Sección principal */}
      <div className="mainContent">
        {/* Formulario */}
        <div className="formSection">
          <h2 className="title">INICIAR SESIÓN EN OVERLOOT</h2>
          <p className="subtitle">Ingresa tus datos a continuación</p>
          <input className="input" placeholder="Correo electrónico o número de teléfono" />
          <input type="password" className="input" placeholder="Contraseña" />
          <p className="registerText">
            ¿No tienes cuenta?{' '}
            <span
              className="link"
              onClick={() => navigate('/registro')}
            >
              Regístrate
            </span>
          </p>
          <button className="loginButton">INICIAR SESIÓN</button>
        </div>

        {/* Imagen caja */}
        <div className="imageSection">
          <img src="/images/icon.png" alt="Caja" className="boxImage" />
          <h1 className="logoText">OVERLOOT</h1>
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

export default LoginPage;
