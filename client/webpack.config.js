var config = {
   entry: './index.js',

   output: {
      path:'./',
      filename: 'application.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
               presets: ['es2015', 'react']
            }
         },
         {
           test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
         },
         {
           test: /\.(jpe?g|gif|png)$/,
           loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
         }
      ]
   },
   sassLoader: {
    sourceMap: true
    },
}

module.exports = config;
