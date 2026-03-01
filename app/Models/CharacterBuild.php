<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CharacterBuild
 * 
 * @property int $id
 * @property int $career_scenario_id
 * @property string $distance
 * @property array $cards
 * @property string $inherit
 * @property string $target_speed
 * @property string $target_stamina
 * @property string $target_power
 * @property string $target_guts
 * @property string $target_wit
 * @property string|null $target_misc
 * @property string|null $note
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property CareerScenario $career_scenario
 *
 * @package App\Models
 */
class CharacterBuild extends Model
{
	protected $table = 'character_builds';

	protected $casts = [
		'career_scenario_id' => 'int',
		'cards' => 'json'
	];

	protected $fillable = [
		'career_scenario_id',
		'distance',
		'cards',
		'inherit',
		'target_speed',
		'target_stamina',
		'target_power',
		'target_guts',
		'target_wit',
		'target_misc',
		'note'
	];

	public function career_scenario()
	{
		return $this->belongsTo(CareerScenario::class);
	}
}
