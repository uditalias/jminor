import createDefaultKeyGenerator from "../generators/defaultKeyGenerator";
import { isArray, isObject, reverse, clone } from "../utils";
import IKeyGenerator from "../generators/IKeyGenerator";

export class Dictionary {
    private _dict: { [index: string]: string };
    private _rdict: { [index: string]: string };

    constructor(private _keyGen: IKeyGenerator) {
        this._dict = {};
        this._rdict = {};
    }

    public replaceKeyGenerator(keyGenerator: IKeyGenerator): Dictionary {
        this._keyGen = keyGenerator;
        this._dict = {};
        this._rdict = {};

        return this;
    }

    public fromJSON(data: any): Dictionary {
        this._generateKeys(data);
        this._rdict = reverse(this._dict);

        return this;
    }

    public extendWith(data: any): Dictionary {
        this._generateKeys(data);
        this._rdict = reverse(this._dict);

        return this;
    }

    public export(): { [index: string]: string } {
        return clone(this._dict);
    }

    public import(rawDictionary: { [index: string]: string }): Dictionary {
        this._dict = clone(rawDictionary);
        this._rdict = reverse(this._dict);

        this._setGeneratorLastKey();

        return this;
    }

    public ktoc(key: string): string {
        return this._dict[key] || key;
    }

    public ctok(ckey: string): string {
        return this._rdict[ckey] || ckey;
    }

    private _setGeneratorLastKey() {
        const ckeys = Object.keys(this._rdict);

        ckeys.sort(this._keyGen.sortKeys);

        this._keyGen.setLastKey(ckeys[ckeys.length - 1]);
    }

    private _generateKeys(obj: any) {
        for (const key in obj) {
            if (!this._dict[key]) {
                this._dict[key] = this._keyGen.next();
            }

            if (isArray(obj[key])) {
                obj[key].forEach((x) => this._generateKeys(x));
            } else if (isObject(obj[key])) {
                this._generateKeys(obj[key]);
            }
        }
    }
}


export default function createDictionary(
    createKeyGenerator: () => IKeyGenerator = createDefaultKeyGenerator
): Dictionary {
    return new Dictionary(createKeyGenerator());
}