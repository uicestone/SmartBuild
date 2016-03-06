<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'sections'];
	protected $casts = ['sections' => 'collection'];

}
