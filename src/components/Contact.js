import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    const FORM_URL = 'https://formspree.io/f/mzzkygwg';
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    try {
      const res = await fetch(FORM_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        setStatus('¡Mensaje enviado con éxito! Te responderemos pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Hubo un error al enviar el mensaje. Intenta de nuevo.');
      }
    } catch {
      setStatus('Hubo un error. Intenta de nuevo.');
    }
    setSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-sky-50 pt-10 pb-16 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contáctanos</h1>
          <p className="text-gray-500">Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
              <h3 className="text-lg font-semibold text-sky-700 mb-4">Información de Contacto</h3>
              <div className="space-y-4 text-gray-600 text-sm">
                <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-sky-500" /> +502 5555-1234</p>
                <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-sky-500" /> info@distribuidoratatto.com</p>
                <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-sky-500" /> Villa Nueva, Guatemala</p>
                <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-sky-500" /> Lunes a Sábado: 8:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="bg-sky-600 text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">¿Prefieres WhatsApp?</h3>
              <p className="text-sky-100 text-sm mb-4">Escríbenos directamente y te atendemos al instante.</p>
              <a
                href="https://wa.me/50255551234"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-sky-600 font-semibold px-5 py-2 rounded-full hover:bg-sky-50 transition text-sm"
              >
                💬 Abrir WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
            <h3 className="text-lg font-semibold text-sky-700 mb-4">Envíanos un mensaje</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
                  placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
                  placeholder="Escribe tu mensaje aquí..." />
              </div>
              <button type="submit" disabled={sending}
                className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition font-semibold text-sm">
                {sending ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
            {status && <p className="mt-4 text-center text-sm text-green-600 font-medium">{status}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
