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


var config = elixir.config;

// Add browserify transformer
config.js.browserify.transformers.push({
    name: 'vueify',
    options: {}
});

elixir(function(mix) {

    // 编译前台JS
    mix.browserify('main.jsx', 'public/assets/js/app.js', undefined, {
        extensions: ['jsx','js','json'],
        basedir: './'
    });

    // 打包前台CSS
    mix.sass(['common.scss'], 'public/assets/css/common.css');

    mix.styles([
        '../../../public/packages/bootstrap2.3.2/bootstrap/css/bootstrap.min.css',
        '../../../public/packages/bootstrap2.3.2/bootstrap/css/bootstrap-responsive.min.css',
        '../../../public/packages/font-awesome/css/font-awesome.min.css',
        '../../../public/assets/css/common.css'
    ], 'public/assets/css/app.css');

    // 打包后台CSS
    mix.styles([
        '../../../public/packages/bootstrap/dist/css/bootstrap.min.css',
        '../../../public/packages/font-awesome/css/font-awesome.min.css',
        'admin.css'
    ], 'public/assets/css/admin.css');

    // 打包后台JS
    mix.scripts([
        '../../../public/packages/angular/angular.js',
        '../../../public/packages/angular-route/angular-route.min.js',
        '../../../public/packages/angular-resource/angular-resource.min.js',
        '../../../public/packages/angular-bootstrap/ui-bootstrap-tpls.min.js',
        '../../../public/packages/jquery/dist/jquery.min.js',
        'admin/services.js',
        'admin/app.js'
    ], 'public/assets/js/admin.js');

    // 版本化所有打包后的CSS和JS
    mix.version([
        'assets/js/app.js', 'assets/css/app.css',
        'assets/js/admin.js', 'assets/css/admin.css'
    ]);

    // 复制CSS中用到的资源相对路径
    mix.copy('public/packages/bootstrap2.3.2/bootstrap/img', 'public/build/assets/img');
    mix.copy('public/packages/font-awesome/fonts', 'public/build/assets/fonts');
    mix.copy('resources/assets/fonts', 'public/build/assets/fonts');
});
