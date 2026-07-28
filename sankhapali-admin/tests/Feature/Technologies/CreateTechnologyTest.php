<?php

use App\Models\Technology;
use App\Models\User;

test('guests cannot create a technology', function () {
    $response = $this->post(route('admin.technologies.store'), []);

    $response->assertRedirect(route('login'));
})->group('technologies');

test('authenticated user can create a technologies', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.technologies.store'), [
            'name'       => 'Laravel',
            'icon_slug'  => 'laravel',
            'sort_order' => 1,
        ]);

    $response->assertRedirect(route('admin.technologies.index'));
    $response->assertSessionHas('success', 'Technology created successfully.');
    $this->assertDatabaseHas('technologies', [
        'name' => 'Laravel',
    ]);
})->group('technologies');

test('technology can be created without an icon slug', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.technologies.store'), [
            'name'       => 'Laravel',
            'sort_order' => 1,
        ]);

    $response->assertRedirect(route('admin.technologies.index'));
    $response->assertSessionHas('success', 'Technology created successfully.');
    $this->assertDatabaseHas('technologies', [
        'name' => 'Laravel',
        'icon_slug' => null,
    ]);
})->group('technologies');

test('technology can be created without sort order', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.technologies.store'), [
            'name'      => 'Laravel',
            'icon_slug' => 'laravel',
        ]);

    $response->assertRedirect(route('admin.technologies.index'));
    $this->assertDatabaseHas('technologies', ['name' => 'Laravel', 'sort_order' => 0]);
})->group('technologies');
