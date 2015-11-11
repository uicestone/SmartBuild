var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    mix.scripts([
        '../../../node_modules/react/dist/react.min.js',
        '../../../node_modules/react-router/umd/ReactRouter.min.js',
        '../../../node_modules/history/umd/History.min.js'
    ], 'public/assets/js/libraries.js');

    mix.browserify('main.js', 'public/assets/js/app.js');

    mix.sass(['common.scss'], 'public/assets/css/common.css');

    mix.styles([
        '../../../public/packages/bootstrap2.3.2/bootstrap/css/bootstrap.min.css',
        '../../../public/packages/bootstrap2.3.2/bootstrap/css/bootstrap-responsive.min.css',
        '../../../public/packages/font-awesome/css/font-awesome.min.css',
        '../../../public/assets/css/common.css'
    ], 'public/assets/css/app.css');

    mix.version(['public/assets/js/libraries.js', 'assets/js/app.js', 'assets/css/app.css']);

    mix.copy('public/packages/font-awesome/fonts', 'public/build/assets/fonts');
    mix.copy('public/packages/bootstrap2.3.2/bootstrap/img', 'public/build/assets/img');

});
