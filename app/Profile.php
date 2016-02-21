<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['value'];

	public function product()
	{
		return $this->belongsTo('App\Product');
	}
	
	public function parameter()
	{
		return $this->belongsTo('App\Parameter');
	}

}
