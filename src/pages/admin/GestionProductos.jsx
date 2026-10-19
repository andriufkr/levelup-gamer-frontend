import React, { useState, useEffect } from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../../data/productos';

export const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    categoria: 'Periféricos',
    stock: '',
    imagen: 'https://via.placeholder.com/400x300?text=Producto+Gamer',
    descripcion: ''
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editandoId) {
      actualizarProducto(editandoId, {
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock)
      });
      setEditandoId(null);
    } else {
      agregarProducto({
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock)
      });
    }
    setForm({
      nombre: '',
      precio: '',
      categoria: 'Periféricos',
      stock: '',
      imagen: 'https://via.placeholder.com/400x300?text=Producto+Gamer',
      descripcion: ''
    });
    cargarProductos();
  };

  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setForm(prod);
  };

  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(id);
      cargarProductos();
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-warning mb-4"><i className="bi bi-box-seam me-2"></i>Gestión de Productos (CRUD)</h2>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-lg-4">
          <div className="card bg-dark text-light border-warning p-3">
            <h4>{editandoId ? 'Editar Producto' : 'Nuevo Producto'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label small">Nombre</label>
                <input type="text" name="nombre" className="form-control bg-black text-light border-secondary" required value={form.nombre} onChange={handleChange} />
              </div>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label small">Precio</label>
                  <input type="number" name="precio" className="form-control bg-black text-light border-secondary" required value={form.precio} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <label className="form-label small">Stock</label>
                  <input type="number" name="stock" className="form-control bg-black text-light border-secondary" required value={form.stock} onChange={handleChange} />
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label small">Categoría</label>
                <select name="categoria" className="form-select bg-black text-light border-secondary" value={form.categoria} onChange={handleChange}>
                  <option value="Periféricos">Periféricos</option>
                  <option value="Audio">Audio</option>
                  <option value="Monitores">Monitores</option>
                  <option value="Sillas">Sillas Gamer</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small">Descripción</label>
                <textarea name="descripcion" className="form-control bg-black text-light border-secondary" rows="2" value={form.descripcion} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold">
                {editandoId ? 'Guardar Cambios' : 'Agregar Producto'}
              </button>
            </form>
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="col-lg-8">
          <div className="card bg-dark text-light border-secondary p-3">
            <h4>Inventario Actual</h4>
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>${p.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <span className={`badge ${p.stock < 5 ? 'bg-danger' : 'bg-success'}`}>
                          {p.stock} {p.stock < 5 && '(Crítico)'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button onClick={() => handleEditar(p)} className="btn btn-sm btn-outline-warning">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button onClick={() => handleEliminar(p.id)} className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};