
import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../stores/gameStore';

interface CardProps {
  card: CardType;
  isDragging?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ card, isDragging, isSelected, onClick, style }) => {
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'spades': return '♠';
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      default: return '';
    }
  };

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return rank.toString();
    }
  };

  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-black';
  };

  if (!card.faceUp) {
    return (
      <motion.div
        className={`
          w-16 h-24 bg-gradient-to-br from-blue-800 to-blue-900 
          rounded-lg shadow-lg border border-blue-700
          flex items-center justify-center cursor-pointer
          ${isDragging ? 'opacity-50' : ''}
          ${isSelected ? 'ring-2 ring-yellow-400' : ''}
        `}
        style={style}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-8 h-8 bg-blue-600 rounded border border-blue-500 opacity-50" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`
        w-16 h-24 bg-white rounded-lg shadow-lg border border-gray-300
        flex flex-col justify-between p-1 cursor-pointer select-none
        ${isDragging ? 'opacity-50 rotate-3' : ''}
        ${isSelected ? 'ring-2 ring-yellow-400 shadow-xl' : ''}
      `}
      style={style}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`text-xs font-bold ${getSuitColor(card.suit)}`}>
        <div>{getRankDisplay(card.rank)}</div>
        <div>{getSuitSymbol(card.suit)}</div>
      </div>
      
      <div className={`text-2xl ${getSuitColor(card.suit)} self-center`}>
        {getSuitSymbol(card.suit)}
      </div>
      
      <div className={`text-xs font-bold ${getSuitColor(card.suit)} self-end rotate-180`}>
        <div>{getRankDisplay(card.rank)}</div>
        <div>{getSuitSymbol(card.suit)}</div>
      </div>
    </motion.div>
  );
};

export default Card;
