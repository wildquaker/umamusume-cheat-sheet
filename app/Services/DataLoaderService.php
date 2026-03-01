<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

/**
 * Service for loading JSON data files with caching and error handling.
 */
class DataLoaderService
{
    /**
     * Load JSON data from config/data directory with caching.
     * Caching is only enabled when APP_ENV is "production".
     *
     * @param  string  $name  The name of the JSON file (without extension)
     * @return array<array-key, mixed> The decoded JSON data
     *
     * @throws \RuntimeException If file doesn't exist or JSON is invalid
     */
    public function load(string $name): array
    {
        if (app()->environment('production')) {
            return Cache::remember("data_{$name}", 3600, function () use ($name) {
                return $this->loadFromFile($name);
            });
        }

        return $this->loadFromFile($name);
    }

    /**
     * Load and parse JSON data from file.
     *
     * @param  string  $name  The name of the JSON file (without extension)
     * @return array<array-key, mixed> The decoded JSON data
     *
     * @throws \RuntimeException If file doesn't exist or JSON is invalid
     */
    private function loadFromFile(string $name): array
    {
        $path = config_path("data/{$name}.json");

        if (! file_exists($path)) {
            throw new \RuntimeException("Data file not found: {$name}.json");
        }

        $content = file_get_contents($path);

        if ($content === false) {
            throw new \RuntimeException("Failed to read data file: {$name}.json");
        }

        try {
            $data = json_decode($content, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            throw new \RuntimeException(
                "Invalid JSON in {$name}.json: ".$e->getMessage(),
                0,
                $e
            );
        }

        return $data;
    }
}
