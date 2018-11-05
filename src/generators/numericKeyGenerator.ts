import IKeyGenerator from "../interfaces/IKeyGenerator";

export class NumericKeyGenerator implements IKeyGenerator {
    private _lastNumber: number;

    public setLastKey(key: string): IKeyGenerator {
        this._lastNumber = Number(key);

        return this;
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