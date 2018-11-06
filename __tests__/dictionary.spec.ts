'use strict';

import createDictionary from "../lib/dictionary/createDictionary"
import createDefaultKeyGenerator from "../lib/generators/defaultKeyGenerator";
import createNumericKeyGenerator from "../lib/generators/numericKeyGenerator";

describe('defaultKeyGenerator', () => {

    it('should create dictionary', () => {

        const dictionary = createDictionary();

        expect(dictionary).toBeDefined();
    });

    it('should import raw dictionary data', () => {

        const dictionary = createDictionary(createNumericKeyGenerator).import({
            first: "1",
            second: "2"
        });

        expect(dictionary.ctok("1")).toBe("first");
        expect(dictionary.ctok("2")).toBe("second");
    });

    it('should export raw dictionary', () => {

        const dictionary = createDictionary().fromJSON({
            first: 1,
            second: [{
                third: 3
            }],
            fourth: {
                fifth: {
                    sixth: 6,
                    seventh: 7
                },
                eighth: 8
            },
            ninth: 9
        });

        expect(dictionary.export()).toMatchSnapshot();
    });

    it('should extend dictionary with more data', () => {
        const dictionary = createDictionary().import({
            first: "a",
            second: "b"
        });

        dictionary.extendWith({
            second: [{
                third: 3,
                fourth: 4
            }],
            fifth: 5
        });

        expect(dictionary.export()).toMatchSnapshot();
    });

    it('should get ckey for key', () => {
        const dictionary = createDictionary().import({
            first: "a",
            second: "b"
        });

        expect(dictionary.ktoc("first")).toBe("a");
        expect(dictionary.ktoc("third")).toBe("third");
    });

    it('should get key for ckey', () => {
        const dictionary = createDictionary().import({
            first: "a",
            second: "b"
        });

        expect(dictionary.ctok("a")).toBe("first");
        expect(dictionary.ctok("third")).toBe("third");
    });

    it('should set key generator', () => {
        const dictionary = createDictionary();

        dictionary.setKeyGenerator(createDefaultKeyGenerator())
    });

});