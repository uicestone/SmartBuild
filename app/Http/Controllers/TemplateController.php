<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Template, App\Module;
use Input, Response;

class TemplateController extends Controller {
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $query = Template::query();
        
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
        $template = new Template();
        return $this->update($template);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  Template $template
     * @return Response
     */
    public function show($template)
    {
        return $template;
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  Template $template
     * @return Response
     */
    public function update($template)
    {
        $template->fill(Input::data());
        $template->save();
        return $template;
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  Template $template
     * @return Response
     */
    public function destroy($template)
    {
        $template->delete();
    }
    
}
