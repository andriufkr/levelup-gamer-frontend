const PRODUCTOS_INICIALES = [
  {
    id: '1',
    nombre: 'Teclado Mecánico RGB Neon',
    precio: 45000,
    categoria: 'Periféricos',
    stock: 15,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    descripcion: 'Teclado mecánico con switches azules y retroiluminación RGB configurable.',
    oferta: true
  },
  {
    id: '2',
    nombre: 'Mouse Gamer 16000 DPI',
    precio: 25000,
    categoria: 'Periféricos',
    stock: 3, // Stock crítico (< 5)
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80',
    descripcion: 'Mouse ergonómico de alta precisión con sensor óptico.',
    oferta: false
  },
  {
    id: '3',
    nombre: 'Audífonos Surround 7.1',
    precio: 38000,
    categoria: 'Audio',
    stock: 8,
    imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
    descripcion: 'Audífonos con micrófono omnidireccional y cancelación de ruido.',
    oferta: true
  },
  {
    id: '4',
    nombre: 'Monitor Gamer 144Hz 1ms',
    precio: 180000,
    categoria: 'Monitores',
    stock: 2, // Stock crítico (< 5)
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    descripcion: 'Monitor Full HD de 24 pulgadas con tecnología FreeSync.',
    oferta: false
  }
];

// Leer productos (desde localStorage o iniciales)
export const obtenerProductos = () => {
  const guardados = localStorage.getItem('productosGamer');
  if (!guardados) {
    localStorage.setItem('productosGamer', JSON.stringify(PRODUCTOS_INICIALES));
    return PRODUCTOS_INICIALES;
  }
  return JSON.parse(guardados);
};

// Guardar lista completa
export const guardarProductos = (productos) => {
  localStorage.setItem('productosGamer', JSON.stringify(productos));
};

// Agregar un producto (Create)
export const agregarProducto = (nuevoProducto) => {
  const productos = obtenerProductos();
  const productoConId = { ...nuevoProducto, id: Date.now().toString() };
  const nuevaLista = [...productos, productoConId];
  guardarProductos(nuevaLista);
  return productoConId;
};

// Actualizar un producto (Update)
export const actualizarProducto = (id, productoActualizado) => {
  const productos = obtenerProductos();
  const nuevaLista = productos.map((p) =>
    p.id === id ? { ...p, ...productoActualizado } : p
  );
  guardarProductos(nuevaLista);
};

// Eliminar un producto (Delete)
export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const nuevaLista = productos.filter((p) => p.id !== id);
  guardarProductos(nuevaLista);
};