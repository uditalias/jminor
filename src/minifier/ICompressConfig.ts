export default interface ICompressConfig {
    translateKeys?: boolean;
    null?: {
        removeNull?: boolean;
        exclude?: string[];
    },
    boolean?: {
        removeFalse?: boolean;
        exclude?: string[];
    },
    string?: {
        removeEmpty?: boolean;
        exclude?: string[];
    },
    number?: {
        removeZero?: boolean;
        exclude?: string[];
    },
    object?: {
        removeEmpty?: boolean;
        exclude?: string[];
    },
    array?: {
        removeEmpty?: boolean;
        exclude?: string[];
    }
}