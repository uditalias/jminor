'use strict';

import createNumericKeyGenerator from "../lib/generators/numericKeyGenerator";
import { createDictionary, compress } from "../lib";

const data = require("./__mocks__/data.json");

describe('compress', () => {

    let dictionary;
    beforeEach(() => {
        dictionary = createDictionary().fromJSON(data);
    });

    it('should compress data', () => {

        const compressed = compress(data, dictionary, {});

        expect(compressed).toMatchSnapshot();

    });

    it('should compress data without false values', () => {

        const compressed = compress(data, dictionary, {
            boolean: {
                removeFalse: true
            }
        });

        expect(compressed).toMatchSnapshot();

    });

    it('should compress data without empty strings', () => {

        const compressed = compress(data, dictionary, {
            string: {
                removeEmpty: true
            }
        });

        expect(compressed).toMatchSnapshot();

    });

    it('should compress data without zero values', () => {

        const compressed = compress(data, dictionary, {
            number: {
                removeZero: true
            }
        });

        expect(compressed).toMatchSnapshot();

    });

    it('should compress data without null values', () => {

        const compressed = compress(data, dictionary, {
            null: {
                removeNull: true
            }
        });

        expect(compressed).toMatchSnapshot();

    });

    it('should not compress data', () => {

        const compressed = compress(data, dictionary, {
            translateKeys: false
        });

        expect(compressed).toMatchSnapshot();

    });

    it('should compress with numeric key generator', () => {

        dictionary = createDictionary(createNumericKeyGenerator).fromJSON(data);;

        const compressed = compress(data, dictionary);

        expect(compressed).toMatchSnapshot();
    });
});