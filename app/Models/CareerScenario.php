<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerScenario
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|CharacterBuild[] $character_builds
 *
 * @package App\Models
 */
class CareerScenario extends Model
{
	protected $table = 'career_scenarios';

	protected $fillable = [
		'name',
		'description'
	];

	public function character_builds()
	{
		return $this->hasMany(CharacterBuild::class);
	}
}
