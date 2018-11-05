'use strict';

import enhanceConfig from "../lib/minifier/enhanceConfig";
import ICompressConfig from "../lib/interfaces/ICompressConfig";

describe('enhanceConfig', () => {

    it('should return default config', () => {

        expect(enhanceConfig({})).toMatchSnapshot();

    });

    it('should extend exclude array', () => {
        expect(enhanceConfig({
            null: {
                removeNull: true,
                exclude: ["first"]
            }
        })).toMatchSnapshot();
    });

});