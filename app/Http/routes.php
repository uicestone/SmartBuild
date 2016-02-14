<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Routing\Router;

// 后台管理界面
$admin_routes = function(Router $router)
{
	$router->get('login', 'WelcomeController@adminSignIn');
	$router->post('login', 'UserController@authenticate');
	$router->get('{item?}/{id?}', 'WelcomeController@admin');
};

Route::group(['prefix'=>'admin'], $admin_routes);

if(env('URL_ADMIN'))
{
	Route::group(['domain'=>parse_url(env('URL_ADMIN'), PHP_URL_HOST)], $admin_routes);
}

$api_routes = function(Router $router)
{
	$router->resource('module', 'ModuleController');
	$router->resource('parameter', 'ParameterController');
	$router->resource('product', 'ProductController');
	$router->resource('user', 'UserController');
	$router->post('auth', 'UserController@authenticate');
//	$router->get('auth', 'UserController@getAuthenticatedUser');
//	$router->put('auth', 'UserController@updateAuthenticatedUser');
};

// 支持跨域异步调用的接口
Route::group(['middleware' => 'cors', 'prefix'=>'api/v1'], $api_routes);
Route::group(['middleware' => 'cors', 'domain'=>parse_url(env('API_BASE'), PHP_URL_HOST)], $api_routes);

Route::get('/', 'WelcomeController@index');

Route::model('parameter', 'App\Parameter');
Route::model('product', 'App\Product');
Route::model('module', 'App\Module');
Route::model('user', 'App\User');
