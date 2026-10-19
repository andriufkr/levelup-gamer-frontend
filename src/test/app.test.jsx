import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { obtenerProductos, agregarProducto, eliminarProducto } from '../data/productos';
import { CarritoContext, CarritoProvider } from '../context/CarritoContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

describe('Suite de Pruebas Unitarias - EP2 (Level-Up Gamer)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ----------------------------------------------------
  // PRUEBAS DE LÓGICA Y DATOS (CRUD & LOCALSTORAGE)
  // ----------------------------------------------------

  it('01. Debe obtener la lista de productos iniciales cuando localStorage está vacío', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBeGreaterThan(0);
    expect(productos[0]).toHaveProperty('nombre');
  });

  it('02. Debe agregar un nuevo producto al almacenamiento local (Create)', () => {
    const nuevo = {
      nombre: 'Teclado Gamer Pro',
      precio: 50000,
      categoria: 'Periféricos',
      stock: 10,
      descripcion: 'Teclado mecánico'
    };
    const creado = agregarProducto(nuevo);
    const productos = obtenerProductos();
    
    expect(creado).toHaveProperty('id');
    expect(productos.some(p => p.nombre === 'Teclado Gamer Pro')).toBe(true);
  });

  it('03. Debe eliminar un producto del almacenamiento local (Delete)', () => {
    const productosIniciales = obtenerProductos();
    const idAEliminar = productosIniciales[0].id;
    
    eliminarProducto(idAEliminar);
    const productosTrasEliminar = obtenerProductos();

    expect(productosTrasEliminar.some(p => p.id === idAEliminar)).toBe(false);
  });

  // ----------------------------------------------------
  // PRUEBAS DE COMPONENTES Y RENDERIZADO
  // ----------------------------------------------------

  it('04. Debe renderizar el nombre de la tienda y enlaces en la Navbar', () => {
    render(
      <CarritoProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </CarritoProvider>
    );

    expect(screen.getByText(/LEVEL-UP/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
  });

  it('05. Debe mostrar la cantidad en el badge del carrito cuando hay productos', () => {
    const carritoMock = [{ id: '1', nombre: 'Mouse', cantidad: 3, precio: 10000 }];
    
    render(
      <CarritoContext.Provider value={{ carrito: carritoMock }}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </CarritoContext.Provider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('06. Debe renderizar el texto de derechos reservados y beneficios en el Footer', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 Level-Up Gamer/i)).toBeInTheDocument();
    expect(screen.getByText(/Envíos a todo Chile/i)).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // PRUEBAS DE REGLAS DE NEGOCIO (DESCUENTOS Y CARRITO)
  // ----------------------------------------------------

  it('07. Debe calcular un 10% de descuento cuando el correo es institucional (@duoc.cl)', () => {
    let descuentoAplicado = false;

    const TestComponent = () => {
      const { aplicarDescuentoPorCorreo } = React.useContext(CarritoContext);
      return (
        <button onClick={() => {
          descuentoAplicado = aplicarDescuentoPorCorreo('estudiante@duoc.cl');
        }}>
          Probar Descuento
        </button>
      );
    };

    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    fireEvent.click(screen.getByText('Probar Descuento'));
    expect(descuentoAplicado).toBe(true);
  });

  it('08. NO debe aplicar descuento si el correo no pertenece a DuocUC', () => {
    let descuentoAplicado = true;

    const TestComponent = () => {
      const { aplicarDescuentoPorCorreo } = React.useContext(CarritoContext);
      return (
        <button onClick={() => {
          descuentoAplicado = aplicarDescuentoPorCorreo('usuario@gmail.com');
        }}>
          Probar Descuento
        </button>
      );
    };

    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    fireEvent.click(screen.getByText('Probar Descuento'));
    expect(descuentoAplicado).toBe(false);
  });

  // ----------------------------------------------------
  // PRUEBAS DE INTERACCIÓN, MOCKS Y SPIES
  // ----------------------------------------------------

  it('09. Debe llamar a la función spy agregarAlCarrito al hacer clic en un botón', () => {
    const agregarSpy = vi.fn();

    render(
      <button onClick={() => agregarSpy({ id: '1', nombre: 'Mouse Gamer' })}>
        Agregar
      </button>
    );

    fireEvent.click(screen.getByText('Agregar'));
    expect(agregarSpy).toHaveBeenCalledTimes(1);
    expect(agregarSpy).toHaveBeenCalledWith({ id: '1', nombre: 'Mouse Gamer' });
  });

  it('10. Debe simular el cambio de estado en un input de formulario', () => {
    const TestForm = () => {
      const [nombre, setNombre] = React.useState('');
      return (
        <input
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      );
    };

    render(<TestForm />);
    const input = screen.getByPlaceholderText('Ingresa tu nombre');
    
    fireEvent.change(input, { target: { value: 'Juan Pérez' } });
    expect(input.value).toBe('Juan Pérez');
  });
});