'use strict';

import createDefaultKeyGenerator, { DefaultKeyGenerator } from "../lib/generators/defaultKeyGenerator";

describe('defaultKeyGenerator', () => {

    it('should create default key generator', () => {

        const keyGenerator = createDefaultKeyGenerator();

        expect(keyGenerator).toBeDefined();
        expect(keyGenerator instanceof DefaultKeyGenerator).toBeTruthy();
    });

    it('should get `a` as the first key', () => {
        const keyGenerator = createDefaultKeyGenerator();

        expect(keyGenerator.next()).toBe("a");
    });

    it('should set last key', () => {
        const keyGenerator = createDefaultKeyGenerator().setLastKey("abc");

        expect(keyGenerator.next()).toBe("abd");
    });

    it('should rotate next keys', () => {
        const keyGenerator = createDefaultKeyGenerator().setLastKey("z");

        expect(keyGenerator.next()).toBe("aa");
    });
});