import fs from 'fs';

export function importFile(filePath: string): string {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        throw err;
    }
}