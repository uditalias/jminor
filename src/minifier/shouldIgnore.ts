import { isBoolean, isNumber, isString, isObject, isArray } from "../utils";
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

export function shouldIgnoreEmptyObject(key: string, value: any, config: ICompressConfig): boolean {
    return config.object.removeEmpty && isObject(value) && Object.keys(value).length === 0 && !~config.object.exclude.indexOf(key);
}

export function shouldIgnoreEmptyArray(key: string, value: any, config: ICompressConfig): boolean {
    return config.array.removeEmpty && isArray(value) && value.length === 0 && !~config.array.exclude.indexOf(key);
}

export function shouldIgnoreEntry(key: string, value: any, config: ICompressConfig): boolean {
    return (
        shouldIgnorePrimitive(key, value, config) ||
        shouldIgnoreNull(key, value, config) ||
        shouldIgnoreEmptyObject(key, value, config) ||
        shouldIgnoreEmptyArray(key, value, config)
    );
}