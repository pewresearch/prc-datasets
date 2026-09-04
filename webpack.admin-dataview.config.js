const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(__dirname, 'src/admin-dataview/index.jsx'),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, 'build/admin-dataview'),
	},
	// This config does not load packages.js, so copy the Presence API alias
	// that @prc/hooks (pulled in via the @prc/components barrel) requires.
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...(defaultConfig.resolve?.alias || {}),
			'@presence-api/src': path.resolve(__dirname, '../presence-api/src'),
		},
	},
	plugins: (defaultConfig.plugins || [])
		.filter(Boolean)
		.filter((plugin) => plugin.constructor.name !== 'CopyPlugin'),
};
