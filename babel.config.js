module.exports = (api) => {
    const isTest = api.env('test');

    return {
        plugins: ['react-hot-loader/babel'],
        presets: [
            [
                '@babel/preset-env',
                isTest ? { targets: { node: 'current' } } : undefined,
            ],
            '@babel/preset-react',
        ],
    };
};
