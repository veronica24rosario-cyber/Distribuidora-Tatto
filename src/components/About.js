import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, MapPin, ShieldCheck } from 'lucide-react';

const About = () => {
  const values = [
    'Calidad en cada producto que ofrecemos',
    'Honestidad y transparencia con nuestros clientes',
    'Atención personalizada y cercana',
    'Compromiso con las familias guatemaltecas',
    'Innovación en catálogo y servicio',
  ];

  const stats = [
    { icon: <Star className="w-6 h-6 text-sky-500" />, number: '34+', label: 'Años de experiencia' },
    { icon: <Users className="w-6 h-6 text-sky-500" />, number: 'Miles', label: 'de clientes satisfechos' },
    { icon: <MapPin className="w-6 h-6 text-sky-500" />, number: 'Villa Nueva', label: 'Guatemala' },
    { icon: <ShieldCheck className="w-6 h-6 text-sky-500" />, number: '100%', label: 'Calidad garantizada' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-sky-50 pt-10 pb-16 px-6 md:px-20 text-gray-800"
    >
      <div className="max-w-4xl mx-auto text-center mb-10">
        <span className="text-6xl">👟</span>
        <h1 className="text-4xl font-bold text-sky-700 mt-4 mb-2">Sobre Nosotros</h1>
        <p className="text-gray-500 text-lg">Conoce la historia detrás de Distribuidora Tatto</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 text-center shadow-sm border border-sky-100"
          >
            <div className="flex justify-center mb-2">{s.icon}</div>
            <div className="text-xl font-bold text-sky-700">{s.number}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Contenido */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">¿Quiénes Somos?</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Distribuidora Tatto</strong> es un negocio familiar fundado hace más de 34 años en Villa Nueva, Guatemala.
            Nos dedicamos a la distribución de materia prima para calzado y a la venta de zapatos para hombre, mujer y niños,
            ofreciendo variedad, calidad y los mejores precios del mercado local.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Brindar a nuestros clientes calzado de calidad a precios accesibles, con atención personalizada
            y un servicio que va más allá de la venta, creando relaciones de confianza con cada familia que nos visita.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">Nuestra Visión</h2>
          <p className="text-gray-700 leading-relaxed">
            Expandir nuestra presencia digital y física para llegar a más familias guatemaltecas,
            modernizando nuestra atención sin perder la cercanía y calidez que nos caracteriza como negocio familiar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">Nuestros Valores</h2>
          <ul className="space-y-2">
            {values.map((v, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-sky-400 mt-1">✔</span>
                {v}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-sky-50 rounded-xl p-6 text-center border border-sky-100">
          <h2 className="text-xl font-semibold text-sky-700 mb-2">Propietario</h2>
          <p className="text-gray-600">
            <strong>Ivan Alexander Ramos Gramajo</strong><br />
            Fundador y propietario de Distribuidora Tatto.<br />
            <span className="text-sky-500">Villa Nueva, Guatemala</span>
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
