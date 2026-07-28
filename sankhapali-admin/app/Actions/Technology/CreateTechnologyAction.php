<?php

namespace App\Actions\Technology;

use App\Models\Technology;

class CreateTechnologyAction
{
    public function handle(array $data): Technology
    {
        $technology = Technology::create([
            'name' => $data['name'],
            'sort_order' => $data['sort_order'] ?? 0,
            'icon_slug' => $data['icon_slug'] ?? null,
        ]);

        return $technology;
    }
}