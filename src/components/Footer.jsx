import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light border-top border-primary py-4 mt-auto">
      <div className="container text-center text-md-between d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0">&copy; 2026 Level-Up Gamer. Todos los derechos reservados.</p>
        <div>
          <span className="me-3"><i className="bi bi-shield-check text-success me-1"></i>Pago Seguro</span>
          <span><i className="bi bi-truck text-info me-1"></i>Envíos a todo Chile</span>
        </div>
      </div>
    </footer>
  );
};