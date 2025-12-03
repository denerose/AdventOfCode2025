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

function isEven(num: number): boolean {
    return num % 2 === 0;
}

function isInvalid(num: number): boolean {
    const numStr = num.toString();
    if (!isEven(numStr.length)) {
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

function countIfInvalid(num: number, callback: (num: number) => boolean) : number {
    return callback(num) ? num : 0;
}

function sumRange(range: range, callback: (num: number) => boolean): number {
    let sum = 0;
    for (let i = range.start; i <= range.end; i++) {
        sum += countIfInvalid(i, callback);
    }
    return sum;
}

export function part1(): number {
    let sumInvalidIds = 0;

    for (const range of input) {
        sumInvalidIds += sumRange(range, isInvalid);
    }

    return sumInvalidIds;
}

function isInvalidV2(num: number): boolean {
    if (isInvalid(num)) {
        return true;
    }

    const charArray = num.toString().split('');

    for (let seqLength = 1; seqLength <= Math.floor(charArray.length / 2); seqLength++) {
        const seen: Map<string, number> = new Map();
        for (let i = 0; i <= charArray.length - seqLength; i++) {
            const seq = charArray.slice(i, i + seqLength).join('');
            seen.set(seq, (seen.get(seq) || 0) + 1);
        }
        for (const count of seen.values()) {
            if (count === 1) {
                return false;
            }
        }
    }
    
    console.log(`Number ${num} is invalid in V2 check.`);
    return true;
}

export function part2(): number {
    let sumInvalidIds = 0;

    for (const range of sample) {
        sumInvalidIds += sumRange(range, isInvalidV2);
    }

    return sumInvalidIds;
}