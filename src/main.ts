import { recursiveBacktracker } from "./generators/recursiveBacktracker";
import { primsAlgorithm } from "./generators/prims";
import { drawMaze } from "./renderer";
import { addEntryExit } from "./maze";

const maze = recursiveBacktracker(20, 20);
console.log(maze);
addEntryExit(maze);

const canvas = document.getElementById("maze-canvas") as HTMLCanvasElement;
drawMaze(canvas, maze);

const btnRecursive = document.getElementById("btn-recursive") as HTMLButtonElement;
const btnPrims = document.getElementById("btn-prims") as HTMLButtonElement;

btnRecursive.addEventListener("click", () => {
    const newMaze = recursiveBacktracker(20, 20);
    addEntryExit(newMaze);
    drawMaze(canvas, newMaze);
});

btnPrims.addEventListener("click", () => {
    const newMaze = primsAlgorithm(20, 20);
    addEntryExit(newMaze);
    drawMaze(canvas, newMaze);
});
//const ctx = canvas.getContext("2d")!;
