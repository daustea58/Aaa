import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <FloatingPetals />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full text-center relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="mb-8 flex justify-center"
        >
          <Heart className="w-20 h-20 text-accent fill-accent" />
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-primary">
          <h1 className="font-heading text-6xl md:text-7xl text-text-main mb-6">
            Untuk Lixie
          </h1>
          
          <div className="font-body text-2xl text-text-main mb-8 min-h-[80px]">
            <Typewriter
              options={{
                strings: ['Aku tau kamu bakal kesini... hehe 😌', 'Ada yang spesial untukmu 💕'],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          {showButton && (
            <motion.button
              data-testid="landing-enter-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/password')}
              className="bg-accent text-accent-foreground font-accent font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
            >
              Masuk 💖
            </motion.button>
          )}
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-4xl"
        >
          🌸
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
