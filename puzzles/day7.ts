import { Coord } from "../utils/Coord.ts";
import { importFile } from "../utils/FileImporter.ts";
import { Grid } from "../utils/Grid.ts";

const input = importFile("./inputs/day7.txt");
const sampleInput = importFile("./inputs/sample7.txt");

const grid: Grid = new Grid().setContentsFromTxt(input);
const sampleGrid = new Grid().setContentsFromTxt(sampleInput);

export function part1(): number {
    let totalSplits = 0;

    const data = grid;

    let currentRowStatus = data.getRow(0);
    let nextRowStatus = data.getRow(1);

    for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
            const currentCell = currentRowStatus[x];
            const belowCell = nextRowStatus[x];

            if (currentCell === 'S') {
                nextRowStatus[x] = '#';
            }
            else if (currentCell === '#') {
                if (belowCell === '^') {
                    totalSplits++;
                    if (x > 0) nextRowStatus[x - 1] = '#';
                    if (x < data.width - 1) nextRowStatus[x + 1] = '#';
                } 
                else { 
                    nextRowStatus[x] = '#';
                }
            }
        }
        currentRowStatus = nextRowStatus;
        nextRowStatus = data.getRow(y + 2);
    }


    return totalSplits;
}

export function part2(): number {
    let totalTimelines = 0;

    const data = sampleGrid;

    let currentRowStatus = data.getRow(0);
    let nextRowStatus = data.getRow(1);

    for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
            const currentCell = currentRowStatus[x];
            const belowCell = nextRowStatus[x];

            if (currentCell === 'S') {
                nextRowStatus[x] = '#';
            }
            else if (currentCell === '#') {
                if (belowCell === '^') {
                    if (x > 0) {
                        nextRowStatus[x - 1] = '#';
                        }
                    if (x < data.width - 1) {
                        nextRowStatus[x + 1] = '#';
                        totalTimelines++;
                    }
                } 
                else { 
                    nextRowStatus[x] = '#';
                }
            }
        }
        currentRowStatus = nextRowStatus;
        nextRowStatus = data.getRow(y + 2);
    }

    return totalTimelines;
}