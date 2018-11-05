import IKeyGenerator from "../interfaces/IKeyGenerator";

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

    public next(): string {
        if (!this._lastKey) {
            return this._lastKey = ALPHABET.charAt(0);
        }

        let parts = this._lastKey.split("");
        const currLastChar = this._lastKey.charAt(this._lastKey.length - 1);

        if (currLastChar !== lastChar) {
            parts[parts.length - 1] = nextChar(currLastChar);
        } else {
            let shouldAddChar = true;
            parts = parts.map((char) => {
                if (char !== lastChar) {
                    shouldAddChar = false;
                }
                return nextChar(char);
            });

            if (shouldAddChar) {
                parts.push(firstChar);
            }
        }

        this._lastKey = parts.join("");

        return this._lastKey;
    }
}

export default function createDefaultKeyGenerator(): IKeyGenerator {
    return new DefaultKeyGenerator();
}