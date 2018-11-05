const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (config = {
    destDir: "",
    contextPath: ""
}) => {
    const conf = {

        context: config.contextPath,

        target: "web",

        resolve: {
            extensions: [".ts"],
            modules: [config.contextPath, "node_modules"]
        },

        module: {
            rules: [{
                test: /\.ts?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: "../tsconfig.json"
                    }
                }],
                exclude: /node_modules/
            }]
        },

        output: {
            path: config.destDir,
            libraryTarget: 'umd',
        },

        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin([config.destDir], {
                allowExternal: true
            }),
            new webpack.optimize.ModuleConcatenationPlugin()
        ]
    };

    return conf;
}