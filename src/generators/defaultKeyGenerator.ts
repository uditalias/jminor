import IKeyGenerator from "./IKeyGenerator";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const firstChar = ALPHABET.charAt(0);
const lastChar = ALPHABET.charAt(ALPHABET.length - 1);

function nextChar(char): string {
    return char === lastChar
        ? firstChar
        : ALPHABET.charAt(ALPHABET.indexOf(char) + 1);
}

export class DefaultKeyGenerator implements IKeyGenerator {
    private _lastKey: string;

    public setLastKey(key: string): IKeyGenerator {
        this._lastKey = key;

        return this;
    }

    public sortKeys(keyA: string, keyB: string): number {
        return keyA.length > keyB.length ? 1 : keyA.length < keyB.length ? -1 : keyA > keyB ? 1 : 0;
    }

    public next(): string {
        if (!this._lastKey) {
            return this._lastKey = ALPHABET.charAt(0);
        }

        let parts = this._lastKey.split("");

        const newParts = [];
        let shouldAddChar = true;
        let incrementNextChar = true;

        for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i] === lastChar) {
                newParts.unshift(firstChar);
                incrementNextChar = true;
            } else if (incrementNextChar) {
                newParts.unshift(nextChar(parts[i]));
                shouldAddChar = false;
                incrementNextChar = false;
            } else {
                shouldAddChar = false;
                newParts.unshift(parts[i]);
            }
        }

        if (shouldAddChar) {
            newParts.push(firstChar);
        }

        return this._lastKey = newParts.join("");
    }
}

export default function createDefaultKeyGenerator(): IKeyGenerator {
    return new DefaultKeyGenerator();
}