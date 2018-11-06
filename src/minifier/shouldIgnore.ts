import { isBoolean, isNumber, isString } from "../utils";
import ICompressConfig from "./ICompressConfig";

export function shouldIgnorePrimitive(key: string, value: any, config: ICompressConfig): boolean {
    const { boolean, number, string } = config;

    return (
        (boolean.removeFalse && isBoolean(value) && !value && !~boolean.exclude.indexOf(key)) ||
        (number.removeZero && isNumber(value) && value === 0 && !~number.exclude.indexOf(key)) ||
        (string.removeEmpty && isString(value) && value === "" && !~string.exclude.indexOf(key))
    );
}

export function shouldIgnoreNull(key: string, value: any, config: ICompressConfig): boolean {

    return config.null.removeNull && value === null && !~config.null.exclude.indexOf(key);
}

export function shouldIgnoreEntry(key: string, value: any, config: ICompressConfig): boolean {
    return (
        shouldIgnorePrimitive(key, value, config) ||
        shouldIgnoreNull(key, value, config)
    );
}