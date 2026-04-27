import type { Cell } from "./types";

export function createCell(row: number, col: number): Cell {
    return {
        row,
        col,
        walls:{
            top: true,
            right: true,
            bottom: true,
            left: true
        },
        visited: false,
        inMaze : false
        }
    }

export function createMaze(rows: number, cols: number): Cell[][] {
    const maze: Cell[][] = [];
    for (let row = 0; row < rows; row++) {
        const mazeRow: Cell[] = [];
        for (let col = 0; col < cols; col++) {
            mazeRow.push(createCell(row, col));
        }
        maze.push(mazeRow);
    }
    return maze;
}

export function getNeighbors(grid: Cell[][], cell: Cell): Cell[] {
     const directions = [
        {row: -1, col: 0}, // up
        {row: 1, col: 0},  // down
        {row: 0, col: -1}, // left
        {row: 0, col: 1}   // right
    ];

    const neighbors: Cell[] = [];

   for (const direction of directions) {
    const neighborRow = cell.row + direction.row;
    const neighborCol = cell.col + direction.col;

    if ( neighborRow >= 0 && neighborRow < grid.length && neighborCol >= 0 && neighborCol < grid[0].length) {
       neighbors.push(grid[neighborRow][neighborCol]); 

        }
    }
    return neighbors;

}

export function removewall(a: Cell, b: Cell): void {
    const dr = b.row - a.row;
    const dc = b.col - a.col;

    if (dr === 1) {
        a.walls.bottom = false;
        b.walls.top = false
    } else if (dr === -1) {
        a.walls.top = false;
        b.walls.bottom = false;
    } else if (dc === 1) {
        a.walls.right = false;
        b.walls.left = false;
    } else if (dc === -1) {
        a.walls.left = false;
        b.walls.right = false;
    }   
}

export function addEntryExit(maze: Cell[][]) : void {
    const entry = maze[0][0]
    const exit = maze[maze.length -1][maze[0].length - 1]

    entry.walls.left = false;
    exit.walls.right = false;
}

