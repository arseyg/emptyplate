require('dotenv').config();
var express = require('express');
var path = require('path');
var compression = require('compression');

var api = require('./api');

var app = express();
app.use(compression());

if (process.env.NODE_ENV === 'dev') {
	//build webpack bundle to memory for local development
	//webpackConfig.entry.push('webpack-hot-middleware/client');

	var webpackDevMiddleware = require("webpack-dev-middleware");
	var webpackHotMiddleware = require('webpack-hot-middleware')
	var webpack = require("webpack");
	var webpackConfig = require('./webpack.config.js');
	webpackConfig.output.publicPath = '/js'
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

	var compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: false,
		publicPath: webpackConfig.output.publicPath,
		stats: {
	        colors: true
	    }
	}));
	app.use(webpackHotMiddleware(compiler));
}

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api)

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

var PORT = process.env.PORT || 1337;
app.listen(PORT, function() {
	console.log(process.env.NODE_ENV, ' Express server running at localhost:' + PORT);
});