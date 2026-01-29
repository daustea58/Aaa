import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingPetals } from '../components/FloatingPetals';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2 } from 'lucide-react';

const MusicSelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('sedih');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const musicCategories = {
    sedih: [
      { id: 1, title: 'Menerima Luka', artist: 'Natasya Sabella', file: 'menerima-luka.mp3' },
      { id: 2, title: 'Bersenja Gurau', artist: 'Raim Laode', file: 'bersenja-gurau.mp3' },
      { id: 3, title: 'Dirimu Yang Dulu', artist: 'Anggis Devaki', file: 'dirimu-yang-dulu.mp3' },
    ],
    mood: [
      { id: 4, title: 'Mistletoe', artist: 'Justin Bieber', file: 'mistletoe.mp3' },
      { id: 5, title: '18', artist: 'One Direction', file: '18.mp3' },
      { id: 6, title: 'Trouble (Frank)', artist: 'ciaffa, fedo DJ', file: 'trouble.mp3' },
    ],
    semangat: [
      { id: 7, title: 'Payphone', artist: 'Maroon 5', file: 'payphone.mp3' },
      { id: 8, title: 'Perfect', artist: 'One Direction', file: 'perfect.mp3' },
      { id: 9, title: 'Where We Are', artist: 'One Direction', file: 'where-we-are.mp3' },
    ],
    favorit: [
      { id: 10, title: 'Kota ini tak sama tanpamu', artist: 'Nadhif Basalamah', file: 'kota-ini.mp3' },
      { id: 11, title: 'Masa ini, Nanti, dan Masa Indah Lainnya', artist: 'Nuca', file: 'masa-ini.mp3' },
      { id: 12, title: '8 Letters', artist: "Why Don't We", file: '8-letters.mp3' },
    ],
  };

  const categoryEmojis = {
    sedih: '😢',
    mood: '😊',
    semangat: '💪',
    favorit: '⭐',
  };

  const categoryLabels = {
    sedih: 'Sedih',
    mood: 'Mood',
    semangat: 'Semangat',
    favorit: 'Favorit',
  };

  const handleSongClick = (song) => {
    const songPath = `/music/${selectedCategory}/${song.file}`;
    
    if (currentSong?.id === song.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = songPath;
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
        setIsPlaying(true);
      }
      setCurrentSong(song);
    }
  };

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    navigate('/timeline');
  };

  return (
    <div className="min-h-screen py-8 px-6 relative">
      <FloatingPetals />
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-8">
          <Music className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-6xl text-text-main mb-4">
            Playlist Kita
          </h1>
          <p className="font-body text-xl text-text-muted">
            Pilih lagu yang pengen kamu dengerin bb 🎵
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Object.keys(musicCategories).map((category) => (
            <motion.button
              key={category}
              data-testid={`music-category-${category}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-6 py-3 rounded-full font-accent font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'bg-white/80 text-text-main border-2 border-primary'
              }`}
            >
              <span className="mr-2">{categoryEmojis[category]}</span>
              {categoryLabels[category]}
            </motion.button>
          ))}
        </div>

        {/* Song List */}
        <div className="space-y-3 mb-8">
          {musicCategories[selectedCategory].map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              data-testid={`song-item-${song.id}`}
              onClick={() => handleSongClick(song)}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                currentSong?.id === song.id && isPlaying
                  ? 'border-accent shadow-lg scale-[1.02]'
                  : 'border-primary'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {currentSong?.id === song.id && isPlaying ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Pause className="w-8 h-8 text-accent" />
                    </motion.div>
                  ) : (
                    <Play className="w-8 h-8 text-accent" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-body text-xl font-bold text-text-main">
                    {song.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted">
                    {song.artist}
                  </p>
                </div>
                <Volume2 className="w-6 h-6 text-text-muted" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          data-testid="music-continue-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full bg-accent text-accent-foreground font-accent font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
        >
          Lanjut ke Timeline 💕
        </motion.button>

        <div className="mt-6 text-center">
          <p className="font-body text-sm text-text-muted">
            Note: Upload file MP3 ke folder /public/music/{selectedCategory}/ ya bb! 🎵
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicSelection;
