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
        return this.end - this.start + 1;
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

export function part2(): number {
    let totalFreshIds = 0;

    return totalFreshIds;
}