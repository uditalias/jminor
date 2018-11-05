'use strict';

import { createDictionary, decompress } from "../lib";

const data = require("./__mocks__/data.json");
const compressed = require("./__mocks__/compressed.json");

describe('decompress', () => {

    let dictionary;
    beforeEach(() => {
        dictionary = createDictionary().fromJSON(data);
    });

    it('should decompress data', () => {

        expect(decompress(compressed, dictionary)).toMatchSnapshot();

    });
});