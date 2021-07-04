const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
    entry: {
        // Path to file
        main: ['./themes/simple/sass/main.scss']
    },
    output: {
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            // Compile SASS to CSS
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false, // Don't resolve url, https://stackoverflow.com/questions/42575712/webpack-sass-cannot-resolve-images
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            }
        ],
    },
    plugins: [
        // Removed js file
        new FixStyleOnlyEntriesPlugin(),
        // Extract css plugin option
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}