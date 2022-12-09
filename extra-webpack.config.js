module.exports = {
  module: {
    rules: [
      {
        test   : /\.less$/,
        loader: 'less-loader',
        options: {
          modifyVars: { // modify theme variable
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '15px'
          },
          javascriptEnabled: true
        }
      }
    ]
  }
};