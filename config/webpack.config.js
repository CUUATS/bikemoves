var webpackConfig = require('@ionic/app-scripts/config/webpack.config');

webpackConfig.prod.module.noParse = /(mapbox-gl)\.js$/;

module.exports = webpackConfig;
