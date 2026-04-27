import { recursiveBacktracker } from "./generators/recursiveBacktracker";
import { primsAlgorithm } from "./generators/prims";
import { dfsSolve } from "./solvers/dfs";
import { bfsSolve } from "./solvers/bfs";
import { astarSolve } from "./solvers/astar";
import { addEntryExit } from "./maze";

//const maze = recursiveBacktracker(20, 20);
const maze = primsAlgorithm(10,10);
addEntryExit(maze);

// Tulosta labyrintti
for (const cell of maze[0]) {
    process.stdout.write(cell.walls.top ? "+--" : "+  ");
}
console.log("+");

for (const row of maze) {
    for (const cell of row) {
        process.stdout.write(cell.walls.left ? "|  " : "   ");
    }
    const lastCell = row[row.length - 1];
    console.log(lastCell.walls.right ? "|" : " ");
    for (const cell of row) {
        process.stdout.write(cell.walls.bottom ? "+--" : "+  ");
    }
    console.log("+");
}

const entry = maze[0][0];
const exit = maze[maze.length - 1][maze[0].length - 1];

// Testaa DFS
const startDfs = performance.now();
const result = dfsSolve(maze, entry, exit);
const endDfs = performance.now();

console.log("\n--- DFS Tulos ---");
console.log("Polun pituus:", result.path.length);
console.log("Käydyt solut:", result.steps);
console.log("Aika:", (endDfs - startDfs).toFixed(2), "ms");
console.log("Polku löytyi:", result.path.length > 0);

// Testaa BFS
const startBfs = performance.now();
const bfsResult = bfsSolve(maze, entry, exit);
const endBfs = performance.now();

console.log("\n--- BFS Tulos ---");
console.log("Polun pituus:", bfsResult.path.length);
console.log("Käydyt solut:", bfsResult.steps);
console.log("Aika:", (endBfs - startBfs).toFixed(2), "ms");
console.log("Polku löytyi:", bfsResult.path.length > 0);

// Testaa A*
const startAstar = performance.now();
const astarResult = astarSolve(maze, entry, exit);
const endAstar = performance.now();

console.log("\n--- A* Tulos ---");
console.log("Polun pituus:", astarResult.path.length);
console.log("Käydyt solut:", astarResult.steps);
console.log("Aika:", (endAstar - startAstar).toFixed(2), "ms");
console.log("Polku löytyi:", astarResult.path.length > 0);