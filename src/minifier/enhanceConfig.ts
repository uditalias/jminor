import ICompressConfig from "../interfaces/ICompressConfig";
import * as merge from "deepmerge";

export default function enhanceConfig(config: ICompressConfig = {}): ICompressConfig {
    const defaults = {
        translateKeys: true,
        null: {
            removeNull: false,
            exclude: []
        },
        boolean: {
            removeFalse: false,
            exclude: []
        },
        string: {
            removeEmpty: false,
            exclude: []
        },
        number: {
            removeZero: false,
            exclude: []
        }
    };

    return merge(defaults, config);
}