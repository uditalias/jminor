'use strict';

import { isArray, isBoolean, isNumber, isObject, isString, isPrimitive, reverse, clone, isDefined } from "../lib/utils";

describe('utils', () => {

    describe('isArray', () => {

        it('should return true when passing array', () => {
            expect(isArray([])).toBeTruthy();
        });

        it('should return false when passing object with indexed keys', () => {

            const mock = { 1: "a", 2: "b", 3: "c" };

            expect(isArray(mock)).toBeFalsy();

        });

        it('should return false when passing NodeList', () => {

            const list = document.querySelectorAll("a");

            expect(isArray(list)).toBeFalsy();
        });

    });

    describe('isBoolean', () => {

        it('should return true when using boolean values', () => {

            expect(isBoolean(true)).toBeTruthy();

            expect(isBoolean(false)).toBeTruthy();
        });

        it('should return false when using non boolean values', () => {

            expect(isBoolean(1)).toBeFalsy();

            expect(isBoolean("false")).toBeFalsy();
        });
    });

    describe('isNumber', () => {

        it('should return true when using number values', () => {

            expect(isNumber(0)).toBeTruthy();

            expect(isNumber(123)).toBeTruthy();
        });

        it('should return false when using non number values', () => {

            expect(isNumber(false)).toBeFalsy();

            expect(isNumber("3")).toBeFalsy();

            expect(isNumber({})).toBeFalsy();
        });

    });

    describe('isObject', () => {

        it('should return true when using object values', () => {

            expect(isObject({ a: 1 })).toBeTruthy();
            expect(isObject({})).toBeTruthy();
        });

        it('should return false when using non object values', () => {

            expect(isObject(false)).toBeFalsy();

            expect(isObject("3")).toBeFalsy();

            expect(isObject([])).toBeFalsy();

            expect(isObject(null)).toBeFalsy();

            expect(isObject(undefined)).toBeFalsy();
        });

    });

    describe('isString', () => {

        it('should return true when using string values', () => {

            expect(isString("")).toBeTruthy();

            expect(isString("hello world!")).toBeTruthy();

            expect(isString({}.toString())).toBeTruthy();
        });

        it('should return false when using non string values', () => {

            expect(isString(false)).toBeFalsy();

            expect(isString(3)).toBeFalsy();

            expect(isObject(null)).toBeFalsy();

            expect(isObject(undefined)).toBeFalsy();
        });

    });

    describe('isPrimitive', () => {

        it('should return true when using primitive values', () => {

            expect(isPrimitive("")).toBeTruthy();

            expect(isPrimitive(1)).toBeTruthy();

            expect(isPrimitive(true)).toBeTruthy();
        });

        it('should return false when using non primitive values', () => {

            expect(isPrimitive("")).toBeTruthy();

            expect(isPrimitive(1)).toBeTruthy();

            expect(isPrimitive(true)).toBeTruthy();
        });
    });

    describe('isDefined', () => {

        it('should return true when passing defined values', () => {

            const value = 1;

            expect(isDefined("")).toBeTruthy();

            expect(isDefined(1)).toBeTruthy();

            expect(isDefined(true)).toBeTruthy();

            expect(isDefined(value)).toBeTruthy();
        });

        it('should return false when passing undefined values', () => {

            let a;

            expect(isDefined(a)).toBeFalsy();

            expect(isDefined(undefined)).toBeFalsy();

            expect(isDefined((() => { })())).toBeFalsy();
        });
    });

    describe("reverse", () => {

        it('should reverse object key/values', () => {

            const obj = {
                first: "a",
                second: "b"
            };

            expect(reverse(obj)).toMatchSnapshot();
        });

        it('should return predicate when its not an object', () => {
            const predicate = [1, 2, 3];

            expect(predicate === reverse(predicate)).toBeTruthy();
        })
    });

    describe('clone', () => {

        it('should clone objects', () => {

            const obj = { first: 1, second: 2, third: [{ fourth: 4 }] };

            expect(clone(obj) === obj).toBeFalsy();
        });
    });
});