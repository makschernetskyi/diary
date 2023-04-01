const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const eslintWebpackPlugin = require("eslint-webpack-plugin");
const { HotModuleReplacementPlugin } = require('webpack');




module.exports = {
	context: path.resolve(__dirname),
	entry: "./src/index.js",
	mode: "development",
	output:{
		filename: "[name]-[fullhash].js",
		path: path.resolve(__dirname, "build", "static"),
		clean: true,
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: path.resolve(__dirname, 'build', 'templates', 'index.html'),
			template: path.resolve(__dirname, 'src', 'index.html'),
			publicPath: '/static/'
		}),
		new HotModuleReplacementPlugin(),
		new eslintWebpackPlugin({
			context: __dirname,
			extensions: ["js", "json"]
		}),
		// new SourceMapDevToolPlugin({
		// 	filename: "react-router-dom.js.map"
		// }),
	],
	module:{
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.js$|\.jsx$/,
				exclude: /node_modules/,
				use:{
					loader: "babel-loader",
					options:{
						presets:[
							"@babel/preset-env",
							"@babel/preset-react"
						]
					}
				}
			},
			{
				test: /\.sass$/,

				use:[
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.css$/,

				use:[
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
				use: "file-loader"
			}
		]
	}
}