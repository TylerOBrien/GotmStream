module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                extensions: ['.js', '.ts', '.json'],
                alias: {
                    '~': './app',
                    '@config': './config',
                    '@system': './system',
                }
            }
        ],
    ],
};
