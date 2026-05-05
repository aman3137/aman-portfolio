import React, { useState, useEffect } from 'react';

const EMOJIS = ['🚀', '💻', '🎮', '📱', '🧠', '⚡', '🔥', '🌟'];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const firstCard = cards.find(c => c.id === newFlipped[0]);
      const secondCard = cards.find(c => c.id === newFlipped[1]);

      if (firstCard.emoji === secondCard.emoji) {
        setSolved([...solved, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (solved.length === EMOJIS.length * 2 && cards.length > 0) {
      setGameOver(true);
    }
  }, [solved, cards]);

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full">
      <div className="flex justify-between w-full mb-6 px-4">
        <div className="text-lg font-bold text-slate-700">Moves: {moves}</div>
        <button 
          onClick={initializeGame}
          className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
        >
          Restart Game
        </button>
      </div>

      {gameOver ? (
        <div className="glass p-8 rounded-3xl text-center w-full shadow-2xl animate-in zoom-in duration-500">
          <h2 className="text-4xl font-black text-slate-800 mb-4">You Won! 🎉</h2>
          <p className="text-xl text-slate-600 mb-8">Completed in {moves} moves.</p>
          <button 
            onClick={initializeGame}
            className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:-translate-y-1"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 w-full p-4 bg-slate-100 rounded-3xl shadow-inner">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
            return (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-2xl flex items-center justify-center text-4xl cursor-pointer transition-transform duration-500 transform
                  ${isFlipped ? 'bg-white shadow-md' : 'bg-primary-500 hover:bg-primary-400 shadow-lg'}
                  ${solved.includes(card.id) ? 'opacity-50 scale-95' : ''}
                `}
                style={{ 
                  perspective: '1000px',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <div 
                  className={`transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {card.emoji}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-8 text-slate-500 text-sm text-center">A classic brain-training game. Perfect for mobile and desktop!</p>
    </div>
  );
};

export default MemoryMatch;
