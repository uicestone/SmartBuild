<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User, App\Config, App\Sms;
use Input, Hash, Exception, Symfony\Component\HttpKernel\Exception\HttpException, Response;

use Illuminate\Http\Request;

class UserController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$query = User::query();
		
		if(Input::query('keyword'))
		{
			$query->where('name', 'like', '%' . Input::query('keyword') . '%');
		}
		
		$page = Input::query('page') ? Input::query('page') : 1;
		
		$per_page = Input::query('per_page') ? Input::query('per_page') : false;
		
		$list_total = $query->count();
		
		if($per_page)
		{
			$query->skip(($page - 1) * $per_page)->take($per_page);
			$list_start = ($page - 1) * $per_page + 1;
			$list_end = ($page - 1) * $per_page + $per_page;
			if($list_end > $list_total)
			{
				$list_end = $list_total;
			}
		}
		else
		{
			$list_start = 1; $list_end = $list_total;
		}
		
		$results = $query->get();
		
		return response($results)->header('Items-Total', $list_total)->header('Items-Start', $list_start)->header('Items-End', $list_end);

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  User $user
	 * @return Response
	 */
	public function show(User $user)
	{
		return $user;
	}
	
	/**
	 * Update the specified resource in storage.
	 *
	 * @param  User $user
	 * @return Response
	 * @todo Need to check user permission
	 */
	public function update(User $user)
	{
		$user->fill(Input::data());
		$user->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  User $user
	 * @return Response
	 */
	public function destroy(User $user)
	{
		//
	}
	
	/**
	 * Authenticate a user and generate a token
	 */
	public function authenticate()
	{
		if(!Input::data('username'))
		{
			throw new HttpException(400, '请输入用户名');
		}
		
		if(!Input::data('password'))
		{
			throw new HttpException(400, '请输入密码');
		}
		
		$query_user = User::where(function($query)
		{
			$query->where('name', Input::data('username'));
		});
		
		if(!$query_user->first())
		{
			throw new HttpException(401, '用户名或联系方式不存在');
		}
		
		$user = $query_user->where('password', Input::data('password'))->first();
		
		if(!$user)
		{
			throw new HttpException(403, '密码错误');
		}

		if(\Route::current()->uri() === 'login')
		{	
			return redirect('admin')->withCookie(cookie('user_id', $user->id));
		}
		else
		{
			$token = Hash::make($user->name . $user->password . microtime(true));

			$user->token = $token;

			$user->save();

			$user->addVisible('token');
			$user->load('group');

			return Response::json($user)->header('Token', $user->token);
		}
	}
	
	public function logout()
	{
		return redirect('login')->withCookie(cookie('user_id', null));
	}
	
}
