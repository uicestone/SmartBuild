<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Paper extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'sections'];
	protected $casts = ['sections' => 'collection'];

}
