
import React, { useEffect, useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTimer } from '../hooks/useTimer';
import { useTranslation } from '../utils/translations';
import { useParams } from 'react-router-dom';
import DifficultySelector from '../components/DifficultySelector';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import VictoryModal from '../components/VictoryModal';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { lang = 'en' } = useParams();
  const { 
    isGameStarted, 
    isGameComplete, 
    language, 
    cards,
    loadGameState,
    backgroundSettings,
    setLanguage
  } = useGameStore();
  
  const t = useTranslation(language);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  useTimer();

  // Set language from URL parameter
  useEffect(() => {
    if (lang && lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

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

  const getBackgroundStyle = () => {
    switch (backgroundSettings.type) {
      case 'gradient':
        return {
          background: `linear-gradient(to bottom right, ${backgroundSettings.gradientFrom}, ${backgroundSettings.gradientTo})`
        };
      case 'solid':
        return {
          backgroundColor: backgroundSettings.solidColor
        };
      case 'image':
        return backgroundSettings.imageUrl ? {
          backgroundImage: `url(${backgroundSettings.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {
          background: `linear-gradient(to bottom right, ${backgroundSettings.gradientFrom}, ${backgroundSettings.gradientTo})`
        };
      default:
        return {
          background: `linear-gradient(to bottom right, ${backgroundSettings.gradientFrom}, ${backgroundSettings.gradientTo})`
        };
    }
  };

  if (showContinuePrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={getBackgroundStyle()}>
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
    return (
      <div className="min-h-screen" style={getBackgroundStyle()}>
        <DifficultySelector />
        
        {/* SEO Content Section */}
        <div className="container mx-auto px-4 py-12 bg-white/90 backdrop-blur rounded-lg shadow-lg mt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
              {t('seoTitle')}
            </h1>
            
            <div className="prose max-w-none text-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {t('seoH2Title')}
              </h2>
              
              <p className="mb-6 text-lg leading-relaxed">
                {t('seoIntro')}
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {t('seoH3Features')}
              </h3>
              
              <p className="mb-4">
                {t('seoFeatures')}
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {t('seoH3WhyPlay')}
              </h3>
              
              <p className="mb-4">
                {t('seoWhyPlay')}
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  {t('seoH3GetStarted')}
                </h3>
                <p className="text-green-700">
                  {t('seoGetStarted')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={getBackgroundStyle()}>
      <GameHeader />
      
      <main className="flex-1 relative overflow-hidden">
        <GameBoard />
      </main>
      
      <VictoryModal />
      
      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur text-white text-center py-4 text-sm">
        {t('footer')}
      </footer>
    </div>
  );
};

export default Index;
