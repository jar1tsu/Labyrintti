import { Cell } from "../types";
import { SolveResult } from "./dfs";

export function bfsSolve(maze: Cell[][], entry: Cell, exit: Cell): SolveResult {

    const queue: Cell[] = [entry];
    const visited = new Set<Cell>();
    visited.add(entry);
    const parents = new Map<Cell, Cell>();

    while (queue.length > 0) {
        const current = queue.shift();
        if (!current) continue;
        if (current === exit) {
            const path: Cell[] = [];
            let node = current;

            path.push(node);
            while (parents.has(node)) {
                node = parents.get(node)!;
                path.push(node);
            }
            path.reverse();
            return {
                path: path,
                visited: Array.from(visited),
                steps: visited.size,
            };

        } else {

            const neighbor: Cell[] = [];
            if (!current.walls.top && current.row - 1 >= 0) {
                neighbor.push(maze[current.row - 1][current.col]);
            }
            if (!current.walls.bottom && current.row + 1 < maze.length) {
                neighbor.push(maze[current.row + 1][current.col]);
            }
            if (!current.walls.right && current.col + 1 < maze[0].length) {
                neighbor.push(maze[current.row][current.col + 1]);
            }
            if (!current.walls.left && current.col - 1 >= 0) {
                neighbor.push(maze[current.row][current.col - 1]);
            }

            for (const n of neighbor) {
                if (!visited.has(n)) {
                    visited.add(n);
                    parents.set(n, current);
                    queue.push(n);
                }
            }
        }
    }
    return {
        path: [],
        visited: Array.from(visited),
        steps: visited.size,
    };
}