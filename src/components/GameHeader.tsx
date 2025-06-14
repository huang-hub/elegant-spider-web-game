
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { useTranslation } from '../utils/translations';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';

const GameHeader: React.FC = () => {
  const {
    score,
    time,
    moves,
    soundEnabled,
    language,
    difficulty,
    stockPile,
    undoMove,
    redoMove,
    resetGame,
    toggleSound,
    setLanguage,
    history,
    historyIndex
  } = useGameStore();

  const t = useTranslation(language);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' }
  ];

  return (
    <motion.header 
      className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <div className="text-sm opacity-75">
            {t('difficulty')}: {difficulty === 1 ? t('easy') : difficulty === 2 ? t('medium') : t('hard')}
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-xs opacity-75">{t('score')}</div>
            <div className="font-bold">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-xs opacity-75">{t('time')}</div>
            <div className="font-bold">{formatTime(time)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs opacity-75">{t('moves')}</div>
            <div className="font-bold">{moves}</div>
          </div>
          <div className="text-center">
            <div className="text-xs opacity-75">Cards Left</div>
            <div className="font-bold">{stockPile.length}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <button
            onClick={undoMove}
            disabled={historyIndex <= 0}
            className="p-2 rounded bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={t('undo')}
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={redoMove}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={t('redo')}
          >
            <ArrowRight size={20} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded bg-green-600 hover:bg-green-500 transition-colors"
            title={t('sound')}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="px-3 py-2 rounded bg-green-600 hover:bg-green-500 transition-colors text-sm"
            >
              {languages.find(l => l.code === language)?.code.toUpperCase() || 'EN'}
            </button>
            
            {showLanguageMenu && (
              <motion.div
                className="absolute right-0 top-full mt-1 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                  >
                    {lang.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* New Game */}
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
          >
            {t('newGame')}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default GameHeader;
