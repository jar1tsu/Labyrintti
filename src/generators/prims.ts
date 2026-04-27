import type { Cell } from "../types";
import { createMaze, getNeighbors, removewall } from "../maze";

export function primsAlgorithm(rows: number, cols: number): Cell[][] {
    const maze = createMaze(rows, cols);
    const start = maze[0][0];
    start.inMaze = true;
    start.visited = true;
    const frontier: Cell[] = [];

    const startNeighbors = getNeighbors(maze, start).filter(n => !n.visited);
    for (const n of startNeighbors) {
        n.visited = true;
        frontier.push(n);
    }

    while (frontier.length > 0) {
        const randomIndex = Math.floor(Math.random() * frontier.length);
        const chosen = frontier[randomIndex];

        frontier.splice(randomIndex, 1);
        const inMazeNeighbors = getNeighbors(maze, chosen).filter(neighbor => neighbor.inMaze);

        if (inMazeNeighbors.length > 0) {
            const randomInMaze = inMazeNeighbors[Math.floor(Math.random() * inMazeNeighbors.length)];

            chosen.inMaze = true;
            removewall(randomInMaze, chosen);

            const newNeighbors = getNeighbors(maze, chosen).filter(neighbor => !neighbor.visited);
            for (const n of newNeighbors) {
                n.visited = true;
                frontier.push(n);
            }
        }
    }
    return maze;
}
