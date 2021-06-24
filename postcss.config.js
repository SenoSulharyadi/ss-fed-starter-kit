module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 16,
            unitPrecision: 1,
            propList: ['*', '!border*', '!box-shadow'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i
        }
    }
}