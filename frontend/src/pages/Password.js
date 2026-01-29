import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';

const Password = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [mascotShake, setMascotShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '22122024') {
      navigate('/music');
    } else {
      setError(true);
      setMascotShake(true);
      setTimeout(() => {
        setError(false);
        setMascotShake(false);
      }, 1000);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <FloatingPetals />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-primary">
          <motion.div
            animate={mascotShake ? { rotate: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <div className="text-8xl mb-4">
              {error ? '😵' : '🐰'}
            </div>
            <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
          </motion.div>

          <h2 className="font-heading text-5xl text-text-main text-center mb-4">
            Rahasia Kita
          </h2>
          
          <p className="font-body text-xl text-text-muted text-center mb-6">
            Masukkan tanggal spesial kita ya bb 💕
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              data-testid="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-xl border-2 border-primary focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white/80 text-center font-body text-3xl tracking-widest outline-none"
              maxLength={8}
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-error text-center font-body text-lg"
                >
                  Eits, salah ya bb! Coba lagi deh 😜
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              data-testid="password-submit-button"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent text-accent-foreground font-accent font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
            >
              Lanjut 💖
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-text-muted">
              Hint: DDMMYYYY tanggal jadian kita 🥰
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 text-6xl opacity-50"
        >
          <Heart className="w-16 h-16 text-accent fill-accent/30" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Password;
