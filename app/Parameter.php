<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Parameter extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['type', 'name', 'options'];

	public function module()
	{
		return $this->belongsTo('App\Module');
	}
	
	public function products()
	{
		return $this->belongsToMany('App\Product');
	}
	
	public function getOptionsAttribute($options)
	{
		return json_decode($options);
	}
}
