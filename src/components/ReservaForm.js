import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReservaForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({ name: '', email: '', telefono: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    const FORM_URL = 'https://formspree.io/f/meedbzoq';
    const data = new FormData();
    data.append('producto_consulta', serviceName);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('telefono', formData.telefono);
    data.append('message', formData.message);

    try {
      const res = await fetch(FORM_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        setStatus('¡Pedido enviado con éxito! Un asesor te contactará pronto.');
        setFormData({ name: '', email: '', telefono: '', message: '' });
      } else {
        setStatus('Hubo un error al enviar el pedido. Intenta de nuevo.');
      }
    } catch {
      setStatus('Hubo un error. Intenta de nuevo.');
    }
    setSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-sky-100"
    >
      <h3 className="text-2xl font-bold text-sky-700 mb-1">
        Consultar: {serviceName}
      </h3>
      <p className="text-gray-400 text-sm mb-5">Completa el formulario y te contactaremos a la brevedad.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
            placeholder="Tu nombre completo" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
            placeholder="tucorreo@ejemplo.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
            placeholder="+502 5555-1234" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Detalles del pedido</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
            placeholder="Ej. Necesito tenis talla 40 para hombre, modelo casual..." />
        </div>
        <button type="submit" disabled={sending}
          className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition font-semibold">
          {sending ? 'Enviando...' : 'Enviar Consulta'}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-green-600 font-medium">{status}</p>
      )}
    </motion.div>
  );
};

export default ReservaForm;
