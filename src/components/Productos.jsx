import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './productos.css';

const productosLocales = [
  { nombre: 'Monitor SAMSUNG 24"', imagen: '/images/destacados/monitor.png', precio: 449900 },
  { nombre: 'Juego PS5 EA Sports FC 25', imagen: '/images/destacados/fifa.png', precio: 319900 },
  { nombre: 'Portátil LENOVO 15.6"', imagen: '/images/destacados/portatil.png', precio: 2349900 },
  { nombre: 'Silla de Oficina', imagen: '/images/destacados/sillaof.png', precio: 579900 },
  { nombre: 'Esferas De Dragon Ball Z', imagen: '/images/destacados/esfera.png', precio: 199900 },
  { nombre: 'Funko Pop! One Piece - Roronoa', imagen: '/images/destacados/zoro.png', precio: 89900 },
  { nombre: 'Reproductor Mp5 Genérico', imagen: '/images/destacados/game.png', precio: 159900 },
  { nombre: 'Tarjeta Gráfica Gt210', imagen: '/images/destacados/tarjeta.png', precio: 259900 }
];

const ProductCard = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="cuadro-morado">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <p className="texto-producto">{producto.nombre}</p>
      <p className="texto-precio">${producto.precio.toLocaleString()}</p>
      <p className="texto-stock">Stock: {producto.cantidad ?? 'N/A'}</p>
      <button
        className="boton-comprar"
        onClick={() => navigate('/product')}
        aria-label="Comprar"
      >
        Comprar
      </button>
    </div>
  );
};

const Productos = () => {
  const [productos, setProductos] = useState(productosLocales);

  useEffect(() => {
    axios.get('http://localhost:8000/productos/') // Asegúrate que esta URL sea correcta
      .then(res => {
        const cantidades = res.data;

        // Combinar cantidades con productosLocales
        const productosConCantidad = productosLocales.map(prod => {
          const productoConCantidad = cantidades.find(p => p.nombre === prod.nombre);
          return {
            ...prod,
            cantidad: productoConCantidad ? productoConCantidad.cantidad : 0
          };
        });

        setProductos(productosConCantidad);
      })
      .catch(err => {
        console.error("Error al obtener cantidades:", err);
      });
  }, []);

  const rows = [];
  for (let i = 0; i < productos.length; i += 4) {
    rows.push(
      <div
        key={i}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px'
        }}
      >
        {productos.slice(i, i + 4).map((producto, idx) => (
          <ProductCard key={idx} producto={producto} />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default Productos;
