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

const splitter: RegExp = /\s*\d{1,4}\s/g;

function splitNumbers(str: string): number[] {
    // example `123 ` => [1, 2, 3, 0], ` 45 ` => [0, 4, 5, 0]
    const nums: number[] = [];
    for (let i = 0; i < 4; i++) {
        const char = str.charAt(i);
        if (char === " ") {
            nums.push(0);
        } else {
            nums.push(Number(char));
        }
    }
    return nums;
}

export function part2(): number {
    const line1 = sampleData[0]?.match(splitter)!.map(splitNumbers);
    const line2 = sampleData[1]?.match(splitter)!.map(splitNumbers);
    const line3 = sampleData[2]?.match(splitter)!.map(splitNumbers);
    // const line4 = sampleData[3]?.match(splitter)!.map(s => s.trim());
    const operators = sampleData[3]?.split(" ").map(s => s.trim()).filter(s => s.length > 0);

    console.log(line1);
    console.log(line2);
    console.log(line3);
    console.log(operators);

    return 0;
}