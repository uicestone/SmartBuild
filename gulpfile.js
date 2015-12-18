function loadLocConf() {
    try{
        var locConf = require("./locConf");
        function _loadLoc(topk,key,loc,conf) {
            key.forEach(function(k) {
                if( typeof loc[k] != "object") {
                    console.log('locConf[%s]:%s',(topk+"."+k).substr(1),loc[k]);
                    conf[k] = loc[k];
                } else {
                    _loadLoc(topk+"."+k,Object.keys(loc[k]),loc[k],conf[k]);
                }
            });
        }
        console.log('load locals conf ...');
        _loadLoc("",Object.keys(locConf),locConf,options);
    } catch(e){}
}
var options = {
    browserSync: {
        proxy: 'homestead.app',
        host: "192.168.10.10"
    }
}
loadLocConf()


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
    mix.browserSync(options.browserSync);
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
