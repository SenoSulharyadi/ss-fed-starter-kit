const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: 'production',
	entry: './src/index.js',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		})
	],

	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					// fallback to style-loader in development
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	}
};