import { Cell } from "../types";
import { SolveResult } from "./dfs";


export function manhattan(a: Cell, b: Cell): number {

return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astarSolve(maze: Cell[][], entry: Cell, exit: Cell): SolveResult {

    const queue: Cell[] = [entry];
    const visited = new Set<Cell>();
    visited.add(entry);
    const parents = new Map<Cell, Cell>();
    const gScore = new Map<Cell, number>();
    gScore.set(entry, 0);

    while (queue.length > 0) {
        let bestIndex = 0;
        for (let i = 1; i < queue.length; i++) {
            const fBest = (gScore.get(queue[bestIndex]) ?? 0) + manhattan(queue[bestIndex], exit);
            const fCurrent = (gScore.get(queue[i]) ?? 0) + manhattan(queue[i], exit);
            if (fCurrent < fBest) {
                bestIndex = i;
            }
        }
        const current = queue.splice(bestIndex, 1)[0];
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
                    gScore.set(n, (gScore.get(current) ?? 0) +1);
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