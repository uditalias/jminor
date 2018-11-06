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
        const keyGenerator = createDefaultKeyGenerator().setLastKey("abz");

        expect(keyGenerator.next()).toBe("aca");
    });

    it('should rotate next keys', () => {
        const keyGenerator = createDefaultKeyGenerator().setLastKey("z");

        expect(keyGenerator.next()).toBe("aa");
    });

    it('should push next key', () => {
        const keyGenerator = createDefaultKeyGenerator().setLastKey("zz");

        expect(keyGenerator.next()).toBe("aaa");
    });
});