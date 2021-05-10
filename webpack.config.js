'use strict';
 
const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
 
module.exports = {
   entry: './app.js',
 
   output: {
       library: 'CustomEditor',
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
       libraryTarget: 'var',
       libraryExport: 'default'
   },
 
   module: {
       rules: [
           {
               test: /\.svg$/,
               use: ['raw-loader']
           },
           {
               test: /\.css$/,
               use: [
                   {
                       loader: 'style-loader',
                       options: {
                           injectType: 'singletonStyleTag',
                           attributes: {
                               'data-cke': true
                           }
                       }
                   },
                   {
                       loader: 'postcss-loader',
                       options: styles.getPostCssConfig({
                           themeImporter: {
                               themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                           },
                           minify: true
                       })
                   },
               ]
           }
       ]
   },
 
   mode: 'development',
 
   // Useful for debugging.
   devtool: 'source-map',
 
   // By default webpack logs warnings if the bundle is bigger than 200kb.
   performance: { hints: false }
};