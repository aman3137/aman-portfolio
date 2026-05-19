import React, { useState } from 'react';
import Section from '../components/Section';
import SnakeGame from '../components/games/SnakeGame';
import FlappyBird from '../components/games/FlappyBird';
import MemoryMatch from '../components/games/MemoryMatch';
import { Gamepad2, Bird, LayoutGrid } from 'lucide-react';

const FunZone = () => {
  const [activeGame, setActiveGame] = useState('snake');

  return (
    <Section id="fun-zone" title="Fun Zone" className="bg-slate-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveGame('snake')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeGame === 'snake'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 -translate-y-1'
                : 'bg-white text-slate-600 shadow-sm hover:shadow-md hover:text-primary-600'
            }`}
          >
            <Gamepad2 size={20} />
            Snake Game
          </button>
          <button
            onClick={() => setActiveGame('flappy')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeGame === 'flappy'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 -translate-y-1'
                : 'bg-white text-slate-600 shadow-sm hover:shadow-md hover:text-blue-600'
            }`}
          >
            <Bird size={20} />
            Flappy Cube
          </button>
          <button
            onClick={() => setActiveGame('memory')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeGame === 'memory'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 -translate-y-1'
                : 'bg-white text-slate-600 shadow-sm hover:shadow-md hover:text-amber-500'
            }`}
          >
            <LayoutGrid size={20} />
            Memory Match
          </button>
        </div>

        <div className="min-h-[500px]">
          {activeGame === 'snake' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Classic Snake</h3>
                <p className="text-slate-500">A highly challenging version. Can you reach 200?</p>
              </div>
              <SnakeGame />
            </div>
          )}
          {activeGame === 'flappy' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Flappy Cube</h3>
                <p className="text-slate-500">A top-tier smartphone classic. Tap or click to fly!</p>
              </div>
              <FlappyBird />
            </div>
          )}
          {activeGame === 'memory' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Memory Match</h3>
                <p className="text-slate-500">Test your memory in this casual card matching game.</p>
              </div>
              <MemoryMatch />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default FunZone;
