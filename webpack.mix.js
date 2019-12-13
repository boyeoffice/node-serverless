let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
mix.setPublicPath('public');

mix.js('src/js/app.js', 'public/dist/js/')
   .styles([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'src/css/now-ui-kit.css'
   ], 'public/dist/css/bootstrap.min.css')
   .copyDirectory('node_modules/bootstrap/dist/css/bootstrap.css.map', 'public/dist/css')
   .js('src/js/main.js', 'public/dist/js');
      


    module.exports = {
        // ...
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
          }
        }
      }

