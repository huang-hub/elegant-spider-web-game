import React from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { useTranslation } from '../utils/translations';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Volume2, VolumeX, RotateCcw, RotateCw, Plus, Globe, ExternalLink, Menu } from 'lucide-react';
import BackgroundCustomizer from './BackgroundCustomizer';

const GameHeader: React.FC = () => {
  const {
    score,
    moves,
    time,
    soundEnabled,
    language,
    toggleSound,
    undoMove,
    redoMove,
    initializeGame,
    difficulty,
    stockPile,
    dealCards,
    cards,
    setLanguage
  } = useGameStore();

  const t = useTranslation(language);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-black/20 backdrop-blur text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{t('title')}</h1>
            <Button asChild variant="ghost" size="sm" className="text-white hover:text-green-200">
              <a href="https://anysolitaire.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                {t('visitSite')}
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm bg-black/20 rounded-lg px-3 py-1">
            <span>{t('score')}: {score}</span>
            <span>{t('moves')}: {moves}</span>
            <span>{t('time')}: {formatTime(time)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <BackgroundCustomizer />
          
          {/* Menu with links to other pages */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
                <Menu className="w-4 h-4 mr-2" />
                {t('menu')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to={`/${language}/how-to-play`}>
                    {t('howToPlay')}
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to={`/${language}/background-tutorial`}>
                    {t('backgroundTutorial')}
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to={`/${language}/about`}>
                    {t('aboutTeam')}
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to={`/${language}/privacy`}>
                    {t('privacyPolicy')}
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Language Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
                <Globe className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="space-y-1">
                {[
                  { code: 'en', name: 'English' },
                  { code: 'es', name: 'Español' },
                  { code: 'zh', name: '中文' },
                  { code: 'fr', name: 'Français' },
                  { code: 'ru', name: 'Русский' }
                ].map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setLanguage(lang.code);
                      window.history.pushState({}, '', `/${lang.code}`);
                    }}
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded bg-green-600 hover:bg-green-500 transition-colors"
            title={t('sound')}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* New Game */}
          <button
            onClick={initializeGame}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
          >
            {t('newGame')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
