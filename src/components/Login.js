import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, X, Settings, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [resetSending, setResetSending] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem('loggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/admin');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Correo o contraseña incorrectos.');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Intenta más tarde o restablece tu contraseña.');
          break;
        default:
          setError('Error al iniciar sesión. Verifica tus datos.');
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetSending(true);
    setResetStatus('');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetStatus('✅ Correo de recuperación enviado. Revisa tu bandeja de entrada.');
      setResetEmail('');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setResetStatus('❌ No encontramos una cuenta con ese correo.');
      } else {
        setResetStatus('❌ Error al enviar el correo. Intenta de nuevo.');
      }
    }
    setResetSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 pt-20 px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-sky-100"
      >
        {/* ─── VISTA LOGIN ─── */}
        {view === 'login' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Panel Admin</h2>
                <p className="text-sm text-gray-400 mt-1">Distribuidora Tatto</p>
              </div>
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-red-500 text-base text-center bg-red-50 p-2 rounded-lg">{error}</p>
              )}

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-base"
                    placeholder="admin@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-base"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Olvidé mi contraseña */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => { setView('forgot'); setError(''); }}
                  className="text-sky-500 hover:text-sky-700 text-base font-medium transition"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-sky-700 transition flex items-center justify-center gap-2"
              >
                Ingresar <Settings className="w-4 h-4" />
              </motion.button>
            </form>
          </>
        )}

        {/* ─── VISTA FORGOT PASSWORD ─── */}
        {view === 'forgot' && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => { setView('login'); setResetStatus(''); }} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Recuperar contraseña</h2>
                <p className="text-sm text-gray-400">Te enviaremos un correo de recuperación</p>
              </div>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Tu correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => { setResetEmail(e.target.value); setResetStatus(''); }}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-base"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              {resetStatus && (
                <p className={`text-base text-center p-3 rounded-lg ${
                  resetStatus.startsWith('✅') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                }`}>
                  {resetStatus}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={resetSending}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-sky-700 transition"
              >
                {resetSending ? 'Enviando...' : 'Enviar correo de recuperación'}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Login;
