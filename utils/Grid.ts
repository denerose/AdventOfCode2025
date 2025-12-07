import { Coord } from "./Coord.ts";

const DIRECTIONS = new Map<string, Coord>([
  ['N', new Coord(0, -1)],
  ['NE', new Coord(1, -1)],
  ['E', new Coord(1, 0)],
  ['SE', new Coord(1, 1)],
  ['S', new Coord(0, 1)],
  ['SW', new Coord(-1, 1)],
  ['W', new Coord(-1, 0)],
  ['NW', new Coord(-1, -1)],
]);

export class Grid {
  width: number;
  height: number;
  grid: string[][];
  defaultValue: string;

  constructor(width: number, height: number, defaultValue?: string) {
    this.width = width;
    this.height = height;
    this.defaultValue = defaultValue ?? '.';
    this.grid = Array.from({ length: height }, () => Array(width).fill(this.defaultValue));
  }

  isInside(coord: Coord): boolean {
    return coord.x >= 0 && coord.x < this.width && coord.y >= 0 && coord.y < this.height;
  }

  getValue(coord: Coord): string {
    if (this.isInside(coord)) {
      return this.grid[coord.y]![coord.x] ?? this.defaultValue;
    }
    return 'w';
  }

  setValue(coord: Coord, value: string): void {
    if (this.isInside(coord)) {
      this.grid[coord.y]![coord.x] = value;
    }
  }

  setRow(stringRow: string, rowIndex: number): void {
    if (rowIndex >= 0 && rowIndex < this.height) {
      for (let x = 0; x < Math.min(stringRow.length, this.width); x++) {
        this.grid[rowIndex]![x] = stringRow.charAt(x);
      }
    }
  }

  changeSize(newWidth: number, newHeight: number): void {
    const newGrid: string[][] = Array.from({ length: newHeight }, () => Array(newWidth).fill(this.defaultValue));
    for (let y = 0; y < Math.min(this.height, newHeight); y++) {
      for (let x = 0; x < Math.min(this.width, newWidth); x++) {
        newGrid[y]![x] = this.grid[y]![x] ?? this.defaultValue;
      }
    }
    this.width = newWidth;
    this.height = newHeight;
    this.grid = newGrid;
  }

  setContentsFromTxt(txt: string): void {
    const lines = txt.split('\n');
    if (lines.length === 0) {
      return;
    }
    this.changeSize(lines[0]!.length, lines.length);
    for (let y = 0; y < Math.min(lines.length, this.height); y++) {
      this.setRow(lines[y]!, y);
    }
  }

  getAllCoords(): Coord[] {
    const coords: Coord[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        coords.push(new Coord(x, y));
      }
    }
    return coords;
  }

  getNeighborValues(coord: Coord): string[] {
    const deltas = Array.from(DIRECTIONS.values());
    let values = [];
    for (const delta of deltas) {
      const neighborCoord = new Coord(coord.x + delta.x, coord.y + delta.y);
      const value = this.getValue(neighborCoord);
      if (value !== null) {
        values.push(value);
      }
    }
    return values;
  }

  toString(): string {
    return this.grid.map(row => row.join('')).join('\n');
  }


}