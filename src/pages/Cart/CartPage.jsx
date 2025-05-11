import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const initialItems = [
  { id: 1, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 2, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 3, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
];

const CartPage = () => {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = () => {
    navigate('/order', {
      state: {
        items,
        total: subtotal
      }
    });
  };

  return (
    <div className="cart-container">
      <h2>CARRITO</h2>
      <div className="cart-items">
        {items.map(item => (
          <div className="cart-item" key={item.id}>
            <img src="/images/kurumi.png" alt={item.name} />
            <span>{item.name}</span>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, 1)}>▲</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, -1)}>▼</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total del carrito</h3>
        <p>Subtotal: <strong>${subtotal.toLocaleString()}</strong></p>
        <p>Envío: <strong>Gratis</strong></p>
        <p>Total: <strong>${subtotal.toLocaleString()}</strong></p>
        <button className="pay-button" onClick={handlePay}>PAGAR</button>
      </div>

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

export default CartPage;
