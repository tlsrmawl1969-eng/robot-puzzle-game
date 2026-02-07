import { useState, useEffect, useCallback } from 'react';
import { shuffleTiles, isSolved, canMove, swapTiles, GRID_SIZE, type TileValue } from './puzzleLogic';

export const usePuzzleGame = (gridSize: number = GRID_SIZE) => {
    const [tiles, setTiles] = useState<TileValue[]>([]);
    const [isGameSolved, setIsGameSolved] = useState(false);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Initialize game
    const startGame = useCallback(() => {
        const newTiles = shuffleTiles(gridSize);
        setTiles(newTiles);
        setIsGameSolved(false);
        setMoves(0);
        setTimer(0);
        setIsPlaying(true);
        setIsPaused(false);
    }, [gridSize]);

    useEffect(() => {
        startGame();
    }, [startGame]);

    // Timer logic
    useEffect(() => {
        let interval: number;
        if (isPlaying && !isGameSolved && !isPaused) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isGameSolved, isPaused]);

    // Handle tile click
    const moveTile = (index: number) => {
        if (isGameSolved || isPaused) return;

        const emptyIndex = tiles.indexOf(gridSize * gridSize - 1);

        if (canMove(index, emptyIndex, gridSize)) {
            const newTiles = swapTiles(tiles, index, emptyIndex);
            setTiles(newTiles);
            setMoves((prev) => prev + 1);

            if (isSolved(newTiles)) {
                setIsGameSolved(true);
                setIsPlaying(false);
            }
        }
    };

    const togglePause = () => {
        if (!isGameSolved && isPlaying) {
            setIsPaused((prev) => !prev);
        }
    };

    return {
        tiles,
        isGameSolved,
        moves,
        timer,
        isPaused,
        moveTile,
        startGame, // Reset function
        togglePause,
        setPaused: setIsPaused,
    };
};
