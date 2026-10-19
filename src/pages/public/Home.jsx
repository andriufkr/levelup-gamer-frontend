import React, { useContext } from 'react';
import { obtenerProductos } from '../../data/productos';
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';

export const Home = () => {
  const productos = obtenerProductos();
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="container py-4">
      {/* Banner Principal */}
      <div className="p-5 mb-4 bg-dark text-light rounded-3 border border-primary text-center">
        <h1 className="display-4 fw-bold text-primary">¡BIENVENIDO A LEVEL-UP GAMER!</h1>
        <p className="lead">Encuentra el mejor hardware, periféricos y accesorios gamer al mejor precio.</p>
        <Link to="/productos" className="btn btn-primary btn-lg fw-bold">Ver Catálogo Completo</Link>
      </div>

      {/* Lista de Productos Destacados */}
      <h2 className="mb-4 text-light border-bottom border-primary pb-2">Productos Destacados</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col">
            <div className="card h-100 bg-dark text-light border-secondary">
              <img src={prod.imagen} className="card-img-top" alt={prod.nombre} style={{ height: '180px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{prod.nombre}</h5>
                <p className="card-text text-secondary small">{prod.descripcion}</p>
                <div className="mt-auto">
                  <p className="fs-5 fw-bold text-success mb-2">${prod.precio.toLocaleString('es-CL')}</p>
                  <button onClick={() => agregarAlCarrito(prod)} className="btn btn-outline-primary w-100">
                    <i className="bi bi-cart-plus me-1"></i> Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};