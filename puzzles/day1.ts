import { importFile } from "../utils/FileImporter.js";

const input = importFile('./inputs/day1.txt').trim().split('\n').map(convertInputNum);
const sample = importFile('./inputs/sample1.txt').trim().split('\n').map(convertInputNum);

function convertInputNum(str: string): number {
    const firstChar = str.charAt(0);
    if (firstChar === 'R') {
        return parseInt(str.slice(1), 10);
    }
    else if (firstChar === 'L') {
        return -parseInt(str.slice(1), 10);
    }
    throw new Error(`Invalid input string: ${str}`);
}


export function part1(): number {
    let countZero = 0;
    let position = 50;
    
    for (const move of input) {
        position += Math.floor(position + move + 100) % 100 - position;
        if (position === 0) {
            countZero++;
        }
    }
    
    return countZero;
    
}

function countClicks(start: number, turns: number): number {
    let countZero = 0;
    let position = start;

    const direction = turns >= 0 ? 1 : -1;
    const turnsAbs = Math.abs(turns);

    for (let i = 0; i < turnsAbs; i++) {
        position = (position + direction + 100) % 100;
        if (position === 0) {
            countZero++;
        }
    }
    return countZero;
}

export function part2(): number {
    let countZero = 0;
    let position = 50;
    
    for (const move of input) {
        countZero += countClicks(position, move);
        position = (position + move + 100) % 100;
    }
    
    return countZero;
        
}

// part 1: 1154 - correct
// part 2: 6819 - correct