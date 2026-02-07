import React from 'react';

interface TileProps {

    value: number; // The value of the tile (original index)
    gridSize: number;
    imageUrl: string | null;
    onClick: () => void;
    isEmpty: boolean;
}

export const Tile: React.FC<TileProps> = ({ value, gridSize, imageUrl, onClick, isEmpty }) => {
    if (isEmpty) {
        return <div className="w-full h-full bg-transparent" />; // Empty slot
    }

    // Calculate position in the original image based on value
    const originalRow = Math.floor(value / gridSize);
    const originalCol = value % gridSize;

    // Calculate percentage for background position
    // Logic: 
    // background-size: 100% * gridSize
    // background-position: -col * 100% , -row * 100% ? No.
    // If gridSize is 3, each tile is 33.33%.
    // position x: (col / (gridSize - 1)) * 100%
    // position y: (row / (gridSize - 1)) * 100%

    const bgX = (originalCol / (gridSize - 1)) * 100;
    const bgY = (originalRow / (gridSize - 1)) * 100;

    return (
        <div
            onClick={onClick}
            className="w-full h-full cursor-pointer border border-white/20 shadow-sm transition-transform active:scale-95 overflow-hidden rounded-lg bg-gray-200"
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: `${bgX}% ${bgY}%`,
            }}
        >
            {!imageUrl && (
                <div className="flex items-center justify-center h-full text-2xl font-bold text-gray-400">
                    {value + 1}
                </div>
            )}
        </div>
    );
};
