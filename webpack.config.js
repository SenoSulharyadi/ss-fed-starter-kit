const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: {
        index: './index.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: './',
        port: 9000,
        hot: true
    },
}