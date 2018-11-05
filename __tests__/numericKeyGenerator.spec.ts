'use strict';

import createNumericKeyGenerator, { NumericKeyGenerator } from "../lib/generators/numericKeyGenerator";

describe('numericKeyGenerator', () => {

    it('should create numeric key generator', () => {

        const keyGenerator = createNumericKeyGenerator();

        expect(keyGenerator).toBeDefined();
        expect(keyGenerator instanceof NumericKeyGenerator).toBeTruthy();
    });

    it('should get `1` as the first key', () => {
        const keyGenerator = createNumericKeyGenerator();

        expect(keyGenerator.next()).toBe("1");
    });

    it('should set last key', () => {
        const keyGenerator = createNumericKeyGenerator().setLastKey("20");

        expect(keyGenerator.next()).toBe("21");
    });
});