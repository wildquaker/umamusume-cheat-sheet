<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CharacterBuildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = config_path('data/builds.json');

        if (!File::exists($path)) {
            $this->command->error("The file {$path} does not exist.");

            return;
        }

        $json = File::get($path);
        $data = json_decode($json, true);

        foreach ($data as $scenarioData) {
            if (!isset($scenarioData['Scenario']) || !isset($scenarioData['builds'])) {
                continue;
            }

            $scenario = DB::table('career_scenarios')
                ->where('name', $scenarioData['Scenario'])
                ->first();

            if (!$scenario) {
                $this->command->warn("Scenario '{$scenarioData['Scenario']}' not found in database. Skipping its builds.");

                continue;
            }

            DB::table('character_builds')->where('career_scenario_id', $scenario->id)->delete();
            $now = now();

            foreach ($scenarioData['builds'] as $distanceGroup) {
                $distance = $distanceGroup['Distance'];

                foreach ($distanceGroup['build'] as $build) {
                    $stats = $build['Target Stats'];

                    DB::table('character_builds')->insert([
                        'career_scenario_id' => $scenario->id,
                        'distance' => $distance,
                        'cards' => json_encode($build['Cards']),
                        'inherit' => $build['Inherit'],
                        'target_speed' => (string)$stats['Speed'],
                        'target_stamina' => (string)$stats['Stamina'],
                        'target_power' => (string)$stats['Power'],
                        'target_guts' => (string)$stats['Guts'],
                        'target_wit' => (string)$stats['Wit'],
                        'target_misc' => $stats['Misc'] ?: null,
                        'note' => $build['Note'] ?: null,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }

        $this->command->info('Character builds seeded successfully!');
    }
}
