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

function findHighestTwelveDigitCombo(digits: string[]): number {
    
    if (digits.length < 12) {
        throw new Error('Not a battery bank');
    }

    let highestFound = parseInt(digits.slice(0, 12).join(''))

    for (let i = 0; i <= digits.length - 12; i++) {
        const highestFromHereArray = [digits[i]];

        for (let j = i + 1; j < digits.length; j++) {
            let nextBest = digits[j];
            const visited = [];
            for (let k = j + 1; k < digits.length; k++) {
                if (digits[k]! > nextBest!) {
                    nextBest = digits[k];
                }
                visited.push(k);
            }
            
                if (nextBest!.length === 12) highestFromHereArray.push(nextBest!);
                else {
                    let nextNextBest = digits[j + 1];
                    while (visited.length > 0) {
                        const v = visited.shift()!;
                        if (digits[v]! > nextNextBest!) {
                            nextNextBest = digits[v];
                            j = v + 1;
                        }
                    }
                highestFromHereArray.push(nextNextBest!);
                }
            }

            const combo = parseInt(highestFromHereArray.join(''), 10);
            if (combo > highestFound) {
                highestFound = combo;
         }
    }

    return highestFound;
}

export function part2(): number {

    const banks = sample;

    let joltage = 0;

    for (const bank of banks) {
        const next = findHighestTwelveDigitCombo(bank);
        joltage += next;
        console.log(next);
    }

    return joltage;
}