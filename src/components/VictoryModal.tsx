
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { useTranslation } from '../utils/translations';
import { soundManager } from '../utils/soundManager';

const VictoryModal: React.FC = () => {
  const { isGameComplete, language, score, time, moves, resetGame } = useGameStore();
  const t = useTranslation(language);

  useEffect(() => {
    if (isGameComplete) {
      soundManager.playVictory();
    }
  }, [isGameComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const Confetti = () => {
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded"
            style={{
              backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              left: `${Math.random() * 100}%`,
              top: '-10px'
            }}
            animate={{
              y: [0, window.innerHeight + 50],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, 360],
              scale: [1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isGameComplete && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Confetti />
          
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-10" />
            
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              🎉
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t('gameComplete')}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {t('gameCompleteMessage')}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-gray-500">{t('score')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatTime(time)}</div>
                  <div className="text-sm text-gray-500">{t('time')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{moves}</div>
                  <div className="text-sm text-gray-500">{t('moves')}</div>
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={resetGame}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('playAgain')}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VictoryModal;
