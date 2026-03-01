<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = config_path('data/races.json');

        if (!File::exists($path)) {
            $this->command->error("The file {$path} does not exist.");

            return;
        }

        $json = File::get($path);
        $data = json_decode($json, true);

        foreach ($data as $yearGroup) {
            if (!isset($yearGroup['year'], $yearGroup['races'])) {
                continue;
            }

            $year = $yearGroup['year'];

            foreach ($yearGroup['races'] as $race) {
                if (isset($race['name'], $race['time'])) {
                    DB::table('races')->updateOrInsert(
                        [
                            'name' => $race['name'],
                            'year' => $year,
                        ],
                        [
                            'time' => $race['time'],
                            'is_optional' => isset($race['optional']) ? (bool) $race['optional'] : false,
                            'note' => $race['note'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]
                    );
                }
            }
        }

        $this->command->info('Races seeded successfully!');
    }
}
