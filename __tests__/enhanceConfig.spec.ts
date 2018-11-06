'use strict';

import enhanceConfig from "../lib/minifier/enhanceConfig";

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