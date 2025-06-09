import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productos.css';

const productosLocales = [
  { id: 3, nombre: "PS5 EA sports FC 25", imagen: '/images/destacados/fifa.png', precio: 319900 },
  { id: 4, nombre: "Monitor Samsung 24 Pulgadas", imagen: '/images/destacados/monitor.png', precio: 449900 },
  { id: 5, nombre: "Portátil Lenovo 15.6 ", imagen: '/images/destacados/portatil.png', precio: 2349900 },
  { id: 6, nombre: "Silla de oficina", imagen: '/images/destacados/sillaof.png', precio: 579900 },
  { id: 7, nombre: "Esferas del Dragón DBZ", imagen: '/images/destacados/esfera.png', precio: 199900 },
  { id: 8, nombre: "Funko Pop! One Piece - Roronoa", imagen: '/images/destacados/zoro.png', precio: 89900 },
  { id: 9, nombre: "Reproductor MP5 Genérico", imagen: '/images/destacados/game.png', precio: 159900 },
  { id: 10, nombre: "Tarjeta Grafica GT210", imagen: '/images/destacados/tarjeta.png', precio: 259900 }
];

const normalizarNombre = (nombre) =>
  nombre.toLowerCase()
    .replace(/["']/g, '') // elimina comillas
    .replace(/[^a-z0-9 ]/gi, '') // elimina símbolos especiales
    .replace(/\s+/g, ' ') // unifica espacios
    .trim();

const ProductCard = ({ producto }) => (
  <div style={{ textAlign: 'center' }}>
    <div className="cuadro-morado">
      <img src={producto.imagen} alt={producto.nombre} width={120} />
    </div>
    <p className="texto-producto">{producto.nombre}</p>
    <p className="texto-precio">${producto.precio.toLocaleString()}</p>
    {producto.cantidad !== undefined && producto.cantidad <= 10 && (
      <p className="texto-stock">
        Quedan {producto.cantidad} unidad{producto.cantidad > 1 ? 'es' : ''}
      </p>
    )}
    <button className="boton-comprar">Comprar</button>
  </div>
);

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/productosc/')
      .then(res => {
        console.log("Respuesta del backend:", res.data);
        const productosDB = res.data;

        const combinados = productosLocales.map(local => {
          const nombreLocal = normalizarNombre(local.nombre);
          const encontrado = productosDB.find(p =>
            normalizarNombre(p.nombre) === nombreLocal
          );

          return {
            ...local,
            cantidad: encontrado ? encontrado.cantidad : 0
          };
        });

        setProductos(combinados);
      })
      .catch(err => {
        console.error("Error al cargar los productos desde la API:", err);
        const sinStock = productosLocales.map(p => ({ ...p, cantidad: 0 }));
        setProductos(sinStock);
      });
  }, []);

  return (
    <div>
      {productos.reduce((rows, producto, index) => {
        if (index % 4 === 0) rows.push([]);
        rows[rows.length - 1].push(producto);
        return rows;
      }, []).map((fila, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          {fila.map(p => <ProductCard key={p.id} producto={p} />)}
        </div>
      ))}
    </div>
  );
};

export default Productos;

