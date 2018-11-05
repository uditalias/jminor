/*
 *         (_)_ _  (_)__  ___  ____
 *        / /  ' \/ / _ \/ _ \/ __/
 *     __/ /_/_/_/_/_//_/\___/_/   
 *    |___/                        
 */

import createDictionary from "./dictionary/createDictionary";
import decompress from "./minifier/decompress";
import compress from "./minifier/compress";

import ICompressConfig from "./interfaces/ICompressConfig";
import IKeyGenerator from "./interfaces/IKeyGenerator";

export {
    ICompressConfig,
    IKeyGenerator,
    createDictionary,
    decompress,
    compress
}