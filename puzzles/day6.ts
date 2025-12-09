import { importFile } from "../utils/FileImporter.ts";

const input = importFile("./inputs/day6.txt");
const sample = importFile("./inputs/sample6.txt");

const data = input.split("\n");
const sampleData = sample.split("\n");

function add(a: number, b: number, c: number, d?: number): number {
    return a + b + c + (d ?? 0);
}

function multiply(a: number, b: number, c: number, d?: number): number {
    return a * b * c * (d ?? 1);
}

export function part1(): number {
    const line1 = data[0]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);
    const line2 = data[1]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);
    const line3 = data[2]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);
    const line4 = data[3]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);
    const operators = data[4]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);

    let total = 0;

    for (let i = 0; i < operators!.length; i++) {
        const op = operators![i];
        const num1 = Number(line1![i]);
        const num2 = Number(line2![i]);
        const num3 = Number(line3![i]);
        const num4 = Number(line4![i]) ?? 0;

        total += op === "+" ? add(num1, num2, num3, num4) : multiply(num1, num2, num3, num4);
    }

    return total;
}

function splitIntoChunks(str: string | undefined, chunkSize: number = 4): string[] {
    if (!str) return [];
    const chunks: string[] = [];
    
    const strArr = str.split('');

    for (let i = 0; i < strArr.length; i += chunkSize + 1) {
        chunks.push(strArr.slice(i, i + chunkSize).join(''));
    }

    return chunks;
}

function processChunks(op: string, line1: string, line2: string, line3: string, line4: string): number {

    const trimmedNum1 = (line1[0]! + line2[0]! + line3[0]! + line4[0]!).replace(/\s/g, '');
    const trimmedNum2 = (line1[1]! + line2[1]! + line3[1]! + line4[1]!).replace(/\s/g, '');
    const trimmedNum3 = (line1[2]! + line2[2]! + line3[2]! + line4[2]!).replace(/\s/g, '');
    const trimmedNum4 = (line1[3]! + line2[3]! + line3[3]! + line4[3]!).replace(/\s/g, '');

    let num1 = parseInt(trimmedNum1) ?? 0;
    let num2 = parseInt(trimmedNum2) ?? 0;
    let num3 = parseInt(trimmedNum3) ?? 0;
    let num4 = parseInt(trimmedNum4) ?? 0;

    if (isNaN(num1)) num1 = 0;
    if (isNaN(num2)) num2 = 0;
    if (isNaN(num3)) num3 = 0;
    if (isNaN(num4)) num4 = 0;

    console.log(`Parsed Numbers: ${num1}, ${num2}, ${num3}, ${num4}`);
    const result = (op === "*") ? multiply(num1, num2, num3, num4) : add(num1, num2, num3, num4);


    return result;
}


export function part2(): number {
    const line1 = splitIntoChunks(data[0], 4);
    const line2 = splitIntoChunks(data[1], 4);
    const line3 = splitIntoChunks(data[2], 4);
    const line4 = splitIntoChunks(data[3], 4);
    const operators = data[4]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);
    let total = 0;

    for (let i = 0; i < operators!.length; i++) {
        if (!line1![i] || !line2![i] || !line3![i] || !line4![i]) continue;
        total += processChunks(operators![i]!, line1![i]!, line2![i]!, line3![i]!, line4![i]!);
    }
    
    return total;
}


// Part 2 - 1699873206852437 (too high)