import React, { useContext, useState } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    subtotal,
    montoDescuento,
    total,
    aplicarDescuentoPorCorreo,
    vaciarCarrito
  } = useContext(CarritoContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    indicaciones: ''
  });

  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'correo') {
      const tieneDescuento = aplicarDescuentoPorCorreo(value);
      setDescuentoAplicado(tieneDescuento);
    }
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const numeroOrden = Math.floor(100000 + Math.random() * 900000);
    const resumenOrden = {
      numeroOrden,
      cliente: formData,
      items: carrito,
      subtotal,
      montoDescuento,
      total
    };

    // Simular un pago exitoso (o error si el nombre incluye "error")
    if (formData.nombre.toLowerCase().includes('error')) {
      vaciarCarrito();
      navigate('/pago-error', { state: resumenOrden });
    } else {
      vaciarCarrito();
      navigate('/pago-exito', { state: resumenOrden });
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-warning mb-3"><i className="bi bi-cart-x me-2"></i>Tu Carrito está Vacío</h2>
        <p className="lead text-secondary">Agrega productos desde la tienda para proceder con la compra.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-primary mb-4"><i className="bi bi-credit-card me-2"></i>Resumen de Compra y Checkout</h2>

      <div className="row g-4">
        {/* Tabla de Productos */}
        <div className="col-lg-7">
          <div className="card bg-dark text-light border-secondary p-3 mb-4">
            <h4 className="text-primary border-bottom border-secondary pb-2">Productos en tu Carrito</h4>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={item.imagen} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover' }} className="rounded" />
                          <span className="fw-semibold">{item.nombre}</span>
                        </div>
                      </td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            className="btn btn-sm btn-outline-secondary"
                          >-</button>
                          <span className="px-2">{item.cantidad}</span>
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            className="btn btn-sm btn-outline-secondary"
                          >+</button>
                        </div>
                      </td>
                      <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                      <td>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar producto"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-top border-secondary pt-3 mt-2 text-end">
              <p className="mb-1 text-secondary">Subtotal: <strong>${subtotal.toLocaleString('es-CL')}</strong></p>
              {descuentoAplicado && (
                <p className="mb-1 text-success">
                  <i className="bi bi-patch-check-fill me-1"></i> Descuento DuocUC (10%): <strong>-${montoDescuento.toLocaleString('es-CL')}</strong>
                </p>
              )}
              <h3 className="text-primary mt-2">Total a Pagar: ${total.toLocaleString('es-CL')}</h3>
            </div>
          </div>
        </div>

        {/* Formulario de Información y Envío */}
        <div className="col-lg-5">
          <div className="card bg-dark text-light border-primary p-4">
            <h4 className="text-primary mb-3">Información del Cliente y Despacho</h4>
            <form onSubmit={handlePagar}>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control bg-black text-light border-secondary"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small">Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control bg-black text-light border-secondary"
                    required
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small">Correo Electrónico *</label>
                <input
                  type="email"
                  name="correo"
                  placeholder="ejemplo@duoc.cl"
                  className="form-control bg-black text-light border-secondary"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                />
                <div className="form-text text-secondary">
                  Usa tu correo @duoc.cl o @profesor.duoc.cl para obtener 10% de descuento automático[cite: 17].
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small">Dirección (Calle y Número) *</label>
                <input
                  type="text"
                  name="calle"
                  className="form-control bg-black text-light border-secondary"
                  required
                  value={formData.calle}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small">Región</label>
                  <select
                    name="region"
                    className="form-select bg-black text-light border-secondary"
                    value={formData.region}
                    onChange={handleChange}
                  >
                    <option value="Región Metropolitana de Santiago">RM Santiago</option>
                    <option value="Región de Valparaíso">Valparaíso</option>
                    <option value="Región del Biobío">Biobío</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small">Comuna</label>
                  <input
                    type="text"
                    name="comuna"
                    className="form-control bg-black text-light border-secondary"
                    required
                    value={formData.comuna}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold fs-5 mt-2">
                Pagar Ahora ${total.toLocaleString('es-CL')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};