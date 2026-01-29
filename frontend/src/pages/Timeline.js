import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion } from 'framer-motion';
import { Calendar, Heart, Users } from 'lucide-react';

const Timeline = () => {
  const navigate = useNavigate();

  const moments = [
    {
      id: 1,
      icon: Users,
      emoji: '💬',
      title: 'Pertama Kenal',
      date: 'Awal 2024',
      description: 'Kenal di Facebook karena kamu tertarik sama nama "Ryzen" yang unik. Dari situ kita mulai deket... siapa sangka ya bb 😆',
      color: 'bg-pink-100 border-pink-300',
    },
    {
      id: 2,
      icon: Heart,
      emoji: '💕',
      title: 'Jadian!',
      date: '22 Desember 2024',
      description: 'Akhirnya kita jadian setelah melewati banyak ujian. Hari ini jadi hari paling spesial buat kita berdua 🥰',
      color: 'bg-rose-100 border-rose-300',
    },
    {
      id: 3,
      icon: Calendar,
      emoji: '🌟',
      title: 'Pertama Ketemu',
      date: '6 Juni 2025, Cianjur',
      description: 'Grogi banget waktu itu, tapi alhamdulillah diterima sama orang tuamu. Momen yang gak bakal pernah aku lupain 😌💖',
      color: 'bg-purple-100 border-purple-300',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-6 relative">
      <FloatingPetals />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            📖
          </motion.div>
          <h1 className="font-heading text-6xl text-text-main mb-4">
            Perjalanan Kita
          </h1>
          <p className="font-body text-xl text-text-muted">
            Momen-momen yang bikin kita sampai sini bb 💕
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary"></div>

          {moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              data-testid={`timeline-moment-${moment.id}`}
              className="relative mb-8 ml-16"
            >
              {/* Timeline Dot */}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className="absolute -left-[38px] top-6 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg"
              ></motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 shadow-xl ${moment.color} relative overflow-hidden`}
              >
                {/* Decorative Emoji */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-20">
                  {moment.emoji}
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                      <moment.icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-accent text-2xl font-bold text-text-main">
                        {moment.title}
                      </h3>
                      <span className="text-2xl">{moment.emoji}</span>
                    </div>
                    <p className="font-body text-sm text-accent font-semibold mb-2">
                      {moment.date}
                    </p>
                    <p className="font-body text-lg text-text-main leading-relaxed">
                      {moment.description}
                    </p>
                  </div>
                </div>

                {/* Tape Effect */}
                <div className="absolute top-0 right-8 w-16 h-8 bg-yellow-200/60 -rotate-12 shadow-sm"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <motion.button
            data-testid="timeline-continue-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/love-check')}
            className="w-full bg-accent text-accent-foreground font-accent font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
          >
            Lanjut 💖
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Timeline;
