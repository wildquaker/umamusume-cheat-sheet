<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = config_path('data/skills.json');

        if (!File::exists($path)) {
            $this->command->error("The file {$path} does not exist.");

            return;
        }

        $json = File::get($path);
        $data = json_decode($json, true);

        foreach ($data as $skill) {
            if (isset($skill['Skill'], $skill['Rating'], $skill['Style'], $skill['Distance'])) {               
                DB::table('skills')->updateOrInsert(
                    ['name' => $skill['Skill']], // Map JSON 'Skill' to DB 'name'
                    [
                        'rating'     => $skill['Rating'],
                        'style'      => $skill['Style'],
                        'distance'   => $skill['Distance'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }

        $this->command->info('Skills seeded successfully!');
    }
}
