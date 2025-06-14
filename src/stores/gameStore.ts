
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Card {
  id: string;
  suit: 'spades' | 'hearts' | 'diamonds' | 'clubs';
  rank: number; // 1-13 (Ace to King)
  faceUp: boolean;
  stackIndex?: number;
}

export interface GameState {
  cards: Card[][];
  stockPile: Card[];
  completedSequences: Card[][];
  score: number;
  moves: number;
  time: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
  difficulty: 1 | 2 | 4;
  soundEnabled: boolean;
  language: string;
  history: Card[][][];
  historyIndex: number;
}

export interface GameActions {
  initializeGame: (difficulty: 1 | 2 | 4) => void;
  moveCards: (fromColumn: number, cardIndex: number, toColumn: number) => void;
  dealCards: () => void;
  undoMove: () => void;
  redoMove: () => void;
  resetGame: () => void;
  updateScore: (points: number) => void;
  incrementTime: () => void;
  toggleSound: () => void;
  setLanguage: (lang: string) => void;
  checkForCompletedSequences: () => void;
  saveGameState: () => void;
  loadGameState: () => void;
}

const createDeck = (difficulty: 1 | 2 | 4): Card[] => {
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const deck: Card[] = [];
  
  // Create cards based on difficulty
  const suitsToUse = suits.slice(0, difficulty);
  const decksNeeded = Math.ceil(104 / (13 * difficulty));
  
  for (let d = 0; d < decksNeeded; d++) {
    for (const suit of suitsToUse) {
      for (let rank = 1; rank <= 13; rank++) {
        deck.push({
          id: `${suit}-${rank}-${d}`,
          suit: suit as Card['suit'],
          rank,
          faceUp: false
        });
      }
    }
  }
  
  // Shuffle deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
};

const initialState: GameState = {
  cards: Array(10).fill(null).map(() => []),
  stockPile: [],
  completedSequences: [],
  score: 500,
  moves: 0,
  time: 0,
  isGameStarted: false,
  isGameComplete: false,
  difficulty: 1,
  soundEnabled: true,
  language: 'en',
  history: [],
  historyIndex: -1
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      initializeGame: (difficulty) => {
        const deck = createDeck(difficulty);
        const newCards: Card[][] = Array(10).fill(null).map(() => []);
        
        // Deal initial cards (54 cards)
        let cardIndex = 0;
        
        // First 4 columns get 6 cards, last 6 columns get 5 cards
        for (let col = 0; col < 10; col++) {
          const cardsInColumn = col < 4 ? 6 : 5;
          for (let row = 0; row < cardsInColumn; row++) {
            const card = deck[cardIndex++];
            if (row === cardsInColumn - 1) {
              card.faceUp = true; // Top card is face up
            }
            newCards[col].push(card);
          }
        }
        
        const stockPile = deck.slice(cardIndex);
        
        set({
          cards: newCards,
          stockPile,
          difficulty,
          isGameStarted: true,
          isGameComplete: false,
          score: 500,
          moves: 0,
          time: 0,
          completedSequences: [],
          history: [newCards.map(col => [...col])],
          historyIndex: 0
        });
      },
      
      moveCards: (fromColumn, cardIndex, toColumn) => {
        const state = get();
        const newCards = state.cards.map(col => [...col]);
        const fromCol = newCards[fromColumn];
        const toCol = newCards[toColumn];
        
        // Get cards to move
        const cardsToMove = fromCol.slice(cardIndex);
        
        // Validate move
        if (cardsToMove.length === 0) return;
        
        const topCard = cardsToMove[0];
        const targetCard = toCol[toCol.length - 1];
        
        // Check if move is valid
        if (targetCard && targetCard.rank !== topCard.rank + 1) {
          return; // Invalid move
        }
        
        // Move cards
        newCards[fromColumn] = fromCol.slice(0, cardIndex);
        newCards[toColumn] = [...toCol, ...cardsToMove];
        
        // Flip top card in source column if needed
        if (newCards[fromColumn].length > 0) {
          const topSourceCard = newCards[fromColumn][newCards[fromColumn].length - 1];
          if (!topSourceCard.faceUp) {
            topSourceCard.faceUp = true;
          }
        }
        
        // Update history
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(newCards.map(col => [...col]));
        
        set({
          cards: newCards,
          moves: state.moves + 1,
          history: newHistory,
          historyIndex: newHistory.length - 1
        });
        
        // Check for completed sequences
        get().checkForCompletedSequences();
      },
      
      dealCards: () => {
        const state = get();
        if (state.stockPile.length < 10) return;
        
        const newCards = state.cards.map(col => [...col]);
        const newStockPile = [...state.stockPile];
        
        // Deal one card to each column
        for (let i = 0; i < 10; i++) {
          const card = newStockPile.pop();
          if (card) {
            card.faceUp = true;
            newCards[i].push(card);
          }
        }
        
        set({
          cards: newCards,
          stockPile: newStockPile,
          moves: state.moves + 1
        });
      },
      
      checkForCompletedSequences: () => {
        const state = get();
        const newCards = state.cards.map(col => [...col]);
        const newCompletedSequences = [...state.completedSequences];
        let sequencesFound = false;
        
        for (let colIndex = 0; colIndex < newCards.length; colIndex++) {
          const column = newCards[colIndex];
          if (column.length < 13) continue;
          
          // Check for complete sequence (King to Ace, same suit)
          for (let i = column.length - 13; i >= 0; i--) {
            const sequence = column.slice(i, i + 13);
            if (sequence.length === 13 &&
                sequence[0].rank === 13 && // King
                sequence[12].rank === 1 && // Ace
                sequence.every((card, idx) => 
                  card.suit === sequence[0].suit && 
                  card.rank === 13 - idx &&
                  card.faceUp
                )) {
              // Remove completed sequence
              newCards[colIndex] = [...column.slice(0, i), ...column.slice(i + 13)];
              newCompletedSequences.push(sequence);
              sequencesFound = true;
              
              // Flip top card if needed
              if (newCards[colIndex].length > 0) {
                const topCard = newCards[colIndex][newCards[colIndex].length - 1];
                if (!topCard.faceUp) {
                  topCard.faceUp = true;
                }
              }
              break;
            }
          }
        }
        
        if (sequencesFound) {
          const isComplete = newCompletedSequences.length === 8;
          set({
            cards: newCards,
            completedSequences: newCompletedSequences,
            score: state.score + 100,
            isGameComplete: isComplete
          });
        }
      },
      
      undoMove: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const previousState = state.history[state.historyIndex - 1];
          set({
            cards: previousState.map(col => [...col]),
            historyIndex: state.historyIndex - 1
          });
        }
      },
      
      redoMove: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const nextState = state.history[state.historyIndex + 1];
          set({
            cards: nextState.map(col => [...col]),
            historyIndex: state.historyIndex + 1
          });
        }
      },
      
      resetGame: () => {
        set(initialState);
      },
      
      updateScore: (points) => {
        set(state => ({ score: Math.max(0, state.score + points) }));
      },
      
      incrementTime: () => {
        set(state => ({ time: state.time + 1 }));
      },
      
      toggleSound: () => {
        set(state => ({ soundEnabled: !state.soundEnabled }));
      },
      
      setLanguage: (lang) => {
        set({ language: lang });
      },
      
      saveGameState: () => {
        // Automatically handled by persist middleware
      },
      
      loadGameState: () => {
        // Automatically handled by persist middleware
      }
    }),
    {
      name: 'spider-solitaire-game',
      partialize: (state) => ({
        cards: state.cards,
        stockPile: state.stockPile,
        completedSequences: state.completedSequences,
        score: state.score,
        moves: state.moves,
        time: state.time,
        isGameStarted: state.isGameStarted,
        difficulty: state.difficulty,
        soundEnabled: state.soundEnabled,
        language: state.language
      })
    }
  )
);
