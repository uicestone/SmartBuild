<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Module;

use Input;

class ModuleController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$query = Module::query()->with('parent');
		
		if(Input::query('keyword'))
		{
			$query->where('name', 'like', '%' . Input::query('keyword') . '%');
		}

		if(!is_null(Input::query('parent_id')))
		{
			if(Input::query('parent_id'))
			{
				$query->where('parent_id', Input::query('parent_id'));
			}
			else
			{
				$query->whereNull('parent_id');
			}
		}
		
		$page = Input::query('page') ? Input::query('page') : 1;
		
		$per_page = Input::query('per_page') ? Input::query('per_page') : 20;
		
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
		$module = new Module;
		return $this->update($module);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  Module $module
	 * @return Response
	 */
	public function show($module)
	{
		$module->load('parent');
		return $module;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  Module $module
	 * @return Response
	 */
	public function update($module)
	{
		$module->fill(Input::data());
		
		if(Input::data('parent') && $parent = Module::find(Input::data('parent')['id']))
		{
			$module->parent()->associate($parent);
		}
		
		$module->save();
		return $module;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  Module $module
	 * @return Response
	 */
	public function destroy($module)
	{
		$module->delete();
	}

}
