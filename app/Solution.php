<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'description', 'modules'];
	protected $casts = ['modules' => 'collection', 'price_least'=>'float', 'price_most'=>'float'];

	public function getPriceRangeAttribute()
	{
		return [$this->price_least, $this->price_most];
	}
}
