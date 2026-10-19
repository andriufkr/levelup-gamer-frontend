import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/public/Home';
import { Checkout } from './pages/public/Checkout';
import { PagoExito } from './pages/public/PagoExito';
import { PagoError } from './pages/public/PagoError';
import { Dashboard } from './pages/admin/Dashboard';
import { GestionProductos } from './pages/admin/GestionProductos';

export default function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100 bg-black text-light">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pago-exito" element={<PagoExito />} />
              <Route path="/pago-error" element={<PagoError />} />

              {/* Rutas Administrador */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/productos" element={<GestionProductos />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  );
}