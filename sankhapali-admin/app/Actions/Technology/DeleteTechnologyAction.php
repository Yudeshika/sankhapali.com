<?php

namespace App\Actions\Technology;

use App\Models\Project;
use App\Models\Technology;

class DeleteTechnologyAction
{
    public function handle(Technology $technology): void
    {
        $technology->delete();
    }
}