<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CareerScenarioSeeder extends Seeder
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
        $now = now();

        foreach ($data as $item) {
            if (isset($item['Scenario'])) {
                DB::table('career_scenarios')->updateOrInsert(
                    ['name' => $item['Scenario']],
                    [
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );
            }
        }

        $this->command->info('Career scenarios seeded successfully!');
    }
}
