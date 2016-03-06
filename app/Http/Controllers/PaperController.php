<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Paper, App\Module;
use Input, Response;

class PaperController extends Controller {
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $query = Paper::query();
        
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
        $paper = new Paper();
        return $this->update($paper);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  Paper $paper
     * @return Response
     */
    public function show($paper)
    {
        return $paper;
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  Paper $paper
     * @return Response
     */
    public function update($paper)
    {
        $paper->fill(Input::data());
        $paper->save();
        return $paper;
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  Paper $paper
     * @return Response
     */
    public function destroy($paper)
    {
        $paper->delete();
    }
    
}
