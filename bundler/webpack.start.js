const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const portFinderSync = require('portfinder-sync')

const infoColor = (_message) =>
{
	return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = {
	entry: path.resolve(__dirname, '../src/script.js'),
	output:
		{
			hashFunction: 'xxhash64',
			filename: 'bundle.[contenthash].js',
			path: path.resolve(__dirname, '../dist')
		},
	mode: "development",
	devtool: 'source-map',
	plugins:
		[
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../src/index.html')
			})
		],
	module:
		{
			rules: [
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"]
				},

				{
					test: /\.glsl$/,
					use: [
						'webpack-glsl-loader'
					]
				}
			]
		},
	devServer:
		{
			host: 'local-ip',
			port: portFinderSync.getPort(8080),
			open: true,
			https: false,
			allowedHosts: 'all',
			hot: false,
			watchFiles: ['src/**', 'static/**'],
			static:
				{
					watch: true,
					directory: path.join(__dirname, '../static')
				},
			client:
				{
					logging: 'none',
					overlay: true,
					progress: false
				},
			setupMiddlewares: function (middlewares, devServer)
			{
				console.log('------------------------------------------------------------')
				console.log(devServer.options.host)
				const port = devServer.options.port
				const https = devServer.options.https ? 's' : ''
				const domain1 = `http${https}://${devServer.options.host}:${port}`
				const domain2 = `http${https}://localhost:${port}`

				console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)

				return middlewares
			}
		}
}