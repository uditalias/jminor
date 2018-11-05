import { Dictionary } from "../dictionary/createDictionary";
import { isArray, isPrimitive, isObject } from "../utils";

export default function decompress<T=any>(compressed: any, dictionary: Dictionary): T {
    const res = {};

    for (const ckey in compressed) {
        const key = dictionary.ctok(ckey);

        if (isPrimitive(compressed[ckey])) {
            res[key] = compressed[ckey];
        } else if (isArray(compressed[ckey])) {
            res[key] = compressed[ckey].map((x) => decompress(x, dictionary));
        } else if (isObject(compressed)) {
            res[key] = decompress(compressed[ckey], dictionary);
        } else {
            res[key] = compressed[ckey];
        }
    }

    return res as T;
}