/*
 *         (_)_ _  (_)__  ___  ____
 *        / /  ' \/ / _ \/ _ \/ __/
 *     __/ /_/_/_/_/_//_/\___/_/   
 *    |___/                        
 */

import createDictionary from "./dictionary/createDictionary";
import decompress from "./minifier/decompress";
import compress from "./minifier/compress";

import createDefaultKeyGenerator from "./generators/defaultKeyGenerator";
import createNumericKeyGenerator from "./generators/numericKeyGenerator";

export {
    createDefaultKeyGenerator,
    createNumericKeyGenerator,
    createDictionary,
    decompress,
    compress
}