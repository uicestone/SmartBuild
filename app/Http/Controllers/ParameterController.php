<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Parameter, App\Module;

use Input;

class ParameterController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$query = Parameter::query()->with('module');
		
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
		$parameter = new Parameter;
		return $this->update($parameter);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  Parameter $parameter
	 * @return Response
	 */
	public function show($parameter)
	{
		$parameter->load('module');
		return $parameter;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  Parameter $parameter
	 * @return Response
	 */
	public function update($parameter)
	{
		$parameter->fill(Input::data());
		
		if(Input::data('module') && $module = Module::find(Input::data('module')['id']))
		{
			$parameter->module()->associate($module);
		}
		
		if(Input::data('type') === '选项' && Input::data('options'))
		{
			$options = str_replace('，', ',', Input::data('options'));
			$options = str_replace('；', ';', Input::data('options'));
			$parameter->options = json_encode(preg_split('/[;|,]\s*/', $options));
		}
		
		$parameter->save();
		return $parameter;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  Parameter $parameter
	 * @return Response
	 */
	public function destroy($parameter)
	{
		$parameter->delete();
	}

}
