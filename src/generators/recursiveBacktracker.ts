import type { Cell } from "../types";
import { createMaze, getNeighbors, removewall } from "../maze";

export function recursiveBacktracker(rows: number, cols: number): Cell[][] {
    const maze = createMaze(rows, cols);
    const stack: Cell[] = [];
    const start = maze[0][0];
    start.visited = true;
    stack.push(start);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbors = getNeighbors(maze, current).filter(neighbor => !neighbor.visited);

        if (neighbors.length > 0) {
            const randomIndex = Math.floor(Math.random() * neighbors.length);
            const chosen = neighbors[randomIndex];

            chosen.visited = true
            removewall(current, chosen);
            stack.push(chosen);

        } else {
            stack.pop();
        } 
    }
    return maze;

}
