import React from 'react';
import { Tile } from './Tile';

interface PuzzleBoardProps {
    tiles: number[];
    gridSize: number;
    imageUrl: string | null;
    onTileClick: (index: number) => void;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ tiles, gridSize, imageUrl, onTileClick }) => {
    return (
        <div
            className="grid gap-1 bg-gray-800 p-2 rounded-xl shadow-2xl mx-auto"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                width: 'min(90vw, 500px)',
                aspectRatio: '1/1',
            }}
        >
            {tiles.map((tileValue, index) => {
                const isEmpty = tileValue === gridSize * gridSize - 1;
                return (
                    <Tile
                        key={`${index}-${tileValue}`} // Unique key to force re-render if needed, but index is stable? No, index changes.
                        // Better key: the value is unique.
                        // Actually, we render slots by index (0..N-1).
                        // Inside the slot at `index`, we show the tile with `tileValue`.

                        value={tileValue}
                        gridSize={gridSize}
                        imageUrl={imageUrl}
                        onClick={() => onTileClick(index)}
                        isEmpty={isEmpty}
                    />
                );
            })}
        </div>
    );
};
