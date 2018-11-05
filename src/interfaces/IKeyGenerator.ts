export default interface IKeyGenerator {
    next(): string;
    setLastKey(key: string): IKeyGenerator;
}