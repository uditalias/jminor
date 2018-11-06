export default interface IKeyGenerator {
    next(): string;
    setLastKey(key: string): IKeyGenerator;
    sortKeys(keyA: string, keyB: string): number;
}