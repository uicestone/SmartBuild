<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Config extends Model {
	
	protected $table = 'config';
	protected $fillable = ['key', 'value'];
	
	public $timestamps = false;
	
}
