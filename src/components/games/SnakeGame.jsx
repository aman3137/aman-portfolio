import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Maximize, X } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: 0 }; // Start stopped
const INITIAL_SPEED = 150;
const BIN_URL = 'https://jsonblob.com/api/jsonBlob/019e3e93-4a7a-7ba7-8827-ec516a09b1d7';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const boardRef = useRef(null);
  const directionRef = useRef(INITIAL_DIRECTION);
  const nextDirectionQueue = useRef([]);
  const scoreRef = useRef(0);

  useEffect(() => {
    fetch(BIN_URL)
      .then(res => res.json())
      .then(data => {
        if (data && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const saveScore = useCallback(() => {
    const finalScore = scoreRef.current;
    if (finalScore === 0) return;
    const name = prompt(`Game Over! Score: ${finalScore}. Enter your name:`) || 'Anonymous';
    
    // Fetch latest to minimize race conditions, then update
    fetch(BIN_URL)
      .then(res => res.json())
      .then(data => {
        const currentLeaderboard = data.leaderboard || [];
        const newLeaderboard = [...currentLeaderboard, { name, score: finalScore }]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5); // Keep top 5
          
        setLeaderboard(newLeaderboard);
        
        fetch(BIN_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leaderboard: newLeaderboard })
        }).catch(console.error);
      })
      .catch(console.error);
  }, []);

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
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionQueue.current = [];
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
    const lastDir = nextDirectionQueue.current.length > 0 
      ? nextDirectionQueue.current[nextDirectionQueue.current.length - 1] 
      : directionRef.current;
      
    if (lastDir.x === 0 && newDir.x !== 0) {
      nextDirectionQueue.current.push(newDir);
    } else if (lastDir.y === 0 && newDir.y !== 0) {
      nextDirectionQueue.current.push(newDir);
    }
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
      let currentDir = directionRef.current;
      if (nextDirectionQueue.current.length > 0) {
        currentDir = nextDirectionQueue.current.shift();
        directionRef.current = currentDir;
        setDirection(currentDir);
      }

      if (currentDir.x === 0 && currentDir.y === 0) return; // Snake is stopped (brakes/pause)

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

        const handleGameOver = () => {
          setIsPlaying(false);
          // 1 second delay (break) before showing game over state properly and saving score
          setTimeout(() => {
            setGameOver(true);
            saveScore();
          }, 1000);
          return prevSnake;
        };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          return handleGameOver();
        }

        if (prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
          return handleGameOver();
        }

        if (obstacles.some(o => o.x === newHead.x && o.y === newHead.y)) {
          return handleGameOver();
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
    <div className={`flex flex-col md:flex-row gap-8 items-start w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-50 p-6 overflow-y-auto flex-col items-center justify-center' : ''}`}>
      {isFullscreen && (
        <button 
          onClick={() => setIsFullscreen(false)} 
          className="absolute top-4 right-4 text-slate-700 hover:text-rose-600 transition-colors z-20"
          aria-label="Close Fullscreen"
        >
          <X size={28} />
        </button>
      )}

      {/* Game Legend (Left Side) */}
      {!isFullscreen && (
        <div className="w-full md:w-56 glass p-6 rounded-2xl md:order-none order-last">
          <h4 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">Game Key</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-2xl leading-none">🍏</span>
              </div>
              <span className="text-sm font-bold text-slate-700">Food (+10)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center shadow-sm">
                <div className="relative">
                  <span className="text-2xl leading-none">🏔️</span>
                  <span className="absolute -top-1 -right-2 text-[12px] animate-pulse drop-shadow-[0_0_5px_rgba(250,204,21,1)] leading-none z-10">⚡</span>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-700">Danger (Avoid)</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 w-full flex flex-col items-center">
        <div className="mb-4 flex justify-between w-full max-w-sm px-4 items-center">
          <span className="font-bold text-slate-700">Score: {score}</span>
          {!isFullscreen && (
            <button 
              onClick={() => setIsFullscreen(true)} 
              className="text-slate-500 hover:text-primary-600 transition-colors p-1"
              title="Go Fullscreen"
            >
              <Maximize size={20} />
            </button>
          )}
          <span className="text-rose-600 font-bold animate-pulse">Obstacles: {obstacles.length}</span>
        </div>
        
        <div 
          ref={boardRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative outline-none overflow-hidden shadow-2xl"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&w=800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '1/1',
            border: '8px solid #2f2212',
            borderRadius: '16px',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
          }}
        >
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30 flex-col gap-4 rounded-xl">
              <p className="text-white text-center px-4 font-bold text-lg">Python Classic Snake</p>
              <p className="text-white text-center px-4 font-medium text-sm">Press Arrow Keys to start moving!</p>
              <button onClick={resetGame} className="px-6 py-2 bg-black text-white border-2 border-white rounded-none font-bold hover:bg-white hover:text-black transition-colors">
                Play Now
              </button>
            </div>
          )}
          
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30 flex-col gap-4 rounded-xl">
              <p className="text-white text-3xl font-bold font-mono">Game Over</p>
              <p className="text-white font-medium text-xl font-mono">Score: {score}</p>
              <button onClick={resetGame} className="px-6 py-2 bg-white text-black rounded-none border-2 border-white font-bold hover:bg-black hover:text-white transition-colors">
                Play Again
              </button>
            </div>
          )}

          {/* Food */}
          <div 
            className="absolute z-10 animate-bounce flex items-center justify-center"
            style={{
              width: `${100 / GRID_SIZE}%`, height: `${100 / GRID_SIZE}%`,
              left: `${(food.x / GRID_SIZE) * 100}%`, top: `${(food.y / GRID_SIZE) * 100}%`
            }}
          >
            <span className="text-[20px] drop-shadow-md leading-none">🍏</span>
          </div>

          {/* Obstacles */}
          {obstacles.map((obs, i) => (
            <div 
              key={`obs-${i}`}
              className="absolute z-10 flex items-center justify-center"
              style={{
                width: `${100 / GRID_SIZE}%`, height: `${100 / GRID_SIZE}%`,
                left: `${(obs.x / GRID_SIZE) * 100}%`, top: `${(obs.y / GRID_SIZE) * 100}%`
              }}
            >
              <span className="text-[20px] drop-shadow-md leading-none">🏔️</span>
              <span className="absolute top-0 right-0 text-[12px] animate-pulse drop-shadow-[0_0_5px_rgba(250,204,21,1)] leading-none z-10">⚡</span>
            </div>
          ))}

          {/* Snake */}
          {snake.map((segment, i) => {
            const isHead = i === 0;
            let eye1Style = {};
            let eye2Style = {};
            
            if (isHead) {
              let dir = direction.x === 0 && direction.y === 0 ? {x: 0, y: -1} : direction;
              if (dir.x === 1) { 
                  eye1Style = { right: '10%', top: '20%' }; eye2Style = { right: '10%', bottom: '20%' };
              } else if (dir.x === -1) { 
                  eye1Style = { left: '10%', top: '20%' }; eye2Style = { left: '10%', bottom: '20%' };
              } else if (dir.y === 1) { 
                  eye1Style = { bottom: '10%', left: '20%' }; eye2Style = { bottom: '10%', right: '20%' };
              } else { 
                  eye1Style = { top: '10%', left: '20%' }; eye2Style = { top: '10%', right: '20%' };
              }
            }

            return (
              <div
                key={`snake-${i}`}
                className={`absolute p-[1px] ${isHead ? 'z-20' : 'z-10'}`}
                style={{
                  width: `${100 / GRID_SIZE}%`, height: `${100 / GRID_SIZE}%`,
                  left: `${(segment.x / GRID_SIZE) * 100}%`, top: `${(segment.y / GRID_SIZE) * 100}%`,
                  transition: 'left 0.1s linear, top 0.1s linear' // smooth movement
                }}
              >
                <div className="w-full h-full relative" style={{
                  borderRadius: '50%',
                  background: isHead 
                    ? 'radial-gradient(circle at 30% 30%, #4ade80, #14532d)' 
                    : 'radial-gradient(circle at 30% 30%, #22c55e, #14532d)',
                  boxShadow: isHead ? '0 0 10px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  {isHead && (
                    <>
                      <div className="absolute w-[30%] h-[30%] bg-white rounded-full flex items-center justify-center shadow-sm" style={eye1Style}>
                        <div className="w-[50%] h-[50%] bg-black rounded-full" />
                      </div>
                      <div className="absolute w-[30%] h-[30%] bg-white rounded-full flex items-center justify-center shadow-sm" style={eye2Style}>
                        <div className="w-[50%] h-[50%] bg-black rounded-full" />
                      </div>
                    </>
                  )}
                </div>
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
        <h4 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">Top 5 Global Leaderboard 🌍</h4>
        {leaderboard.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No scores yet. Be the first!</p>
        ) : (
          <ul className="space-y-3">
            {leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between items-center bg-white/50 p-2 rounded-lg text-sm font-medium">
                <span className="flex items-center gap-2">
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-xs ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-amber-600' : 'bg-slate-400'}`}>{index + 1}</span>
                  <span className="truncate max-w-[100px]" title={entry.name}>{entry.name}</span>
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
