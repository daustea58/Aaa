import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';

const LoveCheck = () => {
  const navigate = useNavigate();
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleNoHover = () => {
    if (noClickCount < 5) {
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleNoClick = () => {
    if (noClickCount < 4) {
      setNoClickCount(noClickCount + 1);
      handleNoHover();
    } else {
      // After 5 clicks, transform No button to Yes
      handleYesClick();
    }
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowPopup(true);
    setTimeout(() => {
      navigate('/birthday');
    }, 3000);
  };

  const noButtonText = () => {
    if (noClickCount === 0) return 'Enggak';
    if (noClickCount === 1) return 'Masa sih?';
    if (noClickCount === 2) return 'Boong deh';
    if (noClickCount === 3) return 'Yakin nih?';
    return 'Iya deh 💕';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <FloatingPetals />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={['#FFD1DC', '#FF69B4', '#FFFDD0', '#FF1493']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-primary">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center mb-6"
          >
            <div className="text-9xl mb-4">
              🥺
            </div>
          </motion.div>

          <h2 className="font-heading text-5xl md:text-6xl text-text-main text-center mb-8 leading-tight">
            Kamu sayang aku ga?
          </h2>

          <div className="space-y-6 relative min-h-[200px]">
            <motion.button
              data-testid="love-check-yes-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleYesClick}
              className="w-full bg-accent text-accent-foreground font-accent font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all text-2xl"
            >
              Iya dong! 💖
            </motion.button>

            <motion.button
              data-testid="love-check-no-button"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              }}
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              className={`w-full font-accent font-bold px-8 py-6 rounded-full shadow-lg transition-all text-2xl absolute left-0 ${
                noClickCount >= 4
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground border-2 border-primary'
              }`}
            >
              {noButtonText()}
            </motion.button>
          </div>

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 text-center"
          >
            <p className="font-body text-xl text-text-muted">
              Pilih yang jujur ya bb 😊
            </p>
          </motion.div>
        </div>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-accent text-accent-foreground rounded-3xl p-8 shadow-2xl border-4 border-white">
                <div className="text-center">
                  <Heart className="w-20 h-20 mx-auto mb-4 fill-white" />
                  <h3 className="font-heading text-5xl mb-4">
                    Aku tau kok! 🥰
                  </h3>
                  <p className="font-body text-2xl">
                    Sayang kamu juga bb 💕
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LoveCheck;
