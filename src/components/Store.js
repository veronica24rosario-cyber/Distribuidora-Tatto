import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [client, setClient] = useState({ nombre: '', telefono: '' });
  const [pedido, setPedido] = useState(null);
  const [imagenGrande, setImagenGrande] = useState(null);
  const [searchParams] = useSearchParams();
  const categoriaParam = searchParams.get('categoria') || 'todos';
  const [activeCategory, setActiveCategory] = useState(categoriaParam);

  useEffect(() => {
    setActiveCategory(categoriaParam);
  }, [categoriaParam]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    loadProducts();

    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((acc, item) => acc + Number(item.precio || 0), 0);

  const categories = ['todos', ...new Set(products.map((p) => p.categoria || 'otros'))];

  const categoryLabels = {
    todos: '🌟 Todos',
    hombre: '👨 Hombre',
    mujer: '👠 Mujer',
    ninos: '👦 Niños',
    deportivo: '👟 Deportivo',
    accesorios: '🎒 Accesorios',
    otros: '📦 Otros',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client.nombre || !client.telefono || cart.length === 0) {
      alert('Por favor completa tus datos y agrega productos al carrito.');
      return;
    }
    if (!/^\d{8}$/.test(client.telefono)) {
      alert('El número de teléfono debe tener exactamente 8 dígitos.');
      return;
    }
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(client.nombre)) {
      alert('El nombre solo puede contener letras y espacios.');
      return;
    }

    try {
      const pedidoData = {
        cliente: client,
        productos: cart.map((item) => ({ nombre: item.nombre, precio: item.precio })),
        total,
        fecha: new Date().toLocaleString(),
      };

      await addDoc(collection(db, 'pedidos'), pedidoData);

      await fetch('https://formspree.io/f/myzbljvw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: '👟 Nuevo pedido en Distribuidora Tatto',
          nombre: client.nombre,
          telefono: client.telefono,
          total: `Q${pedidoData.total}`,
          productos: pedidoData.productos.map((p) => `${p.nombre} (Q${p.precio})`).join(', '),
          fecha: pedidoData.fecha,
        }),
      });

      localStorage.removeItem('cart');
      setPedido(pedidoData);
      setCart([]);
      setClient({ nombre: '', telefono: '' });
      alert('✅ Pedido enviado correctamente. Un asesor se pondrá en contacto contigo.');
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('❌ Ocurrió un error al enviar el pedido.');
    }
  };

  const filteredProducts =
    activeCategory === 'todos'
      ? products
      : products.filter((p) => (p.categoria || 'otros') === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-20 px-6 md:px-20 bg-sky-50 text-gray-800"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Tienda Distribuidora Tatto</h1>
        <p className="text-gray-500 text-xl">Calzado de calidad para toda la familia 👟</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-base font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white text-sky-600 border border-sky-300 hover:bg-sky-50'
            }`}
          >
            {categoryLabels[cat] || cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">No hay productos en esta categoría.</p>
          <p className="text-gray-400 text-base mt-2">El administrador aún no ha agregado productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition border border-sky-50"
            >
              {/* IMAGEN CON BOTÓN VER */}
              <div className="relative group h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="h-full w-full object-contain p-2"
                />
                <div
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
                  onClick={() => setImagenGrande(product.imagen)}
                >
                  <span className="bg-white text-sky-700 font-semibold px-4 py-2 rounded-full text-sm shadow">
                    🔍 Ver imagen
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{product.nombre}</h2>
                {product.descripcion && (
                  <p className="text-gray-500 text-base mb-2">{product.descripcion}</p>
                )}
                {product.talla && (
                  <p className="text-sm text-sky-500 mb-1">Talla: {product.talla}</p>
                )}
                <p className="text-sky-600 font-bold text-xl">Q{product.precio}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-600 transition text-base font-medium flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Agregar al carrito
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Carrito */}
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto mt-8 border border-sky-100">
        <h2 className="text-2xl font-bold mb-4 text-sky-700 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" /> Tu carrito
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-400 text-base text-center py-4">Aún no has agregado productos.</p>
        ) : (
          <>
            <ul className="space-y-2 mb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-base text-gray-700">{item.nombre}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sky-600 font-semibold text-base">Q{item.precio}</span>
                    <button onClick={() => removeFromCart(index)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right text-xl font-bold text-gray-800 mb-6">
              Total: <span className="text-sky-600">Q{total}</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="font-semibold text-gray-700 text-base">Nombre del cliente:</label>
              <input
                type="text"
                value={client.nombre}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)) setClient({ ...client, nombre: value });
                }}
                className="border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="Ej: María García"
                required
              />

              <label className="font-semibold text-gray-700 text-base">Teléfono de contacto:</label>
              <input
                type="tel"
                value={client.telefono}
                onChange={(e) => setClient({ ...client, telefono: e.target.value.replace(/\D/g, '') })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="Ej: 55551234"
                maxLength={8}
                required
              />

              <button type="submit"
                className="mt-3 bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 font-semibold text-lg transition">
                Enviar pedido
              </button>
            </form>
          </>
        )}
      </div>

      {/* Modal imagen grande */}
      {imagenGrande && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          onClick={() => setImagenGrande(null)}
        >
          <img
            src={imagenGrande}
            alt="Vista completa"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
          />
          <button className="absolute top-4 right-6 text-white text-4xl font-bold">×</button>
        </div>
      )}

    </motion.div>
  );
};

export default Store;
