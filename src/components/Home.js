import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Truck, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PedidoForm from './ReservaForm';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Calzado para Hombre',
      desc: 'Botas, zapatos casuales, formales y deportivos. Comodidad y estilo para el hombre moderno.',
      emoji: '👨',
      color: 'from-sky-100 to-sky-200',
      border: 'border-sky-300',
      text: 'text-sky-700',
      cat: 'hombre',
    },
    {
      title: 'Calzado para Mujer',
      desc: 'Tacones, flats, sandalias y más. Diseños elegantes y modernos para cada ocasión.',
      emoji: '👠',
      color: 'from-blue-50 to-sky-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      cat: 'mujer',
    },
    {
      title: 'Calzado para Niños',
      desc: 'Zapatos escolares, tenis y sandalias resistentes pensados para los más pequeños.',
      emoji: '👦',
      color: 'from-cyan-50 to-sky-100',
      border: 'border-cyan-200',
      text: 'text-cyan-700',
      cat: 'ninos',
    },
    {
      title: 'Tenis y Deportivo',
      desc: 'Modelos de alta demanda para deporte y uso casual. Comodidad garantizada.',
      emoji: '👟',
      color: 'from-sky-100 to-blue-100',
      border: 'border-sky-300',
      text: 'text-sky-700',
      cat: 'deportivo',
    },
    {
      title: 'Materia Prima y Accesorios',
      desc: 'Insumos para fabricación de calzado, plantillas, cordones, cremas y más.',
      emoji: '🎒',
      color: 'from-blue-50 to-cyan-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      cat: 'accesorios',
    },
  ];

  const features = [
    { icon: <Star className="w-8 h-8 text-sky-500" />, title: '34 Años de Experiencia', desc: 'Negocio familiar con décadas de confianza y calidad.' },
    { icon: <ShieldCheck className="w-8 h-8 text-sky-500" />, title: 'Calidad Garantizada', desc: 'Productos seleccionados para durabilidad y confort.' },
    { icon: <Truck className="w-8 h-8 text-sky-500" />, title: 'Pedidos en Línea', desc: 'Haz tu pedido desde casa y lo coordinamos contigo.' },
    { icon: <ShoppingBag className="w-8 h-8 text-sky-500" />, title: 'Amplio Catálogo', desc: 'Tallas y estilos para hombre, mujer y niños.' },
  ];

  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50">

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 sm:py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-7xl">👟</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Bienvenido a{' '}
            <span className="text-sky-600">Distribuidora Tatto</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-4 max-w-2xl mx-auto">
            34 años vistiendo a las familias de Villa Nueva con calzado de calidad para hombre, mujer y niños.
          </p>

          <p className="text-lg text-sky-600 font-medium mb-8">
            📍 Villa Nueva, Guatemala
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="bg-sky-600 text-white px-8 py-4 rounded-full font-semibold text-xl hover:bg-sky-700 shadow-lg transition"
            >
              Realizar una Consulta <ShoppingBag className="inline w-6 h-6 ml-2" />
            </motion.button>

            <motion.a
              href="/store"
              whileHover={{ scale: 1.05 }}
              className="border-2 border-sky-400 text-sky-600 px-8 py-4 rounded-full font-semibold text-xl hover:bg-sky-50 transition"
            >
              Ver Catálogo
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Modal pedido */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-600 font-bold text-2xl z-10 hover:text-gray-900"
            >
              &times;
            </button>
            <PedidoForm serviceName="Consulta general de productos" />
          </div>
        </div>
      )}

      {/* Features */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-12 px-4"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm text-center border border-sky-100"
            >
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 text-base mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categorías */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Nuestras Categorías</h2>
          <p className="text-center text-gray-500 text-lg mb-12">Encuentra el calzado perfecto para cada miembro de la familia</p>

          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => navigate(`/store?categoria=${cat.cat}`)}
                className={`cursor-pointer bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-6 shadow-sm w-full sm:w-[45%] md:w-[28%] flex flex-col items-center text-center`}
              >
                <span className="text-5xl mb-4">{cat.emoji}</span>
                <h3 className={`text-xl font-bold mb-2 ${cat.text}`}>{cat.title}</h3>
                <p className="text-gray-600 text-base mb-4">{cat.desc}</p>
                <span className={`text-sm font-semibold ${cat.text} underline underline-offset-2`}>
                  Ver productos →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA WhatsApp */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-12 px-4 text-center"
      >
        <div className="bg-sky-600 max-w-2xl mx-auto rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-2">¿Dudas o consultas rápidas?</h3>
          <p className="text-sky-100 text-lg mb-6">Escríbenos por WhatsApp y te atendemos al instante.</p>
          <a
            href="https://wa.me/50255551234"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-sky-700 font-bold px-8 py-3 rounded-full hover:bg-sky-50 transition text-lg"
          >
            💬 Escribir por WhatsApp
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
