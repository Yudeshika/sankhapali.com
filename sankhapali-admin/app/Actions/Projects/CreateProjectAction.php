<?php

namespace App\Actions\Projects;

use App\Models\Project;

class CreateProjectAction
{
    public function handle(array $data, array $screenshots = []): Project
    {
        $project = Project::create([
            'title' => $data['title'],
            'short_description' => $data['short_description'],
            'long_description' => $data['long_description'],
            'slug' => $data['slug'],
            'sort_order' => $data['sort_order'] ?? null,
            'is_published' => $data['is_published'],
        ]);

        foreach ($screenshots as $screenshot) {
            $project->addMedia($screenshot)->toMediaCollection('screenshots');
        }

        $project->technologies()->sync($data['technologies'] ?? []);

        return $project;
    }
}