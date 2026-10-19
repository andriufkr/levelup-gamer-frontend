import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const PagoError = () => {
  const location = useLocation();
  const orden = location.state;

  return (
    <div className="container py-5">
      <div className="card bg-dark text-light border-danger p-4 mx-auto text-center" style={{ maxWidth: '550px' }}>
        <i className="bi bi-x-circle-fill text-danger display-1"></i>
        <h2 className="text-danger mt-2">No se Pudo Realizar el Pago</h2>
        {orden && <p className="lead">Intento de compra Orden N° #{orden.numeroOrden}</p>}
        <p className="text-secondary">Ocurrió un problema durante el procesamiento de la transacción. Por favor, reintenta o usa otro medio de pago.</p>
        
        <div className="d-flex gap-3 mt-4">
          <Link to="/checkout" className="btn btn-warning w-100 fw-bold">
            Volver a Intentar
          </Link>
          <Link to="/" className="btn btn-outline-light w-100">
            Ir a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
};