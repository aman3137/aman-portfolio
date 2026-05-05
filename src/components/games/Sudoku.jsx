import React, { useState, useEffect } from 'react';

// A simple pre-defined puzzle for demonstration (0 = empty)
const PUZZLES = {
  easy: [
    [5,3,0, 0,7,0, 0,0,0],
    [6,0,0, 1,9,5, 0,0,0],
    [0,9,8, 0,0,0, 0,6,0],
    [8,0,0, 0,6,0, 0,0,3],
    [4,0,0, 8,0,3, 0,0,1],
    [7,0,0, 0,2,0, 0,0,6],
    [0,6,0, 0,0,0, 2,8,0],
    [0,0,0, 4,1,9, 0,0,5],
    [0,0,0, 0,8,0, 0,7,9]
  ],
  medium: [
    [0,2,0, 6,0,8, 0,0,0],
    [5,8,0, 0,0,9, 7,0,0],
    [0,0,0, 0,4,0, 0,0,0],
    [3,7,0, 0,0,0, 5,0,0],
    [6,0,0, 0,0,0, 0,0,4],
    [0,0,8, 0,0,0, 0,1,3],
    [0,0,0, 0,2,0, 0,0,0],
    [0,0,9, 8,0,0, 0,3,6],
    [0,0,0, 3,0,6, 0,9,0]
  ]
};

const INITIAL_STATE = JSON.parse(JSON.stringify(PUZZLES.easy));

const Sudoku = () => {
  const [board, setBoard] = useState(INITIAL_STATE);
  const [initialBoard, setInitialBoard] = useState(INITIAL_STATE);
  const [difficulty, setDifficulty] = useState('easy');
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const loadPuzzle = (level) => {
    const puzzle = JSON.parse(JSON.stringify(PUZZLES[level] || PUZZLES.easy));
    setBoard(puzzle);
    setInitialBoard(JSON.parse(JSON.stringify(puzzle)));
    setDifficulty(level);
    setTimer(0);
    setIsPlaying(true);
    setMessage('');
  };

  const handleChange = (r, c, value) => {
    if (!isPlaying) return;
    if (initialBoard[r][c] !== 0) return; // Cannot edit initial numbers

    const val = parseInt(value, 10);
    const newBoard = [...board];
    newBoard[r][c] = isNaN(val) ? 0 : val;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    // Basic validation: check if all cells are filled (0 means empty)
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          setMessage('Puzzle is incomplete.');
          return;
        }
      }
    }
    // Deep validation would go here (rows, cols, 3x3 grids)
    setMessage('Validation complete. (Simplified version)');
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {['easy', 'medium'].map(level => (
            <button
              key={level}
              onClick={() => loadPuzzle(level)}
              className={`px-3 py-1 rounded text-sm font-medium capitalize ${difficulty === level ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="font-mono text-lg font-bold text-slate-700">
          {formatTime(timer)}
        </div>
      </div>

      <div className="grid grid-cols-9 gap-0 mb-6 border-2 border-slate-800 bg-slate-300">
        {board.map((row, r) => (
          row.map((cell, c) => {
            const isInitial = initialBoard[r][c] !== 0;
            const borderBottom = r === 2 || r === 5 ? 'border-b-2 border-slate-800' : 'border-b border-slate-300';
            const borderRight = c === 2 || c === 5 ? 'border-r-2 border-slate-800' : 'border-r border-slate-300';
            
            return (
              <input
                key={`${r}-${c}`}
                type="text"
                maxLength="1"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleChange(r, c, e.target.value)}
                readOnly={isInitial}
                className={`w-full aspect-square text-center text-lg sm:text-xl outline-none ${borderBottom} ${borderRight} ${isInitial ? 'bg-slate-100 font-bold text-slate-800' : 'bg-white text-primary-600 font-medium'} focus:bg-primary-50`}
              />
            );
          })
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className={`text-sm font-semibold ${message.includes('incomplete') ? 'text-amber-600' : 'text-primary-600'}`}>
          {message}
        </p>
        <button
          onClick={checkSolution}
          className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-900 transition-colors"
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
