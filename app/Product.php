<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'description', 'price', 'brand'];
	protected $casts = [
		'price' => 'float'
	];

	public function module()
	{
		return $this->belongsTo('App\Module');
	}
	
	public function profiles()
	{
		return $this->hasMany('App\Profile');
	}
}
