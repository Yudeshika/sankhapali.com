<?php

use App\Models\Project;
use App\Models\User;

test('guests cannot update a project', function () {
    $project = Project::factory()->create();
    $response = $this->put(route('admin.projects.update', $project), []);

    $response->assertRedirect(route('login'));
})->group('projects');

test('authenticated user can update a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $response = $this->actingAs($user)
        ->put(route('admin.projects.update', $project), [
            'title' => 'Updated Test Project',
            'long_description' => 'Updated Long description for the test project.',
            'short_description' => 'Updated A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

    $response->assertRedirect(route('admin.projects.index'));
    $response->assertSessionHas('success', 'Project updated successfully.');
    $this->assertDatabaseHas('projects', [
        'title' => 'Updated Test Project',
    ]);
})->group('projects');

test('slug is regenerated from updatedtitle', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $response = $this->actingAs($user)
        ->put(route('admin.projects.update', $project), [
            'title' => 'Updated Test Project',
            'long_description' => 'Long description for the test project.',
            'short_description' => 'A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

    $this->assertDatabaseHas('projects', [
        'title' => 'Updated Test Project',
        'slug' => 'updated-test-project',
    ]);
})->group('projects');

test('slug unique rule ignores the current project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'title' => 'My Test Project',
        'slug' => 'my-test-project',
    ]);

    $response = $this->actingAs($user)
        ->put(route('admin.projects.update', $project), [
            'title' => 'My Test Project',
            'long_description' => 'Long description for the test project.',
            'short_description' => 'A short description.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

        $response->assertRedirect(route('admin.projects.index'));
        $this->assertDatabaseHas('projects', ['slug' => 'my-test-project']);
})->group('projects');

test('title is required on update', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $response = $this->actingAs($user)
        ->put(route('admin.projects.update', $project), [
            'long_description' => 'Long description for the test project.',
            'sort_order' => 1,
            'is_published' => false,
        ]);

        $response->assertInvalid(['title']);
})->group('projects');
