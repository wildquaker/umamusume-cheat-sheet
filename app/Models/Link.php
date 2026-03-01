<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Link
 * 
 * @property int $id
 * @property string $text
 * @property string $url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Link extends Model
{
	protected $table = 'links';

	protected $fillable = [
		'text',
		'url'
	];
}
