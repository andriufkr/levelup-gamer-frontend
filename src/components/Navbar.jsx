import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

export const Navbar = () => {
  const { carrito } = useContext(CarritoContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-primary sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          🎮 LEVEL-UP <span className="text-light fs-6">GAMER</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <Link to="/checkout" className="btn btn-outline-success position-relative">
              <i className="bi bi-cart-fill me-1"></i> Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/admin" className="btn btn-warning fw-bold text-dark">
              <i className="bi bi-speedometer2 me-1"></i> Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};