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

    const comboDigits: string[] = new Array(12).fill('0');
    
    let remainingSlots = 12

    while (remainingSlots > 0) {
        let startIndex = 0;
        for (let i = startIndex; i <= digits.length - remainingSlots; i++) {
            const digit = digits[i]!;
            const bestFound = findHighestInArray(digits.slice(i, digits.length - remainingSlots + 1));
            comboDigits[12 - remainingSlots] = bestFound.highest.toString();
            startIndex = bestFound.index + i + 1;
            i = startIndex - 1;
            remainingSlots--;
            if (remainingSlots === 0) {
                break;
            }
        }
    }

    highestFound = Math.max(highestFound, parseInt(comboDigits.join('')));

    return highestFound;
}

type Result = { highest: number; index: number; }

function findHighestInArray(arr: string[]): Result {
    let highest: number = parseInt(arr[0]!);
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
        if (parseInt(arr[i]!) > highest) {
            highest = parseInt(arr[i]!);
            index = i;
        }
    }

    return { highest, index };
}

export function part2(): number {

    const banks = input;

    let joltage = 0;

    for (const bank of banks) {
        const next = findHighestTwelveDigitCombo(bank);
        joltage += next;
    }

    return joltage;
}

// Part 1: 17330
// Part 2: 171518260283767