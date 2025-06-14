
export const translations = {
  en: {
    title: 'Spider Solitaire',
    newGame: 'New Game',
    deal: 'Deal',
    undo: 'Undo',
    redo: 'Redo',
    score: 'Score',
    time: 'Time',
    moves: 'Moves',
    difficulty: 'Difficulty',
    easy: 'Easy (1 Suit)',
    medium: 'Medium (2 Suits)',
    hard: 'Hard (4 Suits)',
    gameComplete: 'Congratulations!',
    gameCompleteMessage: 'You completed the game!',
    playAgain: 'Play Again',
    sound: 'Sound',
    language: 'Language',
    continueGame: 'Continue Last Game?',
    yes: 'Yes',
    no: 'No',
    leaderboard: 'Leaderboard',
    noScores: 'No scores yet',
    footer: '© 2025 solitaire game · Built with ❤️ for solitaire lovers'
  },
  es: {
    title: 'Solitario Araña',
    newGame: 'Juego Nuevo',
    deal: 'Repartir',
    undo: 'Deshacer',
    redo: 'Rehacer',
    score: 'Puntuación',
    time: 'Tiempo',
    moves: 'Movimientos',
    difficulty: 'Dificultad',
    easy: 'Fácil (1 Palo)',
    medium: 'Medio (2 Palos)',
    hard: 'Difícil (4 Palos)',
    gameComplete: '¡Felicidades!',
    gameCompleteMessage: '¡Completaste el juego!',
    playAgain: 'Jugar de Nuevo',
    sound: 'Sonido',
    language: 'Idioma',
    continueGame: '¿Continuar último juego?',
    yes: 'Sí',
    no: 'No',
    leaderboard: 'Tabla de Puntuaciones',
    noScores: 'Aún no hay puntuaciones',
    footer: '© 2025 juego de solitario · Hecho con ❤️ para los amantes del solitario'
  },
  zh: {
    title: '蜘蛛纸牌',
    newGame: '新游戏',
    deal: '发牌',
    undo: '撤销',
    redo: '重做',
    score: '得分',
    time: '时间',
    moves: '步数',
    difficulty: '难度',
    easy: '简单 (1花色)',
    medium: '中等 (2花色)',
    hard: '困难 (4花色)',
    gameComplete: '恭喜！',
    gameCompleteMessage: '您完成了游戏！',
    playAgain: '再玩一次',
    sound: '音效',
    language: '语言',
    continueGame: '继续上次游戏？',
    yes: '是',
    no: '否',
    leaderboard: '排行榜',
    noScores: '暂无成绩',
    footer: '© 2025 纸牌游戏 · 为纸牌爱好者精心制作 ❤️'
  }
};

export const useTranslation = (language: string) => {
  return (key: string) => {
    const lang = translations[language as keyof typeof translations] || translations.en;
    return lang[key as keyof typeof lang] || key;
  };
};
