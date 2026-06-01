import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Clock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'pedidos'));
      const data = querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      // Ordenar por fecha más reciente primero
      data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setPedidos(data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPedidos(); }, []);

  const showMensaje = (msg) => { setMensaje(msg); setTimeout(() => setMensaje(''), 3000); };

  const marcarAtendido = async (id) => {
    try {
      await updateDoc(doc(db, 'pedidos', id), { estado: 'Atendido' });
      setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, estado: 'Atendido' } : p));
      showMensaje('✅ Pedido marcado como atendido');
    } catch (error) { console.error(error); }
  };

  const marcarPendiente = async (id) => {
    try {
      await updateDoc(doc(db, 'pedidos', id), { estado: 'Pendiente' });
      setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, estado: 'Pendiente' } : p));
      showMensaje('⚠️ Pedido marcado como pendiente');
    } catch (error) { console.error(error); }
  };

  const pendientesCount = pedidos.filter((p) => !p.estado || p.estado === 'Pendiente').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-20 px-6 md:px-20 bg-sky-50 text-gray-800"
    >
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Pedidos Recibidos</h1>
          {pendientesCount > 0 && (
            <p className="text-orange-500 text-sm font-medium">{pendientesCount} pedido(s) pendiente(s)</p>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={fetchPedidos}
            className="flex items-center bg-white border border-sky-200 hover:bg-sky-50 text-sky-600 px-4 py-2 rounded-xl font-medium text-sm transition">
            <RefreshCw className="mr-2" size={16} /> Actualizar
          </button>
          <Link to="/admin"
            className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium text-sm transition">
            <ArrowLeft className="mr-2" size={16} /> Regresar
          </Link>
        </div>
      </div>

      {mensaje && (
        <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
          {mensaje}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400 py-20">Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No hay pedidos registrados aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id}
              className={`bg-white shadow-sm rounded-2xl p-6 border ${
                pedido.estado === 'Atendido' ? 'border-green-100' : 'border-orange-100'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  {pedido.cliente?.nombre || 'Cliente sin nombre'}
                </h2>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  pedido.estado === 'Atendido'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-orange-100 text-orange-500'
                }`}>
                  {pedido.estado || 'Pendiente'}
                </span>
              </div>

              <div className="text-sm text-gray-500 space-y-1 mb-3">
                <p>📞 {pedido.cliente?.telefono}</p>
                <p>🕒 {pedido.fecha}</p>
                <p className="font-semibold text-sky-600">💰 Total: Q{pedido.total}</p>
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                <h3 className="font-semibold text-gray-700 text-sm mb-2">Productos:</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                  {pedido.productos?.map((prod, i) => (
                    <li key={i}>{prod.nombre} — Q{prod.precio}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button onClick={() => marcarAtendido(pedido.id)} disabled={pedido.estado === 'Atendido'}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    pedido.estado === 'Atendido'
                      ? 'bg-green-50 text-green-400 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}>
                  <CheckCircle className="mr-2" size={16} /> Atendido
                </button>
                <button onClick={() => marcarPendiente(pedido.id)} disabled={!pedido.estado || pedido.estado === 'Pendiente'}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    !pedido.estado || pedido.estado === 'Pendiente'
                      ? 'bg-orange-50 text-orange-300 cursor-not-allowed'
                      : 'bg-orange-400 text-white hover:bg-orange-500'
                  }`}>
                  <Clock className="mr-2" size={16} /> Pendiente
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PedidosAdmin;
