<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Solution, App\Module;
use Input, Response;

class SolutionController extends Controller {
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $query = Solution::query();
        
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
        
        $results = $query->get()->map(function($solution)
        {
            $solution->append('price_range');
	        return $solution;
        });
        
        return response($results)->header('Items-Total', $list_total)->header('Items-Start', $list_start)->header('Items-End', $list_end);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $solution = new Solution();
        return $this->update($solution);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  Solution $solution
     * @return Response
     */
    public function show($solution)
    {
	    $solution->append('price_range');
        return $solution;
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  Solution $solution
     * @return Response
     */
    public function update($solution)
    {
        $solution->fill(Input::data());
        $solution->save();
        return $solution;
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  Solution $solution
     * @return Response
     */
    public function destroy($solution)
    {
        $solution->delete();
    }
    
}
