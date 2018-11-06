export function isNumber(value) {
    return typeof value === "number";
}

export function isBoolean(value) {
    return typeof value === "boolean";
}

export function isString(value) {
    return typeof value === "string";
}

export function isDefined(value) {
    return typeof value !== "undefined";
}

export function isPrimitive(value) {
    return isString(value) || isNumber(value) || isBoolean(value);
}

export function isArray(value) {
    return value instanceof Array;
}

export function isObject(value) {
    return !!value && value.constructor === ({}).constructor;
}

export function reverse(data: any): any {
    if (!isObject(data)) {
        return data;
    }

    return Object.keys(data).reduce((result, key) => {
        result[data[key]] = key;
        return result;
    }, {});
}

export function clone<T=any>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}