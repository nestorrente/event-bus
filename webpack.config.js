const webpack = require('webpack');
const path = require('path');

const BUNDLE_HEADER = `
EventBus v1.0.5
https://github.com/nestorrente/event-bus

Released under the MIT License.

Build date: ${new Date().toISOString()}
`.trim();

const commonConfig = {
	entry: './src/index.ts',
	devtool: 'source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: BUNDLE_HEADER
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
	}
};

const standaloneConfig = {
	...commonConfig,
	output: {
		...commonConfig.output,
		filename: 'event-bus.js',
		library: 'EventBus',
		libraryTarget: 'var',
		libraryExport: 'default'
	}
};

const moduleConfig = {
	...commonConfig,
	output: {
		...commonConfig.output,
		filename: 'event-bus.esm.js',
		libraryTarget: 'umd'
	}
};

module.exports = [
	standaloneConfig,
	moduleConfig
];
