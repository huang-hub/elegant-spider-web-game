
import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { useTranslation } from '../utils/translations';
import { Link, useParams } from 'react-router-dom';
import { 
  Settings, 
  RotateCcw, 
  RotateCw, 
  Play, 
  Volume2, 
  VolumeX, 
  Globe,
  Palette,
  Home,
  Info,
  HelpCircle,
  Shield,
  Brush
} from 'lucide-react';
import { Button } from './ui/button';
import BackgroundCustomizer from './BackgroundCustomizer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const GameHeader: React.FC = () => {
  const { lang = 'en' } = useParams();
  const { 
    score, 
    moves, 
    difficulty, 
    setDifficulty,
    newGame, 
    dealCards, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    canDeal,
    soundEnabled,
    toggleSound,
    setLanguage,
    language
  } = useGameStore();
  
  const t = useTranslation(language);
  const [showBackgroundCustomizer, setShowBackgroundCustomizer] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const handleDifficultyChange = (newDifficulty: 1 | 2 | 4) => {
    setDifficulty(newDifficulty);
    newGame();
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    window.location.href = `/${newLang}`;
  };

  return (
    <>
      <header className="bg-black/20 backdrop-blur text-white p-4 shadow-lg">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <a 
              href="https://anysolitaire.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 transition-colors text-sm"
            >
              {t('visitSite')}
            </a>
          </div>

          {/* Game Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>{t('score')}:</span>
              <span className="font-bold text-yellow-300">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{t('moves')}:</span>
              <span className="font-bold text-blue-300">{moves}</span>
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Settings className="w-4 h-4 mr-2" />
                  {t('difficulty')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDifficultyChange(1)}>
                  {t('easy')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDifficultyChange(2)}>
                  {t('medium')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDifficultyChange(4)}>
                  {t('hard')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Game Action Buttons */}
            <Button 
              onClick={newGame}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Play className="w-4 h-4 mr-2" />
              {t('newGame')}
            </Button>

            <Button 
              onClick={dealCards}
              disabled={!canDeal}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              {t('deal')}
            </Button>

            <Button 
              onClick={undo}
              disabled={!canUndo}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button 
              onClick={redo}
              disabled={!canRedo}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <RotateCw className="w-4 h-4" />
            </Button>

            {/* Background Customizer */}
            <Button 
              onClick={() => setShowBackgroundCustomizer(true)}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Palette className="w-4 h-4 mr-2" />
              {t('customizeBackground')}
            </Button>

            {/* Sound Toggle */}
            <Button 
              onClick={toggleSound}
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Globe className="w-4 h-4 mr-2" />
                  {languages.find(l => l.code === language)?.flag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Info className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to={`/${lang}/how-to-play`}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    {t('howToPlay')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${lang}/background-tutorial`}>
                    <Brush className="w-4 h-4 mr-2" />
                    {t('backgroundTutorial')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${lang}/about`}>
                    <Info className="w-4 h-4 mr-2" />
                    {t('aboutTeam')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${lang}/privacy`}>
                    <Shield className="w-4 h-4 mr-2" />
                    {t('privacyPolicy')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Background Customizer Modal */}
      {showBackgroundCustomizer && (
        <BackgroundCustomizer onClose={() => setShowBackgroundCustomizer(false)} />
      )}
    </>
  );
};

export default GameHeader;
