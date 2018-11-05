import { isPrimitive, isArray, isObject } from "../utils";
import ICompressConfig from "../interfaces/ICompressConfig";
import { Dictionary } from "../dictionary/createDictionary";
import enhanceConfig from "./enhanceConfig";
import { shouldIgnoreEntry } from "./shouldIgnore";

function _compress(
    json: any,
    dictionary: Dictionary,
    config: ICompressConfig
): any {
    const res: any = {};

    for (const key in json) {
        const ckey = config.translateKeys ? dictionary.ktoc(key) : key;

        if (shouldIgnoreEntry(key, json[key], config)) {
            continue;
        }

        if (isPrimitive(json[key])) {
            res[ckey] = json[key];
        } else if (isArray(json[key])) {
            res[ckey] = json[key].map((x) => compress(x, dictionary, config));
        } else if (isObject(json[key])) {
            res[ckey] = compress(json[key], dictionary, config);
        } else {
            res[ckey] = json[key];
        }
    }

    return res;
}

export default function compress(
    json: any,
    dictionary: Dictionary,
    config?: ICompressConfig
): any {
    return _compress(json, dictionary, enhanceConfig(config));
}