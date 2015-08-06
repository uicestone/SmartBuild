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

Route::get('/', 'WelcomeController@index');
Route::get('admin', 'WelcomeController@admin');
Route::get('login', 'WelcomeController@login');
Route::get('logout', 'UserController@logout');
Route::post('login', 'UserController@authenticate');

Route::resource('api/v1/module', 'ModuleController', ['except' => ['create', 'edit']]);
Route::resource('api/v1/parameter', 'ParameterController', ['except' => ['create', 'edit']]);
Route::resource('api/v1/product', 'ProductController', ['except' => ['create', 'edit']]);
Route::resource('api/v1/user', 'UserController', ['except' => ['create', 'edit']]);

Route::model('parameter', 'App\Parameter');
Route::model('product', 'App\Product');
Route::model('module', 'App\Module');
Route::model('user', 'App\User');
