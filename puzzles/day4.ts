import { importFile } from "../utils/FileImporter.ts";
import { Grid } from "../utils/Grid.ts";
import { Coord } from "../utils/Coord.ts";

const input = importFile("./inputs/day4.txt");
const sample = importFile("./inputs/sample4.txt");

function countRolls(arr: string[]): number {
    let count = 0;
    for (const item of arr) {
        if (item === '@') count++;
    }
    return count;
}

export function part1(): number {

    const grid = new Grid(1, 1);
    grid.setContentsFromTxt(input);
    const gridRange = grid.getAllCoords();

    let accessibleRollCount = 0;

    for (const coord of gridRange) {
        if (grid.getValue(coord) !== '@') continue;
        if (countRolls(grid.getNeighborValues(coord)) < 4) {
            accessibleRollCount++;
        }
    }

    return accessibleRollCount;
}

export function part2(): number {
    
    const grid = new Grid(1, 1);
    grid.setContentsFromTxt(input);
    const gridRange = grid.getAllCoords();

    let collectedRolls = 0;
    let iteration = 0;

    while(true) {
        let accessibleRollCount = 0;

        for (const coord of gridRange) {
        if (grid.getValue(coord) !== '@') continue;
        if (countRolls(grid.getNeighborValues(coord)) < 4) {
            accessibleRollCount++;
            grid.setValue(coord, '.');
            }
        }
        collectedRolls += accessibleRollCount;  
        if (accessibleRollCount === 0) return collectedRolls;
        accessibleRollCount = 0;
        iteration++;
    }    
} 

// Day 4, Part 1: 1516
// Day 4, Part 2: 9122