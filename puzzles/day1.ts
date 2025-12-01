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