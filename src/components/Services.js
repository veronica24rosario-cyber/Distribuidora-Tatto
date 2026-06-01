import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'hombre',
      title: 'Calzado para Hombre',
      emoji: '👨',
      description: 'Amplia variedad de calzado masculino para trabajo, deporte y uso casual.',
      details: [
        { name: 'Zapatos de cuero formales', price: 'Q250 – Q450', desc: 'Ideales para oficina, graduaciones y eventos formales.' },
        { name: 'Botas de trabajo', price: 'Q350 – Q600', desc: 'Resistentes y cómodas para uso industrial o campo.' },
        { name: 'Zapatos casuales', price: 'Q180 – Q350', desc: 'Perfectos para el día a día, cómodos y elegantes.' },
        { name: 'Sandalias de hombre', price: 'Q120 – Q200', desc: 'Livianas y frescas para temporada de calor.' },
      ],
    },
    {
      id: 'mujer',
      title: 'Calzado para Mujer',
      emoji: '👠',
      description: 'Diseños modernos y elegantes para la mujer de hoy.',
      details: [
        { name: 'Tacones altos', price: 'Q200 – Q500', desc: 'Stilettos, plataformas y cuñas para looks elegantes.' },
        { name: 'Flats y bailarinas', price: 'Q150 – Q280', desc: 'Comodidad sin sacrificar el estilo.' },
        { name: 'Sandalias', price: 'Q130 – Q250', desc: 'Ligeras y elegantes para toda ocasión.' },
        { name: 'Zapatos casuales mujer', price: 'Q180 – Q320', desc: 'Modernos y versátiles para uso diario.' },
      ],
    },
    {
      id: 'ninos',
      title: 'Calzado para Niños',
      emoji: '👦',
      description: 'Calzado cómodo, resistente y seguro para los más pequeños.',
      details: [
        { name: 'Zapatos escolares', price: 'Q120 – Q220', desc: 'Resistentes y cómodos para el uso diario en la escuela.' },
        { name: 'Tenis para niños', price: 'Q150 – Q280', desc: 'Ideales para educación física y tiempo libre.' },
        { name: 'Sandalias infantiles', price: 'Q80 – Q150', desc: 'Fáciles de poner y quitar, perfectas para el calor.' },
        { name: 'Botas infantiles', price: 'Q180 – Q300', desc: 'Para días lluviosos con seguridad y estilo.' },
      ],
    },
    {
      id: 'deportivo',
      title: 'Tenis y Deportivo',
      emoji: '👟',
      description: 'Los modelos más demandados para deporte, gym y uso casual.',
      details: [
        { name: 'Tenis para running', price: 'Q250 – Q500', desc: 'Suela amortiguadora para mayor rendimiento al correr.' },
        { name: 'Tenis casuales', price: 'Q180 – Q350', desc: 'Combinan moda y comodidad para el día a día.' },
        { name: 'Tenis de fútbol', price: 'Q200 – Q400', desc: 'Con taches para mejor agarre en el campo.' },
        { name: 'Tenis escolares', price: 'Q150 – Q280', desc: 'Resistentes y cómodos para actividad física diaria.' },
      ],
    },
    {
      id: 'accesorios',
      title: 'Materia Prima y Accesorios',
      emoji: '🎒',
      description: 'Todo lo que necesitas para el mantenimiento y fabricación de calzado.',
      details: [
        { name: 'Plantillas ortopédicas', price: 'Q35 – Q80', desc: 'Para mayor comodidad y soporte del pie.' },
        { name: 'Cordones', price: 'Q10 – Q25', desc: 'En diferentes colores, materiales y longitudes.' },
        { name: 'Crema para zapatos', price: 'Q25 – Q60', desc: 'Mantiene el cuero suave y brillante.' },
        { name: 'Materia prima para fabricación', price: 'Consultar', desc: 'Cuero, suelas, pegamento y más insumos para fabricantes.' },
      ],
    },
  ];

  return (
    <div className="pt-8 pb-10 px-6 md:px-20 bg-sky-50 text-gray-800 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Nuestro Catálogo</h1>
        <p className="text-gray-500 text-lg">Calzado para toda la familia — calidad y estilo al mejor precio</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden text-center p-6 flex flex-col items-center border border-sky-100"
          >
            <span className="text-6xl mb-4">{service.emoji}</span>
            <h2 className="text-xl font-bold text-sky-700 mb-2">{service.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{service.description}</p>
            <button
              onClick={() => setSelectedService(service)}
              className="bg-sky-600 text-white px-6 py-2 rounded-full hover:bg-sky-700 transition font-medium text-sm"
            >
              Ver precios
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-3xl w-full relative overflow-auto max-h-[85vh] shadow-2xl"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <span className="text-5xl">{selectedService.emoji}</span>
              <h2 className="text-2xl font-bold text-sky-700 mt-2">{selectedService.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{selectedService.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {selectedService.details.map((item, idx) => (
                <div key={idx} className="bg-sky-50 border border-sky-100 p-4 rounded-xl hover:shadow-md transition">
                  <h3 className="font-semibold text-sky-700 mb-1">{item.name}</h3>
                  <p className="text-sky-500 font-bold text-sm mb-1">{item.price}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;
