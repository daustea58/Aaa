import React, { useState, useEffect } from 'react';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ThankYou = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const fetchThankYouMessage = async () => {
      try {
        const response = await axios.post(`${API}/generate-message`, {
          message_type: 'thankyou'
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching thank you message:', error);
        setMessage('bb, terima kasih ya udah nyempetin waktu buat aku hari ini 😌💕 Masih inget gak waktu kamu nanya soal nama Ryzen di FB? Dari situ kita jadi makin deket... wkwk siapa sangka 😆\n\nBanyak ujian yang kita lewatin bareng sebelum akhirnya jadian. Tapi alhamdulillah kita kuat ya bb 💪✨ Terus waktu pertama kali ketemu di Cianjur, aku grogi banget! Tapi seneng banget diterima sama orang tuamu 🥰\n\nAku janji bakal bikin bb ketawa terus, bikin bb happy, dan selalu ada buat bb 💖 Semoga setiap hari kita makin manis kayak cokelat, makin seru, dan makin sayang 😘\n\nI love you bb! 💕💕💕');
      } finally {
        setLoading(false);
      }
    };

    fetchThankYouMessage();

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-8 px-6 relative">
      <FloatingPetals />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#FFD1DC', '#FF69B4', '#FFFDD0', '#FF1493']}
          numberOfPieces={300}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-24 h-24 text-accent fill-accent" />
          </motion.div>

          <h1 className="font-heading text-6xl md:text-7xl text-text-main mb-4">
            Terima Kasih
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-accent" />
            <p className="font-accent text-2xl text-accent font-semibold">
              Untuk Lixie yang Paling Spesial 💕
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
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-9xl">💕</div>
            <div className="absolute top-40 right-10 text-9xl">✨</div>
            <div className="absolute bottom-20 left-20 text-9xl">💖</div>
            <div className="absolute bottom-10 right-20 text-9xl">🥰</div>
          </div>

          <div data-testid="thankyou-message-container" className="relative z-10">
            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Heart className="w-12 h-12 text-accent" />
                </motion.div>
                <p className="font-body text-xl text-text-muted">
                  Lagi nulis pesan spesial buat bb... 💕
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="font-body text-2xl text-text-main leading-relaxed whitespace-pre-wrap">
                  {message}
                </p>
              </div>
            )}
          </div>

          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ 
                  y: ['-10%'],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute text-4xl"
                style={{ left: `${10 + i * 12}%` }}
              >
                💕
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl"
          >
            🌸
          </motion.div>

          <p className="font-body text-xl text-text-main">
            Dari Ryzen, dengan segenap cinta 💖
          </p>

          <div className="flex justify-center gap-4 mt-8">
            {['💕', '🥰', '😘', '💖', '✨'].map((emoji, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="text-5xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
