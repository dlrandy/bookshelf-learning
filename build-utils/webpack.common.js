const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRJ_DIR_NAME = path.resolve(__dirname, '..', './src/FrontEnd');

module.exports = {
    entry: path.join(PRJ_DIR_NAME, 'index.jsx'),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '..', './dist/FrontEnd'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    // 'sass-loader',
                ],
            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|svg)$/,
            //     use: {
            //         loader: 'url-loader',
            //     },
            // },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     loader: 'url-loader',
            //     options: {
            //         name: '[path][name][contenthash].[ext]',
            //         limit: 8192,
            //     },
            // },
        ],
    },
    resolve: {
        alias: {
            '@FE': PRJ_DIR_NAME,
        },
        extensions: [
            '.wasm',
            '.ts',
            '.tsx',
            '.mjs',
            '.cjs',
            '.js',
            '.jsx',
            '.json',
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'hello webpack5',
            template: path.resolve(
                __dirname,
                '..',
                './src/FrontEnd/index.html'
            ),
        }),
    ],
};
