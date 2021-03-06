'use strict';

import { shouldIgnoreEntry } from "../lib/minifier/shouldIgnore";
import ICompressConfig from "../lib/minifier/ICompressConfig";

describe('shouldIgnoreEntry', () => {

    it('should return false when value is not primitive', () => {

        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", {}, config)).toBeFalsy();
    });

    it('should return true when removeFalse and value is false', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {
                removeFalse: true,
                exclude: []
            },
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", false, config)).toBeTruthy();
    });

    it('should return false when removeFalse and key excluded', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {
                removeFalse: true,
                exclude: ["first"]
            },
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", false, config)).toBeFalsy();
    });

    it('should return false when removeFalse and value is true', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {
                removeFalse: true,
                exclude: []
            },
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", true, config)).toBeFalsy();
    });

    it('should return true when removeEmpty and value is empty string', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {
                removeEmpty: true,
                exclude: []
            },
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", "", config)).toBeTruthy();
    });

    it('should return false when removeEmpty and value is not empty', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {
                removeEmpty: true,
                exclude: []
            },
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", "test", config)).toBeFalsy();
    });

    it('should return false when removeEmpty and key excluded', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {
                removeEmpty: true,
                exclude: ["first"]
            },
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", "", config)).toBeFalsy();
    });

    it('should return true when removeZero and value is 0', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {
                removeZero: true,
                exclude: []
            },
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", 0, config)).toBeTruthy();
    });

    it('should return false when removeZero and key excluded', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {
                removeZero: true,
                exclude: ["first"]
            },
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", 0, config)).toBeFalsy();
    });

    it('should return false when removeZero and value is not 0', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {
                removeZero: true,
                exclude: []
            },
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", 2, config)).toBeFalsy();
    });

    it('should return true when removeNull and value is null', () => {
        const config: ICompressConfig = {
            null: {
                removeNull: true,
                exclude: []
            },
            boolean: {},
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", null, config)).toBeTruthy();
    });

    it('should return false when removeNull and key excluded', () => {
        const config: ICompressConfig = {
            null: {
                removeNull: true,
                exclude: ["first"]
            },
            boolean: {},
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", null, config)).toBeFalsy();
    });

    it('should return false when removeNull and value is not null', () => {
        const config: ICompressConfig = {
            null: {
                removeNull: true,
                exclude: []
            },
            boolean: {},
            string: {},
            number: {},
            object: {},
            array: {}
        };

        expect(shouldIgnoreEntry("first", 0, config)).toBeFalsy();
    });

    it('should return true when removeEmpty and value is empty object', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {},
            object: {
                removeEmpty: true,
                exclude: []
            },
            array: {}
        };

        expect(shouldIgnoreEntry("first", {}, config)).toBeTruthy();
    });

    it('should return false when removeEmpty and key excluded', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {},
            object: {
                removeEmpty: true,
                exclude: ["first"]
            },
            array: {}
        };

        expect(shouldIgnoreEntry("first", {}, config)).toBeFalsy();
    });

    it('should return false when removeEmpty and value is not empty', () => {
        const config: ICompressConfig = {
            null: {},
            boolean: {},
            string: {},
            number: {},
            object: {
                removeEmpty: true,
                exclude: []
            },
            array: {}
        };

        expect(shouldIgnoreEntry("first", { "second": 2 }, config)).toBeFalsy();
    });
});