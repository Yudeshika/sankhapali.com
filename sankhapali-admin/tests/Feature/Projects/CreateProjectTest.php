<?php

use App\Models\Project;
use App\Models\User;

test('guests cannot create a project', function () {
    $response = $this->post(route('admin.projects.store'), []);

    $response->assertRedirect(route('login'));
})->group('projects');

test('authenticated user can create a project', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.projects.store'), [
            'title' => 'Test Project',
            'long_description' => 'Long description for the test project.',
            'short_description' => 'A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

    $response->assertRedirect(route('admin.projects.index'));
    $response->assertSessionHas('success', 'Project created successfully.');
    $this->assertDatabaseHas('projects', [
        'title' => 'Test Project',
    ]);
})->group('projects');

test('slug is auto generated from title', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.projects.store'), [
            'title' => 'Test Project',
            'long_description' => 'Long description for the test project.',
            'short_description' => 'A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

    $this->assertDatabaseHas('projects', [
        'title' => 'Test Project',
        'slug' => 'test-project',
    ]);
})->group('projects');

test('title is required', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.projects.store'), [
            'title' => '',
            'long_description' => 'Long description for the test project.',
            'short_description' => 'A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

        $response->assertInvalid(['title']);
})->group('projects');

test('short description is required', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('admin.projects.store'), [
            'title' => 'My Test Project',
            'long_description' => 'Long description for the test project.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

        $response->assertInvalid(['short_description']);
})->group('projects');

test('duplicate title creates duplicate titles and fails validation', function () {
    $user = User::factory()->create();
    Project::factory()->create(['slug' => 'my-test-project']);

    $response = $this->actingAs($user)
        ->post(route('admin.projects.store'), [
            'title' => 'My Test Project',
            'long_description' => 'Long description for the test project.',
            'short_description' => 'A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

        $response->assertInvalid(['slug']);
})->group('projects');