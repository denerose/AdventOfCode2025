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

  getValue(coord: Coord): string | null {
    if (this.isInside(coord)) {
      return this.grid[coord.y]![coord.x] ?? this.defaultValue;
    }
    return null;
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

  setContentsFromTxt(txt: string): void {
    const lines = txt.split('\n');
    if (lines.length === 0) {
      return;
    }
    this.height = Math.max(lines.length, this.height);
    this.width = Math.max(lines[0]!.length, this.width);
    for (let y = 0; y < Math.min(lines.length, this.height); y++) {
      this.setRow(lines[y]!, y);
    }
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