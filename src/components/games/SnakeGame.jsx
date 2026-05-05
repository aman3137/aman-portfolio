import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [leaderboard, setLeaderboard] = useState([]);
  
  const boardRef = useRef(null);

  // Load leaderboard
  useEffect(() => {
    const saved = localStorage.getItem('snakeLeaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  const saveScore = () => {
    if (score === 0) return;
    const name = prompt(`Game Over! Score: ${score}. Enter your name for the leaderboard:`) || 'Anonymous';
    const newLeaderboard = [...leaderboard, { name, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Keep only top 3
    setLeaderboard(newLeaderboard);
    localStorage.setItem('snakeLeaderboard', JSON.stringify(newLeaderboard));
  };

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setIsPlaying(true);
    generateFood();
    boardRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isPlaying) return;
    
    // Prevent default scrolling for arrow keys
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // Check collision with walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setIsPlaying(false);
          saveScore();
          return prevSnake;
        }

        // Check collision with self
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          saveScore();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setSpeed((s) => Math.max(50, s - 5)); // Increase speed
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [isPlaying, gameOver, direction, food, speed, generateFood]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="mb-4 flex justify-between w-full max-w-sm">
          <span className="font-bold text-slate-700">Score: {score}</span>
          <span className="text-slate-500 font-medium">Speed: {Math.floor(1000/speed)}x</span>
        </div>
        
        <div 
          ref={boardRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative bg-slate-900 outline-none rounded-xl overflow-hidden shadow-xl"
          style={{
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '1/1',
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center z-10 flex-col gap-4">
              <p className="text-white text-center px-4 font-medium">Use arrow keys to move. Don't hit the walls or yourself!</p>
              <button 
                onClick={resetGame}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors"
              >
                Start Game
              </button>
            </div>
          )}
          
          {gameOver && (
            <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center z-10 flex-col gap-4">
              <p className="text-white text-2xl font-bold">Game Over!</p>
              <button 
                onClick={resetGame}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}

          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`
                  ${isHead ? 'bg-primary-400' : isSnake ? 'bg-primary-600 rounded-sm' : ''}
                  ${isFood ? 'bg-rose-500 rounded-full scale-75 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : ''}
                `}
              />
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">Click on the board and use Arrow Keys to play.</p>
      </div>

      <div className="w-full md:w-64 glass p-6 rounded-2xl">
        <h4 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">Top 3 Leaderboard</h4>
        {leaderboard.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No scores yet. Be the first!</p>
        ) : (
          <ul className="space-y-3">
            {leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between items-center bg-white/50 p-2 rounded-lg text-sm font-medium">
                <span className="flex items-center gap-2">
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-xs ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-300' : 'bg-amber-600'}`}>
                    {index + 1}
                  </span>
                  {entry.name}
                </span>
                <span className="text-primary-600 font-bold">{entry.score}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
