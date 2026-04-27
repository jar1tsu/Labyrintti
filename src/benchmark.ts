import { recursiveBacktracker } from "./generators/recursiveBacktracker";
import { primsAlgorithm } from "./generators/prims";
import { dfsSolve } from "./solvers/dfs";
import { bfsSolve } from "./solvers/bfs";
import { astarSolve } from "./solvers/astar";
import { addEntryExit } from "./maze";

const sizes = [10, 20, 50, 100];
const generators = [
    { name: "Recursive Backtracker", fn: recursiveBacktracker },
    { name: "Prims", fn: primsAlgorithm },
];

for (const size of sizes) {
    for (const gen of generators) {
        const maze = gen.fn(size, size);
        addEntryExit(maze);
        const entry = maze[0][0];
        const exit = maze[maze.length - 1][maze[0].length - 1];

        console.log(`\n=== ${size}x${size} - ${gen.name} ===`);

        const startDfs = performance.now();
        const dfs = dfsSolve(maze, entry, exit);
        const endDfs = performance.now();
        console.log(`DFS:  polku=${dfs.path.length}, käydyt=${dfs.steps}, aika=${(endDfs - startDfs).toFixed(2)}ms`);

        const startBfs = performance.now();
        const bfs = bfsSolve(maze, entry, exit);
        const endBfs = performance.now();
        console.log(`BFS:  polku=${bfs.path.length}, käydyt=${bfs.steps}, aika=${(endBfs - startBfs).toFixed(2)}ms`);

        const startAstar = performance.now();
        const astar = astarSolve(maze, entry, exit);
        const endAstar = performance.now();
        console.log(`A*:   polku=${astar.path.length}, käydyt=${astar.steps}, aika=${(endAstar - startAstar).toFixed(2)}ms`);
    }
}