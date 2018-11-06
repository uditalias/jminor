import { isPrimitive, isArray, isObject, isDefined } from "../utils";
import ICompressConfig from "./ICompressConfig";
import { Dictionary } from "../dictionary/createDictionary";
import enhanceConfig from "./enhanceConfig";
import { shouldIgnoreEntry, shouldIgnoreEmptyArray, shouldIgnoreEmptyObject } from "./shouldIgnore";

function _compress(
    json: any,
    dictionary: Dictionary,
    config: ICompressConfig
): any {
    let res: any = {};
    const set = (key, value) => res[key] = value;

    for (const key in json) {

        const ckey = config.translateKeys ? dictionary.ktoc(key) : key;

        if (shouldIgnoreEntry(key, json[key], config)) {
            continue;
        }

        if (isPrimitive(json[key])) {

            set(ckey, json[key]);

        } else if (isArray(json[key])) {

            set(ckey, json[key].map((x, i) => {

                const item = _compress(x, dictionary, config);

                if (!shouldIgnoreEntry(i, item, config)) {
                    return item;
                }

            }).filter(isDefined));

            if (shouldIgnoreEmptyArray(key, res[ckey], config)) {
                delete res[ckey];
            }

        } else if (isObject(json[key])) {

            set(ckey, _compress(json[key], dictionary, config) || {});

            if (shouldIgnoreEmptyObject(key, res[ckey], config)) {
                delete res[ckey];
            }

        } else if (isDefined(json[key])) {

            set(ckey, json[key]);

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