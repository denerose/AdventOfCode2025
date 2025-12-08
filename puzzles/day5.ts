import { importFile } from "../utils/FileImporter.ts";

class Range {
    start: number;
    end: number;

    constructor(rangeStr: string) {
        const [start, end] = rangeStr.split("-").map(Number);
        this.start = start ?? 0;
        this.end = end ?? 0;
    }

    toString(): string {
        return `${this.start}-${this.end}`;
    }

    contains(num: number): boolean {
        return num >= this.start && num <= this.end;
    }

    countInRange(): number {
        return this.end - this.start;
    }

    getAllInRange(): number[] {
        const nums: number[] = [];
        for (let i = this.start; i <= this.end; i++) {
            nums.push(i);
        }
        return nums;
    }
}

const ranges: Range[] = importFile("./inputs/day5-ranges.txt").split("\n").map(line => new Range(line));
const data: number[] = importFile("./inputs/day5-data.txt").split("\n").map(line => parseInt(line));

const sampleRanges: Range[] = importFile("./inputs/sample5-ranges.txt").split("\n").map(line => new Range(line));
const sampleData: number[] = importFile("./inputs/sample5-data.txt").split("\n").map(line => parseInt(line));

export function part1(): number {

    let countFresh = 0;
    for (const num of data) {
        let isFresh = false;
        for (const range of ranges) {
            if (range.contains(num)) {
                isFresh = true;
                break;
            }
        }
        if (isFresh) {
            countFresh++;
        }
    }

    return countFresh;
}

function consolidateRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) {
        return [];
    }

    ranges.sort((a, b) => a.start - b.start);
    const consolidated: Range[] = [];
    let currentRange = ranges[0];

    for (let i = 1; i < ranges.length; i++) {
        const nextRange = ranges[i];
        if (currentRange!.end >= nextRange!.start) {
            currentRange!.end = Math.max(currentRange!.end, nextRange!.end);
        } else {
            consolidated.push(currentRange!);
            currentRange = nextRange;
        }
    }
    consolidated.push(currentRange!);
    return consolidated;
}

export function part2(): number {

    const consolidatedRanges = consolidateRanges(ranges);

    let freshIdsCount = 0;

    for (const range of consolidatedRanges) {
        freshIdsCount += range.countInRange() + 1;
    }

   
    return freshIdsCount;
}

// Day 5, Part 1: 865
// Day 5, Part 2: 352556672963116