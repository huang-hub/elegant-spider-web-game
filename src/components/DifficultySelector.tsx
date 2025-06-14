
import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { useTranslation } from '../utils/translations';

const DifficultySelector: React.FC = () => {
  const { language, initializeGame } = useGameStore();
  const t = useTranslation(language);

  const difficulties = [
    { value: 1 as const, name: t('easy'), description: '1 Suit - Perfect for beginners', color: 'from-green-500 to-green-600' },
    { value: 2 as const, name: t('medium'), description: '2 Suits - Moderate challenge', color: 'from-yellow-500 to-orange-500' },
    { value: 4 as const, name: t('hard'), description: '4 Suits - Expert level', color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('difficulty')}</p>
        </div>

        <div className="space-y-4">
          {difficulties.map((diff, index) => (
            <motion.button
              key={diff.value}
              onClick={() => initializeGame(diff.value)}
              className={`
                w-full p-6 rounded-xl bg-gradient-to-r ${diff.color}
                text-white font-medium transition-all duration-200
                hover:shadow-lg hover:scale-105 active:scale-95
              `}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-xl font-bold mb-1">{diff.name}</div>
              <div className="text-sm opacity-90">{diff.description}</div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Choose your challenge level to begin!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DifficultySelector;
