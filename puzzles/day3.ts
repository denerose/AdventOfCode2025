import { parse } from "path";
import { importFile } from "../utils/FileImporter.ts";

const sample = importFile('./inputs/sample3.txt').trim().split('\n').map(convertInput);
const input = importFile('./inputs/day3.txt').trim().split('\n').map(convertInput);

function convertInput(str: string): string[] {
    return str.split('');
}

function findHighestCombo(digits: string[]): number {

    if (digits.length < 2) {
        throw new Error('Not a battery bank');
    }

    let highestFound = parseInt((digits[0] ?? '0') + (digits[1] ?? '0'));

    for (let i = 0; i < digits.length; i++) {
        let maxFromHere: number = parseInt(digits[i]!);
        for (let j = i + 1; j < digits.length; j++) {
            const combo = parseInt((digits[i]!) + (digits[j]!), 10);
            if (combo > maxFromHere!) {
                maxFromHere = combo;
            }
        }
        if (maxFromHere! > highestFound) {
            highestFound! = maxFromHere;
        }
    }

    return highestFound;
}

export function part1(): number {

    const banks = input;

    let joltage = 0;

    for (const bank of banks) {
        joltage += findHighestCombo(bank);
    }

    return joltage;
}

export function part2(): number {

    return 0;
}