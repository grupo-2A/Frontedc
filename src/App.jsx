import { FaFire } from 'react-icons/fa';

export function App() {
  return (
    <div>
      {/* Encabezado con logo e íconos */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', // Alinea el icono de usuario con la imagen de abajo
        padding: '10px 20px',
        marginBottom: '0'
      }}> 

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ width: '120px', height: '120px' }}
        />

        {/* Botones de navegación */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '42px' }}>
          <button style={estiloBotonTexto}>CATEGORÍAS</button>
          <button style={estiloBotonTexto}>CONTACTO</button>

          <button style={estiloBotonIcono}>
            <img src="/images/carro.png" alt="Carro" style={{ width: '50px', height: '50px' }} />
          </button>

          <button style={estiloBotonIcono}>
            <img 
              src="/images/usuario.png" 
              alt="Usuario" 
              style={{ width: '80px', height: '80px', marginBottom: '-5px' }} 
            />
          </button>
        </div>
      </div>

      {/* Imagen inicio debajo */}
      <div style={{ textAlign: 'center', marginTop: '0' }}>
        <img 
          src="/images/inicio.png" 
          alt="Imagen debajo"
          style={{ width: '1290px', height: '500px', display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Línea divisoria */}
      <hr style={{ 
        border: 'none', 
        borderTop: '8px solid black', 
        margin: '20px 0' 
      }} />

     {/* Sección de Productos Destacados */}
<div style={{ 
  display: 'flex',
  justifyContent: 'flex-start', // los elementos se alinean a la izquierda
  alignItems: 'center',
  padding: '0 20px',
  marginBottom: '20px',
  gap: '320px' // separación entre texto+icono y el botón
}}>
  {/* Ícono + Texto */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <FaFire style={{ color: 'orange', fontSize: '24px' }} />
    <h2 style={{ margin: 0, color: 'white' }}>Productos Destacados</h2>
  </div>

  {/* Botón con imagen */}
  <button style={estiloBotonImagen('/images/vermas.png')} aria-label="Ver más" />
</div>

{/* Cuadros morados con texto y botón comprar */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '20px',
  marginBottom: '40px'
}}>
  {Array.from({ length: 4 }, (_, i) => (
    <div key={i} style={{ textAlign: 'center' }}>
      <div style={cuadroMorado}></div>
      <p style={textoProducto}>Producto {i + 1}</p>
      <p style={textoPrecio}>$00.00</p>
      <button 
        style={estiloBotonImagen('/images/comprar.png')} 
        aria-label="Comprar"
      />
    </div>
  ))}
</div>
{/* Cuadros 2 morados con texto y botón comprar */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '20px',
  marginBottom: '40px'
}}>
  {Array.from({ length: 4 }, (_, i) => (
    <div key={i} style={{ textAlign: 'center' }}>
      <div style={cuadroMorado}></div>
      <p style={textoProducto}>Producto {i + 1}</p>
      <p style={textoPrecio}>$00.00</p>
      <button 
        style={estiloBotonImagen('/images/comprar.png')} 
        aria-label="Comprar"
      />
    </div>
  ))}
</div>
{/* Línea divisoria */}
<hr style={{ 
        border: 'none', 
        borderTop: '8px solid black', 
        margin: '20px 0' 
      }} />

     {/* Texto "Categorías" alineado a la derecha */}
<div style={{
  display: 'flex',
  justifyContent: 'flex',
  padding: '0 40px',
  marginBottom: '20px'
}}>
  <h2 style={textoCategorias}>Categorías</h2>
</div>

{/* Botones morados con texto "cte" debajo */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '20px',
  marginBottom: '40px'
}}>
  {Array.from({ length: 4 }, (_, i) => (
    <div key={i} style={{ textAlign: 'center' }}>
      <button style={botonMorado}></button>
      <p style={textoCte}>cte</p>
    </div>
  ))}
</div>
{/* Botones morados con texto "cte" debajo */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '20px',
  marginBottom: '40px'
}}>
  {Array.from({ length: 4 }, (_, i) => (
    <div key={i} style={{ textAlign: 'center' }}>
      <button style={botonMorado}></button>
      <p style={textoCte}>cte</p>
    </div>
  ))}
</div>
{/* Imagen "frame" */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '40px'
}}>
  <img 
    src="/images/frame.png" 
    alt="Frame"
    style={{ width: '1060px', height: '288px', objectFit: 'cover' }}
  />
</div>

{/* Sección completa alineada en una fila */}
<div style={{
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex',
  gap: '200px',
  paddingRight: '40px',
  marginBottom: '40px'
}}>
  {/* Icono con texto "Loot para tu Setup" */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <img 
      src="/images/logo.png" 
      alt="Ícono"
      style={{ width: '110px', height: '110px' }}
    />
    <h2 style={textoLoot}>Loot para tu Setup</h2>
  </div>

  {/* Cuadro negro con información de contacto */}
  <div style={{
    backgroundColor: 'black',
    padding: '20px 30px',
    borderRadius: '12px',
    color: 'white',
    width: '300px',
  }}>
    <h3 style={estiloContacto}>Contacto</h3>
    <p style={estiloContacto}>Bogotá, Colombia</p>
    <p style={estiloContacto}>overloot@loot.com</p>
    <p style={estiloContacto}>0000-0000-0000</p>
  </div>

  {/* Segundo cuadro negro: Cuenta */}
  <div style={{
    backgroundColor: 'black',
    padding: '20px 30px',
    borderRadius: '12px',
    color: 'white',
    width: '300px',
  }}>
    <h3 style={estiloContacto}>Cuenta</h3>
    <p style={estiloContacto}>Mi cuenta</p>
    <p style={estiloContacto}>Iniciar sesión / Registrarse</p>
    <p style={estiloContacto}>Carrito</p>
  </div>
</div>


    </div>
  );
}

// Estilos
const estiloBotonTexto = {
  background: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontStyle: 'italic',
  fontWeight: '900',
  fontSize: '16px',
  width: '168px',
  height: '28px',
  lineHeight: '28px',
  textAlign: 'center',
  padding: '0',
};

const estiloBotonIcono = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
};

const estiloBotonImagen = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '120px', // Ajusta según el tamaño de tu imagen
  height: '40px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

const cuadroMorado = {
  width: '250px',
  height: '350px',
  backgroundColor: 'purple',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
};
const textoProducto = {
  marginTop: '10px',
  marginBottom: '5px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px'
};

const textoPrecio = {
  color: 'white',
  fontSize: '16px'
};
const textoCategorias = {
  fontSize: '46px',
  fontStyle: 'italic',
  fontWeight: '900', // Simula "Black"
  color: 'white',
  width: '236px',     // Ancho visual
  height: '46px',     // Altura visual aproximada
  margin: 0,
  textAlign: 'right',
};

const botonMorado = {
  width: '222px',
  height: '228px',
  backgroundColor: 'purple',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
};

const textoCte = {
  color: 'white',
  marginTop: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
};
const textoLoot = {
  fontSize: '20px',
  fontStyle: 'italic',
  fontWeight: '900', // Black
  color: 'white',
  margin: 0,
};
const estiloContacto = {
  fontSize: '18px',
  fontStyle: 'italic',
  fontWeight: '900', // Black
  margin: '5px 0',
};