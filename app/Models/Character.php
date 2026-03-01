<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Character
 * 
 * @property int $id
 * @property string $name
 * @property string $image
 * @property string $guide
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Character extends Model
{
	protected $table = 'characters';

	protected $fillable = [
		'name',
		'image',
		'guide'
	];
}
