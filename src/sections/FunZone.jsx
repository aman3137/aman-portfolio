import React, { useState } from 'react';
import Section from '../components/Section';
import SnakeGame from '../components/games/SnakeGame';
import WordPuzzle from '../components/games/WordPuzzle';
import Sudoku from '../components/games/Sudoku';
import { Gamepad2, Brain, Grid3X3 } from 'lucide-react';

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
            onClick={() => setActiveGame('word')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeGame === 'word'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 -translate-y-1'
                : 'bg-white text-slate-600 shadow-sm hover:shadow-md hover:text-blue-600'
            }`}
          >
            <Brain size={20} />
            Word Puzzle
          </button>
          <button
            onClick={() => setActiveGame('sudoku')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeGame === 'sudoku'
                ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/30 -translate-y-1'
                : 'bg-white text-slate-600 shadow-sm hover:shadow-md hover:text-slate-800'
            }`}
          >
            <Grid3X3 size={20} />
            Sudoku
          </button>
        </div>

        <div className="min-h-[500px]">
          {activeGame === 'snake' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Classic Snake</h3>
                <p className="text-slate-500">A highly challenging version. Can you reach 100?</p>
              </div>
              <SnakeGame />
            </div>
          )}
          {activeGame === 'word' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Tech Dictionary Puzzle</h3>
                <p className="text-slate-500">Match the computer science terms with their definitions.</p>
              </div>
              <WordPuzzle />
            </div>
          )}
          {activeGame === 'sudoku' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Sudoku Challenge</h3>
                <p className="text-slate-500">Train your logical thinking.</p>
              </div>
              <Sudoku />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default FunZone;
