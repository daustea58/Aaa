import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Cake } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Birthday = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBirthdayMessage = async () => {
      try {
        const response = await axios.post(`${API}/generate-message`, {
          message_type: 'birthday'
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching birthday message:', error);
        setMessage('bb, selamat ulang tahun! 🥰 Gak nyangka ya akhirnya kita sampai sini... dari kamu nanya soal nama Ryzen di FB sampai sekarang 😆💕 Semoga hari ini penuh senyum dan ketawa terus ya! Aku sayang banget sama kamu 💖');
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdayMessage();
  }, []);

  return (
    <div className="min-h-screen py-8 px-6 relative">
      <FloatingPetals />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Cake className="w-20 h-20 text-accent" />
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            🎂
          </motion.div>

          <h1 className="font-heading text-6xl md:text-7xl text-text-main mb-4">
            Selamat Ulang Tahun!
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-accent" />
            <p className="font-accent text-2xl text-accent font-semibold">
              Untuk Lixie Tersayang 💕
            </p>
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-primary mb-8 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 text-9xl opacity-10">🎉</div>
          <div className="absolute -bottom-6 -left-6 text-9xl opacity-10">🎈</div>

          <div data-testid="birthday-message-container" className="relative z-10">
            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Gift className="w-12 h-12 text-accent" />
                </motion.div>
                <p className="font-body text-xl text-text-muted">
                  Lagi bikin ucapan spesial buat bb... 💕
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-body text-2xl text-text-main leading-relaxed whitespace-pre-wrap">
                  {message}
                </p>
              </div>
            )}
          </div>

          {/* Confetti Decoration */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ 
                  y: ['0%', '100%'],
                  x: [0, Math.random() * 100 - 50],
                  rotate: [0, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute text-2xl"
                style={{ left: `${Math.random() * 100}%` }}
              >
                {['🎊', '✨', '💖', '🎈', '🎉'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          data-testid="birthday-continue-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/thankyou')}
          className="w-full bg-accent text-accent-foreground font-accent font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
        >
          Ada lagi nih bb... 💕
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Birthday;
