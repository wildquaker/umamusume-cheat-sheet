<?php

namespace App\Services;

use App\Models\CareerScenario;
use App\Models\Character;
use App\Models\Link;
use App\Models\Race;
use App\Models\Skill;
use Illuminate\Support\Facades\Cache;

/**
 * Service for loading cheat sheet data from the database with caching.
 * Caching is only enabled when APP_ENV is "production".
 */
class CheatSheetDataService
{
    /**
     * Load cheat sheet data by name with optional caching.
     *
     * @param  string  $name  The data set name (links, characters, skills, races, builds)
     * @return array<array-key, mixed> The data
     *
     * @throws \RuntimeException If the data set name is unknown
     */
    public function load(string $name): array
    {
        if (app()->environment('production')) {
            return Cache::remember("data_{$name}", 3600, function () use ($name) {
                return $this->loadFromDatabase($name);
            });
        }

        return $this->loadFromDatabase($name);
    }

    /**
     * Load data from the database for the given data set.
     *
     * @param  string  $name  The data set name
     * @return array<array-key, mixed> The data
     *
     * @throws \RuntimeException If the data set name is unknown
     */
    private function loadFromDatabase(string $name): array
    {
        return match ($name) {
            'links' => $this->loadLinks(),
            'characters' => $this->loadCharacters(),
            'skills' => $this->loadSkills(),
            'races' => $this->loadRaces(),
            'builds' => $this->loadBuilds(),
            default => throw new \RuntimeException("Unknown data set: {$name}"),
        };
    }

    private function loadLinks(): array
    {
        return Link::all(['text', 'url'])->toArray();
    }

    private function loadCharacters(): array
    {
        return Character::all(['name', 'image', 'guide'])->toArray();
    }

    private function loadSkills(): array
    {
        return Skill::all()->map(fn($skill) => [
            'Skill' => $skill->name,
            'Rating' => $skill->rating,
            'Style' => $skill->style,
            'Distance' => $skill->distance,
        ])->toArray();
    }

    private function loadRaces(): array
    {
        return Race::all()->groupBy('year')->map(fn($races, $year) => [
            'year' => $year,
            'races' => $races->map(fn($race) => array_filter([
                'name' => $race->name,
                'time' => $race->time,
                'optional' => $race->is_optional ?: null,
                'note' => $race->note,
            ], fn($value) => $value !== null))->values()->toArray(),
        ])->values()->toArray();
    }

    private function loadBuilds(): array
    {
        $scenarios = CareerScenario::with('character_builds')->get();

        return $scenarios->map(fn($scenario) => [
            'Scenario' => $scenario->name,
            'builds' => $scenario->character_builds
                ->groupBy('distance')
                ->map(fn($distanceBuilds, $distance) => [
                    'Distance' => $distance,
                    'build' => $distanceBuilds->map(fn($build) => [
                        'Cards' => $build->cards,
                        'Inherit' => $build->inherit,
                        'Target Stats' => [
                            'Speed' => $build->target_speed,
                            'Stamina' => $build->target_stamina,
                            'Power' => $build->target_power,
                            'Guts' => $build->target_guts,
                            'Wit' => $build->target_wit,
                            'Misc' => $build->target_misc ?? '',
                        ],
                        'Note' => $build->note ?? '',
                    ])->values()->toArray(),
                ])->values()->toArray(),
        ])->toArray();
    }
}
