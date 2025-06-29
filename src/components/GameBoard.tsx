
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import Card from './Card';
import { soundManager } from '../utils/soundManager';

const GameBoard: React.FC = () => {
  const {
    cards,
    stockPile,
    moveCards,
    dealCards,
    checkForCompletedSequences,
    soundEnabled
  } = useGameStore();

  const [draggedCard, setDraggedCard] = useState<{
    columnIndex: number;
    cardIndex: number;
    cards: any[];
  } | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dropZone, setDropZone] = useState<number | null>(null);

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedCard) return;
    
    setDragPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
    
    // Find drop zone
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const columnElement = elements.find(el => el.classList.contains('drop-zone'));
    
    if (columnElement) {
      const columnIndex = parseInt(columnElement.getAttribute('data-column') || '-1');
      setDropZone(columnIndex);
    } else {
      setDropZone(null);
    }
  }, [draggedCard, dragOffset]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!draggedCard) return;
    
    if (dropZone !== null && dropZone !== draggedCard.columnIndex) {
      const targetColumn = cards[dropZone];
      const movingCard = draggedCard.cards[0];
      const targetCard = targetColumn[targetColumn.length - 1];
      
      // Check if move is valid
      if (!targetCard || targetCard.rank === movingCard.rank + 1) {
        moveCards(draggedCard.columnIndex, draggedCard.cardIndex, dropZone);
        soundManager.playCardMove();
        setTimeout(() => checkForCompletedSequences(), 100);
      }
    }
    
    setDraggedCard(null);
    setDropZone(null);
    setDragPosition({ x: 0, y: 0 });
  }, [draggedCard, dropZone, cards, moveCards, checkForCompletedSequences]);

  useEffect(() => {
    if (draggedCard) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedCard, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent, columnIndex: number, cardIndex: number) => {
    e.preventDefault();
    
    const column = cards[columnIndex];
    const card = column[cardIndex];
    
    if (!card.faceUp) return;
    
    // Check if we can drag this sequence
    const cardsToMove = column.slice(cardIndex);
    const isValidSequence = cardsToMove.every((c, i) => {
      if (i === 0) return true;
      const prevCard = cardsToMove[i - 1];
      return c.suit === prevCard.suit && c.rank === prevCard.rank - 1;
    });
    
    if (!isValidSequence) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setDragPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    
    setDraggedCard({
      columnIndex,
      cardIndex,
      cards: cardsToMove
    });
    
    soundManager.playCardMove();
  };

  const handleDealCards = () => {
    if (stockPile.length >= 10 && !cards.some(col => col.length === 0)) {
      dealCards();
      soundManager.playCardDeal();
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-800 to-green-900 overflow-hidden">
      {/* Stock pile */}
      <div className="absolute top-4 left-4">
        <div 
          className={`
            w-16 h-24 rounded-lg border-2 border-dashed border-green-400
            flex items-center justify-center cursor-pointer
            ${stockPile.length >= 10 && !cards.some(col => col.length === 0) 
              ? 'bg-green-600 hover:bg-green-500' 
              : 'bg-green-700 opacity-50'
            }
          `}
          onClick={handleDealCards}
        >
          <div className="text-white text-xs text-center">
            <div>{stockPile.length}</div>
            <div>Deal</div>
          </div>
        </div>
      </div>

      {/* Card columns */}
      <div className="flex gap-4 mt-32 ml-4">
        {cards.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`
              relative min-h-96 w-20
              drop-zone rounded-lg
              ${dropZone === columnIndex ? 'bg-green-600 bg-opacity-50' : ''}
            `}
            data-column={columnIndex}
          >
            {/* Empty column indicator */}
            {column.length === 0 && (
              <div className="absolute inset-0 border-2 border-dashed border-green-400 rounded-lg opacity-30" />
            )}
            
            {/* Cards in column */}
            <AnimatePresence>
              {column.map((card, cardIndex) => {
                const isDragged = draggedCard && 
                  draggedCard.columnIndex === columnIndex && 
                  cardIndex >= draggedCard.cardIndex;
                
                if (isDragged) return null; // Don't render dragged cards in their original position
                
                return (
                  <motion.div
                    key={card.id}
                    className="absolute"
                    style={{
                      top: cardIndex * 20,
                      zIndex: cardIndex,
                      left: 0
                    }}
                    layout
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      card={card}
                      isDragging={false}
                      onClick={() => {
                        if (card.faceUp && !draggedCard) {
                          // Auto-move logic could go here
                        }
                      }}
                      style={{
                        cursor: card.faceUp ? 'grab' : 'default'
                      }}
                    />
                    
                    {/* Drag handle */}
                    {card.faceUp && (
                      <div
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleMouseDown(e, columnIndex, cardIndex)}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Dragged cards */}
      {draggedCard && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{
            left: dragPosition.x,
            top: dragPosition.y
          }}
        >
          {draggedCard.cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="absolute"
              style={{
                top: index * 20,
                left: 0
              }}
              initial={{ scale: 1.1, rotate: 5 }}
              animate={{ scale: 1.1, rotate: 5 }}
            >
              <Card card={card} isDragging={true} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
