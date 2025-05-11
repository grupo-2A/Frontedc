import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar a otras rutas
import './ProductDetail.css'; // Estilos personalizados

const ProductDetail = () => {
  // Hook para manejar la cantidad seleccionada por el usuario
  const [quantity, setQuantity] = useState(1);

  // Hook de React Router para navegar entre páginas
  const navigate = useNavigate();

  // Objeto con la información del producto que se está detallando
  const product = {
    name: 'Monitor SAMSUNG 24"',
    price: 120000,
    image: '/images/destacados/monitor.png',
    details: 'Monitor de alta definición con diseño sin bordes.',
    specs: 'Resolución: 1920x1080. Tamaño: 24 pulgadas. Conexiones: HDMI, VGA.'
  };

  // Función para manejar la acción de agregar al carrito
  const handleBuy = () => {
    // Se obtiene el carrito actual desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.name === product.name);

    if (existingItemIndex >= 0) {
      // Si ya existe, incrementa la cantidad
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, lo agrega al carrito
      cart.push({
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Se añadió ${quantity} unidad(es) de ${product.name} al carrito.`);
  };

  return (
    <div className="product-detail-container">
      {/* Botón para regresar al homepage */}
      <button className="back-button" onClick={() => navigate('/')}>Volver al inicio</button>

      {/* Título principal de la página */}
      <h2 className="product-title">DETALLE DEL PRODUCTO</h2>

      <div className="product-detail-content">
        {/* Información textual del producto */}
        <div className="product-info">
          <h3>Información del producto</h3>
          <p><strong>Nombre:</strong> {product.name}</p>
          <p><strong>Detalles:</strong> {product.details}</p>
          <p><strong>Especificaciones:</strong> {product.specs}</p>
        </div>

        {/* Tarjeta visual del producto con imagen, resumen y compra */}
        <div className="product-card">
          <h3>Vista previa</h3>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '300px', height: 'auto', objectFit: 'contain' }} // Imagen ampliada
          />

          {/* Nombre y precio del producto */}
          <div className="product-summary">
            <span><strong>{product.name}</strong></span>
            <span><strong>${product.price.toLocaleString()}</strong></span>
          </div>

          {/* Inputs para cantidad y precio total */}
          <h3>Comprar</h3>
          <div className="product-inputs">
            <label>
              Cantidad
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 1)} // Validación básica
              />
            </label>
            <label>
              Precio Total
              <input 
                type="text" 
                value={`$${(quantity * product.price).toLocaleString()}`} 
                readOnly 
              />
            </label>
          </div>

          {/* Botón para agregar al carrito */}
          <button className="buy-button" onClick={handleBuy}>Agregar al carrito</button>
        </div>
      </div>

      {/* Pie de página con secciones comunes */}
      <footer className="footer">
        <div className="footer-section logo">
          <img src="/images/logo.png" alt="Logo" />
          <p><strong>Loot para tu Setup</strong></p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Bogotá, Colombia</p>
          <p>overloot@loot.com</p>
          <p>0000-0000-0000</p>
        </div>
        <div className="footer-section">
          <h3>Cuenta</h3>
          <p>Mi cuenta</p>
          <p>Iniciar sesión/Registrarse</p>
          <p>Carrito</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
