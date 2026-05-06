import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [obstacles, setObstacles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [leaderboard, setLeaderboard] = useState([]);
  
  const boardRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('snakeLeaderboard');
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  const saveScore = () => {
    if (score === 0) return;
    const name = prompt(`Game Over! Score: ${score}. Enter your name:`) || 'Anonymous';
    const newLeaderboard = [...leaderboard, { name, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('snakeLeaderboard', JSON.stringify(newLeaderboard));
  };

  const getRandomPos = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const generateFood = useCallback((currentSnake, currentObstacles) => {
    let newFood;
    while (true) {
      newFood = getRandomPos();
      const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      const onObstacle = currentObstacles.some(o => o.x === newFood.x && o.y === newFood.y);
      if (!onSnake && !onObstacle) break;
    }
    setFood(newFood);
  }, [getRandomPos]);

  const generateObstacle = useCallback((currentSnake, currentFood, currentObstacles) => {
    let newObstacle;
    while (true) {
      newObstacle = getRandomPos();
      const onSnake = currentSnake.some(s => s.x === newObstacle.x && s.y === newObstacle.y);
      const onFood = currentFood.x === newObstacle.x && currentFood.y === newObstacle.y;
      const onObstacle = currentObstacles.some(o => o.x === newObstacle.x && o.y === newObstacle.y);
      // Don't spawn too close to head
      const head = currentSnake[0];
      const distToHead = Math.abs(head.x - newObstacle.x) + Math.abs(head.y - newObstacle.y);
      
      if (!onSnake && !onFood && !onObstacle && distToHead > 3) break;
    }
    return newObstacle;
  }, [getRandomPos]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setObstacles([]);
    setGameOver(false);
    setIsPlaying(true);
    generateFood(INITIAL_SNAKE, []);
    boardRef.current?.focus();
  };

  const changeDirection = (newDir) => {
    if (!isPlaying) return;
    setDirection(prev => {
      if (prev.x === 0 && newDir.x !== 0) return newDir;
      if (prev.y === 0 && newDir.y !== 0) return newDir;
      return prev;
    });
  };

  const handleKeyDown = (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === 'ArrowUp') changeDirection({ x: 0, y: -1 });
    if (e.key === 'ArrowDown') changeDirection({ x: 0, y: 1 });
    if (e.key === 'ArrowLeft') changeDirection({ x: -1, y: 0 });
    if (e.key === 'ArrowRight') changeDirection({ x: 1, y: 0 });
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true); setIsPlaying(false); saveScore(); return prevSnake;
        }

        if (prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true); setIsPlaying(false); saveScore(); return prevSnake;
        }

        if (obstacles.some(o => o.x === newHead.x && o.y === newHead.y)) {
          setGameOver(true); setIsPlaying(false); saveScore(); return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setSpeed(s => Math.max(40, s - 8)); // Speed increases rapidly!
          
          // Add a new obstacle every time food is eaten
          setObstacles(prev => {
            const newObs = generateObstacle(newSnake, food, prev);
            const updatedObs = [...prev, newObs];
            // Randomly add a second obstacle sometimes to make it super hard to reach 100
            if (Math.random() > 0.5) {
                updatedObs.push(generateObstacle(newSnake, food, updatedObs));
            }
            return updatedObs;
          });
          
          generateFood(newSnake, obstacles);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [isPlaying, gameOver, direction, food, speed, generateFood, obstacles, generateObstacle]);

  // Touch controls for smartphone
  let touchStartX = 0;
  let touchStartY = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isPlaying) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) changeDirection({ x: 1, y: 0 });
      else if (dx < -30) changeDirection({ x: -1, y: 0 });
    } else {
      if (dy > 30) changeDirection({ x: 0, y: 1 });
      else if (dy < -30) changeDirection({ x: 0, y: -1 });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start w-full">
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="mb-4 flex justify-between w-full max-w-sm px-4">
          <span className="font-bold text-slate-700">Score: {score}</span>
          <span className="text-rose-600 font-bold animate-pulse">Obstacles: {obstacles.length}</span>
        </div>
        
        <div 
          ref={boardRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative bg-emerald-900 outline-none rounded-xl overflow-hidden shadow-2xl border-4 border-emerald-800"
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
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 flex-col gap-4">
              <p className="text-white text-center px-4 font-medium">Swipe on mobile or use Arrow keys. Avoid the rocks!</p>
              <button onClick={resetGame} className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600">
                Start Game
              </button>
            </div>
          )}
          
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 flex-col gap-4">
              <p className="text-white text-2xl font-bold">Game Over!</p>
              <p className="text-rose-400 font-medium text-lg">Score: {score}</p>
              <button onClick={resetGame} className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600">
                Try Again
              </button>
            </div>
          )}

          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const snakeIndex = snake.findIndex(s => s.x === x && s.y === y);
            const isHead = snakeIndex === 0;
            const isBody = snakeIndex > 0;
            const isFood = food.x === x && food.y === y;
            const isObstacle = obstacles.some(o => o.x === x && o.y === y);

            let cellClass = "";
            let innerStyle = {};

            if (isHead) {
              cellClass = "bg-green-400 z-10";
              // Make head rounded based on direction
              if (direction.x === 1) innerStyle = { borderRadius: '0 50% 50% 0' };
              else if (direction.x === -1) innerStyle = { borderRadius: '50% 0 0 50%' };
              else if (direction.y === 1) innerStyle = { borderRadius: '0 0 50% 50%' };
              else if (direction.y === -1) innerStyle = { borderRadius: '50% 50% 0 0' };
            } else if (isBody) {
              // Alternating realistic snake pattern
              cellClass = snakeIndex % 2 === 0 ? "bg-green-600" : "bg-green-700";
              innerStyle = { borderRadius: '4px' };
            } else if (isFood) {
              cellClass = "bg-rose-500 rounded-full scale-75 shadow-[0_0_15px_rgba(244,63,94,1)] animate-bounce";
            } else if (isObstacle) {
              cellClass = "bg-stone-500 rounded-sm scale-90 border-2 border-stone-600 shadow-inner";
            }

            return (
              <div key={i} className="w-full h-full p-[1px]">
                <div className={`w-full h-full ${cellClass}`} style={innerStyle}></div>
              </div>
            );
          })}
        </div>

        {/* Mobile Controls / D-Pad */}
        <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
          <div></div>
          <button onClick={() => changeDirection({x: 0, y: -1})} className="p-4 bg-slate-200 rounded-xl active:bg-slate-300 flex justify-center"><ArrowUp size={24} /></button>
          <div></div>
          <button onClick={() => changeDirection({x: -1, y: 0})} className="p-4 bg-slate-200 rounded-xl active:bg-slate-300 flex justify-center"><ArrowLeft size={24} /></button>
          <button onClick={() => changeDirection({x: 0, y: 1})} className="p-4 bg-slate-200 rounded-xl active:bg-slate-300 flex justify-center"><ArrowDown size={24} /></button>
          <button onClick={() => changeDirection({x: 1, y: 0})} className="p-4 bg-slate-200 rounded-xl active:bg-slate-300 flex justify-center"><ArrowRight size={24} /></button>
        </div>

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
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-xs ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-300' : 'bg-amber-600'}`}>{index + 1}</span>
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
