import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);

  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const [maxMoves, setMaxMoves] = useState(0);
  const [moves, setMoves] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; // 16
    const pairCount = Math.floor(totalCards / 2); // 8

    const numbers = [...Array(pairCount).keys()].map((num) => num + 1);

    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((num, index) => ({
        id: index,
        num,
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
    setDisabled(false);
    setGameOver(false);
  };

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].num === cards[secondId].num) {
      const newSolved = [...solved, firstId, secondId];
      setSolved(newSolved);
      setFlipped([]);
      setDisabled(false);

      // Check if all cards are solved
      if (newSolved.length === cards.length) {
        setWon(true);
      }
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };
  const handleClick = (id) => {
    if (disabled || gameOver) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      setMoves((prevMoves) => prevMoves + 1);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        setMoves((prevMoves) => prevMoves + 1);
        // check match logic
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);

  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    initializeGame();
  }, [gridSize, maxMoves]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      setGameOver(true);
    } else if (maxMoves > 0 && moves >= maxMoves) {
      setGameOver(true);
    }
  }, [solved, cards, moves, maxMoves]);

  const handleMaxMovesChanges = (e) => {
    const moves = parseInt(e.target.value);
    if (moves >= 0) {
      setMaxMoves(moves);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Memory Game Extended</h1>
      {/* Input */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="gridSize" className="mr-2">
            Grid Size(max:10)
          </label>
          <input
            type="number"
            id="gridSize"
            min="2"
            max="10"
            value={gridSize}
            onChange={handleGridSizeChange}
            className="border-2 border-gray-400 p-2 mb-2 rounded-md w-16"
          />
          <div className="">
            <label htmlFor="maxMoves" className="mr-2">
              Max Moves(0 for unlimited)
            </label>
            <input
              type="number"
              id="maxMoves"
              min="0"
              value={maxMoves}
              onChange={handleMaxMovesChanges}
              className="border-2 border-gray-400 p-2 mb-2 rounded-md w-16"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 text-xl">
        Moves: {moves}
        {moves > 0 ? `/${maxMoves}` : ""}
      </div>

      {/* Game Board */}

      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%, ${gridSize * 100}px)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 
                ${
                  isFlipped(card.id)
                    ? isSolved(card.id)
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-400"
                } ${gameOver ? "pointer-events-none" : ""}`}
              key={card.id}
              onClick={() => handleClick(card.id)}
            >
              {isFlipped(card.id) ? card.num : "?"}
            </div>
          );
        })}
      </div>

      {/* Result */}
      <div className="mt-4">
        {gameOver && (
          <div className="text-2xl font-bold text-emerald-500">
            {won ? "You Win!" : "Game Over!"}
          </div>
        )}
      </div>

      {/* Reset / Play Again Btn */}
      <button
        onClick={initializeGame}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {won ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default MemoryGame;
