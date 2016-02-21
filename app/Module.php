<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'description', 'poster'];
	
	public function parent()
	{
		return $this->belongsTo('App\Module');
	}
	
	public function children()
	{
		return $this->hasMany('App\Module', 'parent_id');
	}
	
	public function parameters()
	{
		return $this->hasMany('App\Parameter');
	}
}
