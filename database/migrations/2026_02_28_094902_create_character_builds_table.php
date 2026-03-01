<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('character_builds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_scenario_id')
                  ->constrained()
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();
            $table->string('distance', 50);
            $table->json('cards');
            $table->string('inherit', 100);
            $table->string('target_speed', 20);
            $table->string('target_stamina', 20);
            $table->string('target_power', 20);
            $table->string('target_guts', 20);
            $table->string('target_wit', 20);
            $table->string('target_misc', 255)->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
            $table->index(['career_scenario_id', 'distance'], 'idx_scenario_distance');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_builds');
    }
};
