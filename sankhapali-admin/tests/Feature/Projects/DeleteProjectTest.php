<?php

use App\Models\Project;
use App\Models\User;

test('guests cannot delete a project', function () {
    $project = Project::factory()->create();
    $response = $this->delete(route('admin.projects.destroy', $project), []);

    $response->assertRedirect(route('login'));
})->group('projects');

test('authenticated user can delete a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $response = $this->actingAs($user)
        ->delete(route('admin.projects.destroy', $project));

    $response->assertRedirect(route('admin.projects.index'));
    $response->assertSessionHas('success', 'Project deleted successfully.');
})->group('projects');

test('deleted project is soft deleted', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.projects.destroy', $project));

    $this->assertSoftDeleted('projects', [
        'id' => $project->id,
    ]);
})->group('projects');

test('soft deleted project is not permanently deleted', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.projects.destroy', $project));

        $this->assertDatabaseHas('projects', ['id' => $project->id]);
})->group('projects');

test('soft deleted project can be restored', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.projects.destroy', $project));

    $project->restore();

    $this->assertDatabaseHas('projects', ['id' => $project->id, 'deleted_at' => null]);
})->group('projects');
