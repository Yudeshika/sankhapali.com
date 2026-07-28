<?php

use App\Models\Technology;
use App\Models\User;

test('guests cannot update a technology', function () {
    $technology = Technology::factory()->create();
    $response = $this->put(route('admin.technologies.update', $technology), []);

    $response->assertRedirect(route('login'));
})->group('technologies');

test('authenticated user can update a technology', function () {
    $user = User::factory()->create();
    $technology = Technology::factory()->create([
        'name'       => 'Old Name',
        'icon_slug'  => 'old-icon',
        'sort_order' => 1,
    ]);

    $response = $this->actingAs($user)
        ->put(route('admin.technologies.update', $technology), [
            'name'       => 'Laravel',
            'icon_slug'  => 'laravel',
            'sort_order' => 1,
        ]);

    $response->assertRedirect(route('admin.technologies.index'));
    $response->assertSessionHas('success', 'Technology updated successfully.');
    $this->assertDatabaseHas('technologies', [
        'name' => 'Laravel',
    ]);
})->group('technologies');

test('name is required on update', function () {
    $user = User::factory()->create();
    $technology = Technology::factory()->create();

    $response = $this->actingAs($user)
        ->put(route('admin.technologies.update', $technology), [
            'icon_slug'  => 'vue',
            'sort_order' => 1,
        ]);

    $response->assertInvalid(['name']);
})->group('technologies');