import React from 'react';
import { obtenerProductos } from '../../data/productos';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const productos = obtenerProductos();
  const criticos = productos.filter((p) => p.stock < 5);

  return (
    <div className="container py-4">
      <h2 className="text-warning mb-4"><i className="bi bi-speedometer2 me-2"></i>Panel de Administración</h2>
      
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card bg-dark text-light border-primary p-3">
            <h4>Total Productos</h4>
            <p className="display-6 fw-bold text-primary">{productos.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-light border-danger p-3">
            <h4>Stock Crítico (&lt; 5)</h4>
            <p className="display-6 fw-bold text-danger">{criticos.length}</p>
          </div>
        </div>
      </div>

      <Link to="/" className="btn btn-outline-light">
        <i className="bi bi-arrow-left me-1"></i> Volver a la Tienda
      </Link>
    </div>
  );
};