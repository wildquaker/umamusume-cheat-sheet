<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = config_path('data/links.json');

        if (!File::exists($path)) {
            $this->command->error("The file {$path} does not exist.");

            return;
        }

        $json = File::get($path);
        $data = json_decode($json, true);
        $now = now();

        foreach ($data as $link) {
            if (isset($link['text'], $link['url'])) {
                DB::table('links')->updateOrInsert(
                    ['url' => $link['url']],
                    [
                        'text' => $link['text'],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );
            }
        }

        $this->command->info('Links seeded successfully!');
    }
}
