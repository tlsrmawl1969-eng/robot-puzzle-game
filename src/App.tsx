import { useState } from 'react';
import { usePuzzleGame } from './game/usePuzzleGame';
import { PuzzleBoard } from './components/PuzzleBoard';
import { ImageUploader } from './components/ImageUploader';
import { GameControls } from './components/GameControls';
import './App.css';

import defaultRobot from './assets/default.png';

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [image, setImage] = useState<string | null>(defaultRobot);

  const { tiles, isGameSolved, moves, timer, moveTile, startGame, isPaused, togglePause, setPaused } = usePuzzleGame(gridSize);

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    startGame(); // Restart game with new image (and logic reset)
  };

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    // Hook will automatically restart due to dependency change, but we can force it if needed.
    // Actually, usePuzzleGame's useEffect will trigger startGame when gridSize changes.
  };

  return (
    <div className="min-h-screen bg-background-soft flex flex-col items-center py-12 px-4 font-display text-gray-800">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-robot-primary drop-shadow-sm mb-2">
          Sliding Puzzle
        </h1>
        <p className="text-gray-500">Upload an image and solve the puzzle!</p>
      </header>

      <main className="w-full max-w-4xl flex flex-col gap-8 items-center">
        {/* Top Controls */}
        <GameControls
          moves={moves}
          timer={timer}
          onReset={startGame}
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          originalImage={image}
          onResetToDefault={() => {
            setImage(defaultRobot);
            startGame();
          }}
          isPaused={isPaused}
          onTogglePause={togglePause}
        />

        {/* Game Board or Upload Prompt */}
        <div className="relative">
          <PuzzleBoard
            tiles={tiles}
            gridSize={gridSize}
            imageUrl={image}
            onTileClick={moveTile}
          />

          {isPaused && !isGameSolved && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-[2px]">
              <div className="bg-white px-6 py-3 rounded-full shadow-xl">
                <p className="text-xl font-bold text-gray-500">Game Paused ⏸</p>
              </div>
            </div>
          )}

          {isGameSolved && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-xl backdrop-blur-sm">
              <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform scale-110 transition-transform">
                <h2 className="text-4xl font-bold text-robot-primary mb-4">🎉 Solved!</h2>
                <p className="text-gray-600 mb-6">
                  Great job! You solved the {gridSize}x{gridSize} puzzle<br />
                  in <b>{moves}</b> moves and <b>{timer}</b> seconds.
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-robot-primary text-white font-bold rounded-full hover:bg-green-500 shadow-lg text-lg"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-md">
          <ImageUploader
            onImageUpload={handleImageUpload}
            onDragStatusChange={(isDragging) => {
              if (isDragging) setPaused(true);
              // We don't auto-resume on drag end because the user might have dropped a file (which resets game)
              // or cancelled. If cancelled, they can manually resume. 
              // Actually, if they cancel (drag leave), maybe resume?
              // Let's safe-guard: if drag ends and we are paused, stay paused?
              // User said "time shouldn't pass when replacing".
              // If they drop, startGame is called (resets).
              // If they leave, it just stays paused. That's probably safer/better UX than auto-resuming unexpectedly.
            }}
          />
        </div>
      </main>

      <footer className="mt-12 text-gray-400 text-sm">
        Drag & Drop an image to create your own puzzle!
      </footer>
    </div>
  );
}

export default App;
