<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Race
 * 
 * @property int $id
 * @property string $year
 * @property string $name
 * @property string $time
 * @property bool $is_optional
 * @property string|null $note
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Race extends Model
{
	protected $table = 'races';

	protected $casts = [
		'is_optional' => 'bool'
	];

	protected $fillable = [
		'year',
		'name',
		'time',
		'is_optional',
		'note'
	];
}
