<?php

namespace App\Actions\Technology;

use App\Models\Technology;

class UpdateTechnologyAction
{
    public function handle(Technology $technology, array $data): Technology
    {
        $technology->update([
            'name' => $data['name'],
            'sort_order' => $data['sort_order'],
            'icon_slug' => $data['icon_slug'] ?? null,
        ]);

        return $technology;
    }
}