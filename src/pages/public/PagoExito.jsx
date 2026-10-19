import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const PagoExito = () => {
  const location = useLocation();
  const orden = location.state;

  if (!orden) {
    return (
      <div className="container py-5 text-center">
        <h2>No se encontró información de la orden.</h2>
        <Link to="/" className="btn btn-primary mt-3">Volver a la Tienda</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card bg-dark text-light border-success p-4 mx-auto" style={{ maxWidth: '650px' }}>
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success display-1"></i>
          <h2 className="text-success mt-2">¡Pago Realizado con Éxito!</h2>
          <p className="lead mb-0">Orden N° #{orden.numeroOrden}</p>
        </div>

        <div className="border-top border-secondary pt-3 mb-3">
          <h5>Datos del Cliente:</h5>
          <p className="mb-1"><strong>Nombre:</strong> {orden.cliente.nombre} {orden.cliente.apellido}</p>
          <p className="mb-1"><strong>Correo:</strong> {orden.cliente.correo}</p>
          <p className="mb-1"><strong>Dirección:</strong> {orden.cliente.calle}, {orden.cliente.comuna}, {orden.cliente.region}</p>
        </div>

        <div className="border-top border-secondary pt-3 mb-3">
          <h5>Resumen de Productos:</h5>
          <ul className="list-group list-group-flush bg-dark">
            {orden.items.map((item) => (
              <li key={item.id} className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center border-secondary px-0">
                <span>{item.nombre} x {item.cantidad}</span>
                <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-end border-top border-secondary pt-2">
          <h4>Total Pagado: <span className="text-success">${orden.total.toLocaleString('es-CL')}</span></h4>
        </div>

        <Link to="/" className="btn btn-outline-success w-100 mt-4 fw-bold">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};