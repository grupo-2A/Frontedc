// React Component: AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminPanel = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: 0, categoria_id: '' });

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []);

  const API_URL = 'http://localhost:8000';

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get(`${API_URL}/categorias/`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos/`);
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const crearCategoria = async () => {
    if (!nuevaCategoria.trim()) return;
    try {
      await axios.post(`${API_URL}/categorias/`, { nombre: nuevaCategoria });
      setNuevaCategoria('');
      obtenerCategorias();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al crear categoría');
    }
  };

  const crearProducto = async () => {
    if (!nuevoProducto.nombre.trim() || !nuevoProducto.categoria_id) return;
    try {
      await axios.post(`${API_URL}/productos/`, nuevoProducto);
      setNuevoProducto({ nombre: '', cantidad: 0, categoria_id: '' });
      obtenerProductos();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al crear producto');
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`${API_URL}/categorias/${id}`);
      obtenerCategorias();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al eliminar categoría');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al eliminar producto');
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="titulo-admin">Panel de Administración</h1>

      <div className="seccion">
        <h2>Categorías</h2>
        <div className="form-group">
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Nueva categoría"
          />
          <button onClick={crearCategoria}>Crear</button>
        </div>
        <ul>
          {categorias.map(cat => (
            <li key={cat.id}>
              {cat.nombre}
              <button className="btn-delete" onClick={() => eliminarCategoria(cat.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="seccion">
        <h2>Productos</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={nuevoProducto.cantidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) || 0 })}
          />
          <select
            value={nuevoProducto.categoria_id}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria_id: parseInt(e.target.value) })}
          >
            <option value="">Seleccione categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <button onClick={crearProducto}>Crear</button>
        </div>
        <ul>
          {productos.map(prod => (
            <li key={prod.id}>
              {prod.nombre} (Cantidad: {prod.cantidad})
              <button className="btn-delete" onClick={() => eliminarProducto(prod.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
