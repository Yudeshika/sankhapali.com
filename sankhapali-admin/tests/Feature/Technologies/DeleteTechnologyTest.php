<?php

use App\Models\Technology;
use App\Models\User;

test('guests cannot delete a Technology', function () {
    $Technology = Technology::factory()->create();
    $response = $this->delete(route('admin.technologies.destroy', $Technology), []);

    $response->assertRedirect(route('login'));
})->group('Technologies');

test('authenticated user can delete a Technology', function () {
    $user = User::factory()->create();
    $Technology = Technology::factory()->create();

    $response = $this->actingAs($user)
        ->delete(route('admin.technologies.destroy', $Technology));

    $response->assertRedirect(route('admin.technologies.index'));
    $response->assertSessionHas('success', 'Technology deleted successfully.');
})->group('Technologies');

test('deleted Technology is permanently deleted', function () {
    $user = User::factory()->create();
    $Technology = Technology::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.technologies.destroy', $Technology));

    $this->assertDatabaseMissing('Technologies', [
        'id' => $Technology->id,
    ]);
})->group('Technologies');

