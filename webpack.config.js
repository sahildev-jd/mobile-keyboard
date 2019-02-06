const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	mode: "development",
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		host: 'localhost',
		port: 3000
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin({
			multiStep: true
		})
	]
};
