export class Token {
    tokenStr: string;
    constructor(numStr: string) {
        this.tokenStr = numStr;
    }
    addChar(char: string): void {
        this.tokenStr += char;
    }
}