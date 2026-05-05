import React, { useState, useEffect } from 'react';

const DICTIONARY = [
  { word: "Algorithm", meaning: "A set of rules to be followed in calculations" },
  { word: "Latency", meaning: "The delay before a transfer of data begins" },
  { word: "Polymorphism", meaning: "The condition of occurring in several different forms" },
  { word: "Heuristic", meaning: "A problem-solving approach employing a practical method" },
  { word: "Bandwidth", meaning: "The maximum rate of data transfer across a path" },
  { word: "Deadlock", meaning: "A situation where no progress can be made" },
];

const WordPuzzle = () => {
  const [words, setWords] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const initGame = () => {
    // Select 4 random pairs from dictionary
    const shuffledDict = shuffleArray(DICTIONARY).slice(0, 4);
    setWords(shuffleArray(shuffledDict.map(item => item.word)));
    setMeanings(shuffleArray(shuffledDict.map(item => item.meaning)));
    setMatchedPairs([]);
    setSelectedWord(null);
    setScore(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleWordClick = (word) => {
    if (matchedPairs.includes(word)) return;
    setSelectedWord(word);
  };

  const handleMeaningClick = (meaning) => {
    if (!selectedWord || matchedPairs.includes(meaning)) return;

    const correctPair = DICTIONARY.find(item => item.word === selectedWord && item.meaning === meaning);

    if (correctPair) {
      setMatchedPairs([...matchedPairs, selectedWord, meaning]);
      setScore(s => s + 25);
      setSelectedWord(null);
    } else {
      setSelectedWord(null);
      setScore(s => Math.max(0, s - 5));
    }
  };

  const isGameOver = matchedPairs.length === words.length * 2;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800">Match Word & Meaning</h3>
        <div className="flex gap-4 items-center">
          <span className="font-semibold text-primary-600">Score: {score}</span>
          <button onClick={initGame} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200">
            Shuffle / Reset
          </button>
        </div>
      </div>

      {isGameOver && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-center font-bold">
          Awesome! You matched all pairs with a score of {score}.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Words Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Words</h4>
          {words.map((word) => {
            const isMatched = matchedPairs.includes(word);
            const isSelected = selectedWord === word;
            return (
              <button
                key={word}
                onClick={() => handleWordClick(word)}
                disabled={isMatched}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                  isMatched 
                    ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                    : isSelected 
                      ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-primary-300'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        {/* Meanings Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Meanings</h4>
          {meanings.map((meaning) => {
            const isMatched = matchedPairs.includes(meaning);
            return (
              <button
                key={meaning}
                onClick={() => handleMeaningClick(meaning)}
                disabled={isMatched}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                  isMatched 
                    ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                    : selectedWord 
                      ? 'bg-white border-dashed border-slate-300 text-slate-700 hover:border-primary-400 hover:bg-primary-50 cursor-pointer'
                      : 'bg-white border-slate-200 text-slate-700 cursor-default opacity-80'
                }`}
              >
                {meaning}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordPuzzle;
