<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Technology\CreateTechnologyAction;
use App\Actions\Technology\DeleteTechnologyAction;
use App\Actions\Technology\UpdateTechnologyAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTechnologyRequest;
use App\Http\Requests\UpdateTechnologyRequest;
use App\Models\Technology;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Technologies/Index', [
            'technologies' => Technology::orderBy('sort_order')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Technologies/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTechnologyRequest $request, CreateTechnologyAction $createTechnologyAction): RedirectResponse
    {
        $technology = $createTechnologyAction->handle($request->validated());

        return redirect()->route('admin.technologies.index')
            ->with('success', 'Technology created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Technology $technology): Response
    {
        return Inertia::render('Admin/Technologies/Show', [
            'technology' => $technology,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Technology $technology): Response
    {
        return Inertia::render('Admin/Technologies/Edit', [
            'technology' => $technology,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTechnologyRequest $request, Technology $technology, UpdateTechnologyAction $updateTechnologyAction): RedirectResponse
    {
        $updateTechnologyAction->handle($technology, $request->validated());

        return redirect()->route('admin.technologies.index')
            ->with('success', 'Technology updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology, DeleteTechnologyAction $deleteTechnologyAction): RedirectResponse
    {
        $deleteTechnologyAction->handle($technology);

        return redirect()->route('admin.technologies.index')
            ->with('success', 'Technology deleted successfully.');
    }
}
