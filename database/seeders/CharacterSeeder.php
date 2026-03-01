<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = config_path('data/characters.json');

        if (!File::exists($path)) {
            $this->command->error("The file {$path} does not exist.");

            return;
        }

        $json = File::get($path);
        $data = json_decode($json, true);
        $now = now();

        foreach ($data as $character) {
            if (isset($character['name'], $character['image'], $character['guide'])) {
                DB::table('characters')->updateOrInsert(
                    ['name' => $character['name']],
                    [
                        'image' => $character['image'],
                        'guide' => $character['guide'],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );
            }
        }

        $this->command->info('Characters seeded successfully!');
    }
}
