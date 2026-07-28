<?php

namespace App\Actions\Projects;

use App\Models\Project;

class UpdateProjectAction
{
    public function handle(Project $project, array $data): Project
    {
        $project->update([
            'title' => $data['title'],
            'short_description' => $data['short_description'],
            'long_description' => $data['long_description'],
            'slug' => $data['slug'],
            'sort_order' => $data['sort_order'] ?? null,
            'is_published' => $data['is_published'] ?? false,
        ]);

        if (array_key_exists('technologies', $data)) {
            $project->technologies()->sync($data['technologies'] ?? []);
        }

        return $project;
    }
}