const path = require('path');
const webpack = require('webpack');

const config = {
	entry: process.env.NODE_ENV === 'production' ? './src' : ['./src', 'webpack-hot-middleware/client'],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'public', 'js'),
		filename: 'components.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
				exclude: /(node_modules|bower_components)/,
				use: {
	                loader: 'babel-loader',
	                options: {
	                    //presets: ['env', 'react']
	                    presets: ['es2015', 'react'],
	                    plugins: ['transform-object-rest-spread']
	                }
	            }
	        }
		]
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'app', 'src/components/')
		}
	},
	plugins: []
};

module.exports = config;