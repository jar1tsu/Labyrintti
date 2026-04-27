import type { Cell } from "./types";

const CELL_SIZE = 20;

export function drawMaze(canvas: HTMLCanvasElement, maze: Cell[][]): void {
    const rows = maze.length;
    const cols = maze[0].length;

    canvas.height = rows * CELL_SIZE;
    canvas.width = cols * CELL_SIZE;

    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    for (const row of maze) {
        for (const cell of row) {
          const x = cell.col * CELL_SIZE;
          const y = cell.row * CELL_SIZE; 

          if (cell.walls.top) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + CELL_SIZE, y);
            ctx.stroke();
          }

          if (cell.walls.right) {
            ctx.beginPath();
            ctx.moveTo(x + CELL_SIZE, y);
            ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
            ctx.stroke();
          }

          if (cell.walls.bottom) {
            ctx.beginPath();
            ctx.moveTo(x, y + CELL_SIZE);
            ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
            ctx.stroke();
          }

          if (cell.walls.left) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + CELL_SIZE);
            ctx.stroke();
          }
        }
    }
}