import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carritoGamer');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [descuentoInstitucional, setDescuentoInstitucional] = useState(0);

  useEffect(() => {
    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      alert('La cantidad mínima permitida es 1. Usa el botón Eliminar para quitar el producto.');
      return;
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const aplicarDescuentoPorCorreo = (correo) => {
    if (correo.endsWith('@duoc.cl') || correo.endsWith('@profesor.duoc.cl')) {
      setDescuentoInstitucional(0.10);
      return true;
    } else {
      setDescuentoInstitucional(0);
      return false;
    }
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const montoDescuento = subtotal * descuentoInstitucional;
  const total = subtotal - montoDescuento;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        aplicarDescuentoPorCorreo,
        subtotal,
        montoDescuento,
        total,
        descuentoInstitucional
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};