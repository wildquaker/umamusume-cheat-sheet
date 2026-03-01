<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Skill
 * 
 * @property int $id
 * @property string $name
 * @property string $rating
 * @property string $style
 * @property string $distance
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Skill extends Model
{
	protected $table = 'skills';

	protected $fillable = [
		'name',
		'rating',
		'style',
		'distance'
	];
}
