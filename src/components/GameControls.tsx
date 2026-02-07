import React from 'react';

interface GameControlsProps {
    moves: number;
    timer: number;
    onReset: () => void;
    gridSize: number;
    onGridSizeChange: (size: number) => void;
    originalImage: string | null;
    onResetToDefault: () => void;
    isPaused: boolean;
    onTogglePause: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ moves, timer, onReset, gridSize, onGridSizeChange, originalImage, onResetToDefault, isPaused, onTogglePause }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-center text-lg font-bold text-gray-700">
                <div>Moves: <span className="text-robot-secondary">{moves}</span></div>
                <div>Time: <span className="text-robot-primary">{formatTime(timer)}</span></div>
            </div>

            <div className="flex gap-2 justify-center">
                {[2, 3, 4, 5].map((size) => (
                    <button
                        key={size}
                        onClick={() => onGridSizeChange(size)}
                        className={`px-4 py-2 rounded-lg font-bold transition-colors ${gridSize === size
                            ? 'bg-robot-primary text-white shadow-md'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {size}x{size}
                    </button>
                ))}
            </div>

            <div className="flex gap-2 justify-center pb-2">
                <button
                    onClick={onResetToDefault}
                    className="text-sm text-robot-primary underline hover:text-robot-secondary font-semibold"
                >
                    Use Default Robot 🤖
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onTogglePause}
                    className={`flex-1 py-3 font-bold rounded-xl transition-colors shadow-md ${isPaused
                        ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {isPaused ? 'Resume ▶' : 'Pause ⏸'}
                </button>
                <button
                    onClick={onReset}
                    className="flex-1 py-3 bg-robot-secondary text-white font-bold rounded-xl hover:bg-blue-400 transition-colors shadow-md"
                >
                    Reset Game
                </button>

                {originalImage && (
                    <div className="relative group">
                        <button className="h-full px-4 bg-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-300 transition-colors">
                            Hint
                        </button>
                        {/* Tooltip Image */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-48 p-2 bg-white rounded-lg shadow-xl border border-gray-200">
                            <img src={originalImage} alt="Original" className="w-full h-auto rounded" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
