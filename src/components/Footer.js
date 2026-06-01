import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Phone, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-sky-800 text-white py-10 mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">👟 Distribuidora Tatto</h3>
          <p className="text-sky-200 text-sm">
            34 años brindando calidad y estilo en calzado para toda la familia.
            Tu tienda de confianza en Villa Nueva, Guatemala.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Categorías</h4>
          <ul className="space-y-1 text-sm text-sky-100">
            <li>👨 Calzado para Hombre</li>
            <li>👩 Calzado para Mujer</li>
            <li>👦 Calzado para Niños</li>
            <li>👟 Tenis y Deportivo</li>
            <li>🎒 Accesorios</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Contáctanos</h4>
          <div className="flex gap-3 mb-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/tatitoshopgt?igsh=b2ZvMGxwYnJraGVu"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <div className="space-y-2 text-sm text-sky-100">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +502 5555-1234</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@distribuidoratatto.com</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Villa Nueva, Guatemala</p>
          </div>
        </div>
      </div>

      <div className="text-center text-sky-300 text-xs mt-8">
        © {new Date().getFullYear()} Distribuidora Tatto — Todos los derechos reservados
      </div>
    </motion.footer>
  );
};

export default Footer;
