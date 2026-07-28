<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'long_description' => fake()->paragraphs(3, true),
            'short_description' => fake()->paragraph(),
            'sort_order' => fake()->numberBetween(1, 100),
            'is_published' => fake()->boolean(),
        ];
    }
}
