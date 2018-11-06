import IKeyGenerator from "./IKeyGenerator";

export class NumericKeyGenerator implements IKeyGenerator {
    private _lastNumber: number;

    public setLastKey(key: string): IKeyGenerator {
        this._lastNumber = Number(key);

        return this;
    }

    public sortKeys(keyA: string, keyB: string): number {
        const n1 = Number(keyA);
        const n2 = Number(keyB);
        
        return n1 > n2 ? 1 : n1 < n2 ? -1 : 0;
    }

    public next(): string {
        if (!this._lastNumber) {
            this._lastNumber = 0;
        }

        return (++this._lastNumber).toString();
    }
}

export default function createNumericKeyGenerator(): IKeyGenerator {
    return new NumericKeyGenerator();
}