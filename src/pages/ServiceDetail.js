import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const servicesData = {
  hombre: {
    emoji: '👨',
    title: 'Calzado para Hombre',
    description: 'Amplia variedad de calzado masculino para trabajo, deporte y uso casual.',
    items: [
      { servicio: 'Zapatos de cuero formales', precio: 'Q250 – Q450', descripcion: 'Ideales para oficina, graduaciones y eventos formales.' },
      { servicio: 'Botas de trabajo', precio: 'Q350 – Q600', descripcion: 'Resistentes y cómodas para uso industrial o campo.' },
      { servicio: 'Zapatos casuales', precio: 'Q180 – Q350', descripcion: 'Perfectos para el día a día, cómodos y elegantes.' },
      { servicio: 'Sandalias de hombre', precio: 'Q120 – Q200', descripcion: 'Livianas y frescas para temporada de calor.' },
    ],
  },
  mujer: {
    emoji: '👠',
    title: 'Calzado para Mujer',
    description: 'Diseños modernos y elegantes para la mujer de hoy.',
    items: [
      { servicio: 'Tacones altos', precio: 'Q200 – Q500', descripcion: 'Stilettos, plataformas y cuñas para looks elegantes.' },
      { servicio: 'Flats y bailarinas', precio: 'Q150 – Q280', descripcion: 'Comodidad sin sacrificar el estilo.' },
      { servicio: 'Sandalias', precio: 'Q130 – Q250', descripcion: 'Ligeras y elegantes para toda ocasión.' },
      { servicio: 'Zapatos casuales mujer', precio: 'Q180 – Q320', descripcion: 'Modernos y versátiles para uso diario.' },
    ],
  },
  ninos: {
    emoji: '👦',
    title: 'Calzado para Niños',
    description: 'Calzado cómodo, resistente y seguro para los más pequeños.',
    items: [
      { servicio: 'Zapatos escolares', precio: 'Q120 – Q220', descripcion: 'Resistentes y cómodos para el uso diario en la escuela.' },
      { servicio: 'Tenis para niños', precio: 'Q150 – Q280', descripcion: 'Ideales para educación física y tiempo libre.' },
      { servicio: 'Sandalias infantiles', precio: 'Q80 – Q150', descripcion: 'Fáciles de poner y quitar, perfectas para el calor.' },
      { servicio: 'Botas infantiles', precio: 'Q180 – Q300', descripcion: 'Para días lluviosos con seguridad y estilo.' },
    ],
  },
  deportivo: {
    emoji: '👟',
    title: 'Tenis y Deportivo',
    description: 'Los modelos más demandados para deporte, gym y uso casual.',
    items: [
      { servicio: 'Tenis para running', precio: 'Q250 – Q500', descripcion: 'Suela amortiguadora para mayor rendimiento al correr.' },
      { servicio: 'Tenis casuales', precio: 'Q180 – Q350', descripcion: 'Combinan moda y comodidad para el día a día.' },
      { servicio: 'Tenis de fútbol', precio: 'Q200 – Q400', descripcion: 'Con taches para mejor agarre en el campo.' },
      { servicio: 'Tenis escolares', precio: 'Q150 – Q280', descripcion: 'Resistentes y cómodos para actividad física diaria.' },
    ],
  },
  accesorios: {
    emoji: '🎒',
    title: 'Materia Prima y Accesorios',
    description: 'Todo lo que necesitas para el mantenimiento y fabricación de calzado.',
    items: [
      { servicio: 'Plantillas ortopédicas', precio: 'Q35 – Q80', descripcion: 'Para mayor comodidad y soporte del pie.' },
      { servicio: 'Cordones', precio: 'Q10 – Q25', descripcion: 'En diferentes colores, materiales y longitudes.' },
      { servicio: 'Crema para zapatos', precio: 'Q25 – Q60', descripcion: 'Mantiene el cuero suave y brillante.' },
      { servicio: 'Materia prima para fabricación', precio: 'Consultar', descripcion: 'Cuero, suelas, pegamento y más insumos.' },
    ],
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData[id];

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Categoría no encontrada</p>
        <Link to="/services" className="text-sky-600 hover:underline mt-2 block">Ver todas las categorías</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-20 px-6 md:px-20 bg-sky-50 text-gray-800"
    >
      <Link to="/services"
        className="flex items-center gap-2 text-sky-600 hover:text-sky-800 mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </Link>

      <div className="text-center mb-10">
        <span className="text-6xl">{service.emoji}</span>
        <h1 className="text-3xl font-bold text-sky-700 mt-3 mb-2">{service.title}</h1>
        <p className="text-gray-500">{service.description}</p>
      </div>

      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="table-auto w-full bg-white rounded-2xl shadow-sm border border-sky-100">
          <thead className="bg-sky-50">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-sky-700">Producto / Servicio</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-sky-700">Precio</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-sky-700">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {service.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-sky-50 transition">
                <td className="px-5 py-4 text-sm font-medium text-gray-800">{item.servicio}</td>
                <td className="px-5 py-4 text-sm font-semibold text-sky-600">{item.precio}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{item.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
