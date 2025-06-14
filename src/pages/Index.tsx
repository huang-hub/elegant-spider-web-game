
import React, { useEffect, useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTimer } from '../hooks/useTimer';
import { useTranslation } from '../utils/translations';
import DifficultySelector from '../components/DifficultySelector';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import VictoryModal from '../components/VictoryModal';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { 
    isGameStarted, 
    isGameComplete, 
    language, 
    cards,
    loadGameState 
  } = useGameStore();
  
  const t = useTranslation(language);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  useTimer();

  useEffect(() => {
    // Check if there's a saved game
    const savedGame = localStorage.getItem('spider-solitaire-game');
    if (savedGame && !isGameStarted) {
      try {
        const gameData = JSON.parse(savedGame);
        if (gameData.state?.isGameStarted && gameData.state?.cards?.some((col: any[]) => col.length > 0)) {
          setShowContinuePrompt(true);
        }
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    }
  }, [isGameStarted]);

  const handleContinueGame = (shouldContinue: boolean) => {
    if (shouldContinue) {
      loadGameState();
    }
    setShowContinuePrompt(false);
  };

  if (showContinuePrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('continueGame')}
          </h2>
          <p className="text-gray-600 mb-6">
            We found a saved game. Would you like to continue where you left off?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleContinueGame(true)}
              className="flex-1 py-3 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('yes')}
            </button>
            <button
              onClick={() => handleContinueGame(false)}
              className="flex-1 py-3 px-6 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('no')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isGameStarted) {
    return <DifficultySelector />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex flex-col">
      <GameHeader />
      
      <main className="flex-1 relative overflow-hidden">
        <GameBoard />
      </main>
      
      <VictoryModal />
      
      {/* Footer */}
      <footer className="bg-green-900 text-white text-center py-4 text-sm">
        {t('footer')}
      </footer>
    </div>
  );
};

export default Index;
