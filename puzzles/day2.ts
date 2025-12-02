import { importFile } from "../utils/FileImporter.js";

const sample = importFile('./inputs/sample2.txt').trim().split(',').map(convertInput);
const input = importFile('./inputs/day2.txt').trim().split(',').map(convertInput);

type range = { start: number; end: number };

function convertInput(str: string): range {
    const [startStr, endStr] = str.split('-');
    if (!startStr || !endStr) {
        throw new Error(`Invalid input string: ${str}`);
    }
    return { start: parseInt(startStr, 10), end: parseInt(endStr, 10) };
}

function isInvalid(num: number): boolean {
    const numStr = num.toString();
    if (numStr.length % 2 !== 0 ) {
        return false;
    }
    const mid = numStr.length / 2;
    const firstHalf = numStr.slice(0, mid);
    const secondHalf = numStr.slice(mid);
    if (firstHalf === secondHalf) {
        return true;
    }
    return false;
}

function countIfInvalid(num: number) : number {
    return isInvalid(num) ? num : 0;
}

function sumRange(range: range): number {
    let sum = 0;
    for (let i = range.start; i <= range.end; i++) {
        sum += countIfInvalid(i);
    }
    return sum;
}

export function part1(): number {
    let sumInvalidIds = 0;

    for (const range of input) {
        sumInvalidIds += sumRange(range);
    }

    return sumInvalidIds;
}

export function part2(): number {
    let sumInvalidIds = 0;

    return sumInvalidIds;
}