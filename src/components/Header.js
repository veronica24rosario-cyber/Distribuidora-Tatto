import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Home, Info, ShoppingBag, ShoppingCart, Mail, User, Settings, LogOut } from 'lucide-react';

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const sideMenuItems = [
    { to: '/about', label: 'Nosotros', icon: Info },
    { to: '/services', label: 'Catálogo', icon: ShoppingBag },
    { to: '/contact', label: 'Contacto', icon: Mail },
    isLoggedIn
      ? { to: '/admin', label: 'Panel Admin', icon: Settings }
      : { to: '/login', label: 'Acceso Admin', icon: User },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 border-b border-sky-100">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-sky-700 flex items-center gap-2">
            👟 Distribuidora Tatto
          </Link>

          <Link
            to="/"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-base font-medium transition ${
              isActive('/') ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:text-sky-600'
            }`}
          >
            <Home className="w-4 h-4" />
            Inicio
          </Link>

          <Link
            to="/store"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-base font-medium transition ${
              isActive('/store') ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:text-sky-600'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Tienda
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition"
        >
          <Menu className="w-6 h-6" />
          <span className="text-base font-medium">Menú</span>
        </button>
      </header>

      {menuOpen && (
        <div className="fixed top-20 right-0 w-56 h-full bg-white shadow-xl z-40 p-4 border-l border-sky-100">
          <nav className="space-y-2">
            {sideMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md transition text-base ${
                    isActive(item.to)
                      ? 'bg-sky-100 text-sky-700 font-semibold'
                      : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}

            {isLoggedIn && (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 w-full text-base"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            )}
          </nav>
        </div>
      )}

      <div className="pt-20" />
    </>
  );
};

export default Header;
