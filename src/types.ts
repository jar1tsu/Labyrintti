export interface Cell {
    row: number
    col: number
    walls: {
        top: boolean
        right: boolean
        bottom: boolean
        left: boolean
    };
    visited: boolean
    inMaze: boolean
}