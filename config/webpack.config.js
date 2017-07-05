var webpackConfig = require('@ionic/app-scripts/config/webpack.config');

webpackConfig.module.noParse = /(mapbox-gl)\.js$/;

module.exports = webpackConfig;
