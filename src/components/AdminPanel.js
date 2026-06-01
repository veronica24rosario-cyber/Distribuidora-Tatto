import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash, Pencil, Package, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const categories = ['hombre', 'mujer', 'ninos', 'deportivo', 'accesorios', 'otros'];

const categoryLabels = {
  hombre: '👨 Hombre',
  mujer: '👠 Mujer',
  ninos: '👦 Niños',
  deportivo: '👟 Deportivo',
  accesorios: '🎒 Accesorios',
  otros: '📦 Otros',
};

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', imagen: '', categoria: categories[0], descripcion: '', talla: '' });
  const [fileImage, setFileImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(items);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const showStatus = (msg) => { setStatus(msg); setTimeout(() => setStatus(''), 3000); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = fileImage ? URL.createObjectURL(fileImage) : form.imagen || 'https://via.placeholder.com/300x200?text=Producto';
    const productData = {
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      imagen: imageUrl,
      categoria: form.categoria,
      descripcion: form.descripcion,
      talla: form.talla,
    };

    try {
      if (editId) {
        await updateDoc(doc(db, 'productos', editId), productData);
        showStatus('✅ Producto actualizado exitosamente');
        setEditId(null);
      } else {
        await addDoc(collection(db, 'productos'), productData);
        showStatus('✅ Producto agregado exitosamente');
      }
      setForm({ nombre: '', precio: '', imagen: '', categoria: categories[0], descripcion: '', talla: '' });
      setFileImage(null);
      loadProducts();
    } catch (err) {
      console.error('Error al guardar producto:', err);
      showStatus('❌ Error al guardar el producto.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await deleteDoc(doc(db, 'productos', id));
      showStatus('🗑️ Producto eliminado');
      loadProducts();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      categoria: product.categoria,
      descripcion: product.descripcion || '',
      talla: product.talla || '',
    });
    setEditId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-10 px-6 md:px-20 bg-sky-50 text-gray-800"
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 bg-white shadow-sm p-4 rounded-2xl border border-sky-100">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Panel de Administración</h1>
          <p className="text-gray-400 text-sm">Distribuidora Tatto</p>
        </div>
        <Link
          to="/admin/pedidos"
          className="flex items-center bg-sky-100 hover:bg-sky-200 text-sky-700 px-4 py-2 rounded-xl font-semibold text-sm transition"
        >
          <Package className="mr-2" size={18} /> Ver Pedidos
        </Link>
      </div>

      {status && (
        <div className={`px-4 py-3 rounded-xl mb-4 text-sm font-medium ${
          status.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
        }`}>
          {status}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 mb-10 border border-sky-100">
        <h2 className="text-lg font-semibold text-sky-600 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {editId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Nombre del producto" required
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
            value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <input type="number" placeholder="Precio (Q)" required
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
            value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} />
          <select className="border border-gray-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
            value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{categoryLabels[cat]}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Descripción breve (opcional)"
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
            value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          <input type="text" placeholder="Talla disponible (ej: 36-42)"
            className="border border-gray-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
            value={form.talla} onChange={(e) => setForm({ ...form, talla: e.target.value })} />
        </div>

        <div className="flex flex-wrap gap-4 items-center mb-4">
          <input type="text" placeholder="URL de imagen (opcional)"
            className="border border-gray-200 p-2.5 rounded-xl text-sm flex-1 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            value={form.imagen} onChange={(e) => { setForm({ ...form, imagen: e.target.value }); setFileImage(null); }} />
          <input type="file" accept="image/*" className="text-sm"
            onChange={(e) => { setFileImage(e.target.files[0]); setForm({ ...form, imagen: '' }); }} />
        </div>

        <div className="flex gap-3">
          <button type="submit"
            className="bg-sky-600 text-white px-6 py-2.5 rounded-xl hover:bg-sky-700 transition font-medium text-sm">
            {editId ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', precio: '', imagen: '', categoria: categories[0], descripcion: '', talla: '' }); }}
              className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium text-sm">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de productos */}
      {loading ? (
        <p className="text-center text-gray-400">Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No hay productos aún. ¡Agrega el primero!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-sky-50">
              <img src={product.imagen} alt={product.nombre} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{product.nombre}</h3>
                <p className="text-sky-600 font-semibold">Q{product.precio}</p>
                <p className="text-gray-400 text-xs mb-1">Categoría: {categoryLabels[product.categoria] || product.categoria}</p>
                {product.talla && <p className="text-gray-400 text-xs">Talla: {product.talla}</p>}
                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1">
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1">
                    <Trash className="w-4 h-4" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminPanel;
