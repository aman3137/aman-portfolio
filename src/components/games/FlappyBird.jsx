import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play } from 'lucide-react';

const GRAVITY = 0.6;
const JUMP = -8;
const PIPE_SPEED = 3;
const PIPE_WIDTH = 50;
const BIRD_SIZE = 30;
const HOLE_SIZE = 150;
const GAME_WIDTH = 350;
const GAME_HEIGHT = 500;

const FlappyBird = () => {
  const [birdPos, setBirdPos] = useState(250);
  const [birdVel, setBirdVel] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef();

  const jump = useCallback(() => {
    if (!isPlaying && !gameOver) {
      setIsPlaying(true);
    }
    if (isPlaying && !gameOver) {
      setBirdVel(JUMP);
    }
    if (gameOver) {
      // Reset
      setBirdPos(250);
      setBirdVel(0);
      setPipes([]);
      setScore(0);
      setGameOver(false);
      setIsPlaying(true);
    }
  }, [isPlaying, gameOver]);

  // Handle Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setBirdPos((pos) => {
        const newPos = pos + birdVel;
        if (newPos > GAME_HEIGHT - BIRD_SIZE || newPos < 0) {
          setGameOver(true);
          setIsPlaying(false);
        }
        return newPos;
      });
      setBirdVel((vel) => vel + GRAVITY);

      setPipes((currentPipes) => {
        let newPipes = currentPipes
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter((pipe) => pipe.x > -PIPE_WIDTH);

        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
          const topHeight = Math.floor(Math.random() * (GAME_HEIGHT - HOLE_SIZE - 50)) + 20;
          newPipes.push({ x: GAME_WIDTH, topHeight });
        }

        // Collision Check
        const headX = GAME_WIDTH / 2; // Bird fixed horizontal pos
        const headY = birdPos;
        
        for (let pipe of newPipes) {
          // Bird is horizontally inside the pipe
          if (headX + BIRD_SIZE > pipe.x && headX < pipe.x + PIPE_WIDTH) {
            // Bird is hitting top or bottom pipe
            if (headY < pipe.topHeight || headY + BIRD_SIZE > pipe.topHeight + HOLE_SIZE) {
              setGameOver(true);
              setIsPlaying(false);
            }
          }
          // Score increment
          if (pipe.x + PIPE_WIDTH < headX && !pipe.passed) {
            pipe.passed = true;
            setScore(s => s + 1);
          }
        }

        return newPipes;
      });
    }, 24);

    return () => clearInterval(gameLoop);
  }, [birdVel, birdPos, isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        <span className="text-2xl font-black text-slate-800">Score: {score}</span>
      </div>
      
      <div 
        ref={gameRef}
        onClick={jump}
        className="relative bg-sky-300 overflow-hidden shadow-2xl rounded-2xl border-4 border-slate-800 select-none cursor-pointer"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Bird */}
        <div 
          className="absolute bg-yellow-400 rounded-full border-2 border-slate-800 transition-transform duration-75"
          style={{ 
            width: BIRD_SIZE, 
            height: BIRD_SIZE, 
            top: birdPos, 
            left: GAME_WIDTH / 2,
            transform: `rotate(${Math.min(birdVel * 4, 90)}deg)` 
          }}
        >
          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"><div className="absolute top-0.5 right-0 w-1 h-1 bg-black rounded-full" /></div>
          <div className="absolute top-3 right-[-5px] w-3 h-2 bg-orange-500 rounded-full" />
        </div>

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            <div 
              className="absolute bg-emerald-500 border-2 border-slate-800"
              style={{ top: 0, left: pipe.x, width: PIPE_WIDTH, height: pipe.topHeight }}
            >
              <div className="absolute bottom-0 left-[-2px] w-[50px] h-4 bg-emerald-600 border-2 border-slate-800" />
            </div>
            <div 
              className="absolute bg-emerald-500 border-2 border-slate-800"
              style={{ top: pipe.topHeight + HOLE_SIZE, left: pipe.x, width: PIPE_WIDTH, height: GAME_HEIGHT - (pipe.topHeight + HOLE_SIZE) }}
            >
               <div className="absolute top-0 left-[-2px] w-[50px] h-4 bg-emerald-600 border-2 border-slate-800" />
            </div>
          </React.Fragment>
        ))}

        {/* Start / Game Over Screens */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
             <Play size={48} className="text-white mb-4 animate-bounce" />
             <p className="text-white font-bold text-xl px-8 text-center bg-black/50 py-2 rounded-lg">Tap, Click or Space to Fly</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-black text-rose-500 mb-2 drop-shadow-md">GAME OVER</h2>
            <p className="text-white text-xl font-bold mb-6">Score: {score}</p>
            <button className="px-6 py-3 bg-white text-slate-800 font-bold rounded-xl shadow-lg hover:bg-slate-100 transition-colors">
              Play Again
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-slate-500 text-sm">A highly addictive casual game. Works on all devices!</p>
    </div>
  );
};

export default FlappyBird;
