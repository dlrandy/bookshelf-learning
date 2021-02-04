const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        // bonjour: "",
        // client: "",
        // compress: "",
        // dev: true,
        // firewall: "",
        // headers: "",
        historyApiFallback: true,
        host: '127.0.0.1',
        hot: true,
        // http2: "",
        // https: "",
        // injectClient: "",
        // injectHot: "",
        liveReload: false,
        // onAfterSetupMiddleware: "",
        // onBeforeSetupMiddleware: "",
        // onListening: "",
        // open: "",
        // openPage: "",
        // overlay: "",
        port: '8080',
        proxy: {
            '/rest': '/',
            '/graphql': '/',
        },
        public: '',
        // setupExitSignals: "",
        static: path.join(__dirname, '..', 'src', 'FrontEnd', 'public'),
        // stdin: "",
        // transportMode: "",
        // useLocalIp: "",
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '..', './.env.development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
};
