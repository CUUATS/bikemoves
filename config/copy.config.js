var copyConfig = require('@ionic/app-scripts/config/copy.config');

copyConfig.copyMapboxGL = {
  src: ['{{ROOT}}/node_modules/mapbox-gl/dist/mapbox-gl.css'],
  dest: '{{BUILD}}/mapbox-gl'
};

copyConfig.copyMapboxGLImages = {
  src: ['{{ROOT}}/node_modules/mapbox-gl/dist/svg/*'],
  dest: '{{BUILD}}/mapbox-gl/svg'
};

module.exports = copyConfig;
