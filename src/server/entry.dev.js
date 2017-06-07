const express = require('express');
const webpack = require('webpack');
const path = require('path');
const port = process.env.PORT || 8081;
const config = require('../../webpack.config.dev');
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use(express.static(path.join(__dirname, '../..')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('Application is listening at port 8081');
  }
});
