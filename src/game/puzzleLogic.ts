export const GRID_SIZE = 3; // Default 3x3

// Checks if the puzzle is solvable
// For odd grid sizes: solvable if inversions is even.
// For even grid sizes:
// - If empty is on an even row from bottom (1-indexed), solvable if inversions is odd.
// - If empty is on an odd row from bottom, solvable if inversions is even.
// Our logical representation: 1D array. 0 represents empty space? Or null?
// Let's use numbers 0 to (SIZE*SIZE - 1). The last number (SIZE*SIZE - 1) is the empty tile usually,
// or we can use `null` or `-1` for empty.
// Let's use numbers 0..N-1. (N = total tiles). The number (N-1) is the "empty" slot visually?
// Actually simpler: 0..N-2 are images, N-1 is empty.
// Let's use `number[]`. The value at index i represents the original position of the tile.
// The value (SIZE*SIZE - 1) is the empty tile.

export type TileValue = number;

export const isSolvable = (tiles: TileValue[], gridSize: number): boolean => {
    let inversions = 0;
    const emptyValue = gridSize * gridSize - 1;

    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === emptyValue) continue;
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[j] === emptyValue) continue;
            if (tiles[i] > tiles[j]) inversions++;
        }
    }

    if (gridSize % 2 !== 0) {
        return inversions % 2 === 0;
    } else {
        // Even grid size
        const emptyIndex = tiles.indexOf(emptyValue);
        const rowFromBottom = gridSize - Math.floor(emptyIndex / gridSize);

        if (rowFromBottom % 2 === 0) {
            return inversions % 2 !== 0;
        } else {
            return inversions % 2 === 0;
        }
    }
};

export const shuffleTiles = (gridSize: number): TileValue[] => {
    const totalTiles = gridSize * gridSize;
    let tiles = Array.from({ length: totalTiles }, (_, i) => i);

    do {
        // Fisher-Yates shuffle
        for (let i = totalTiles - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    } while (!isSolvable(tiles, gridSize) || isSolved(tiles)); // Ensure solvable and not already solved

    return tiles;
};

export const isSolved = (tiles: TileValue[]): boolean => {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== i) return false;
    }
    return true;
};

export const canMove = (index: number, emptyIndex: number, gridSize: number): boolean => {
    // Check if adjacent (up, down, left, right)
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    return (
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
};

export const swapTiles = (tiles: TileValue[], index1: number, index2: number): TileValue[] => {
    const newTiles = [...tiles];
    [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
    return newTiles;
};
