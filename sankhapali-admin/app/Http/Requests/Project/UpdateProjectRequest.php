<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('project'));
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->title),
            'is_published' => $this->boolean('is_published', false),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:256'],
            'long_description' => ['nullable', 'string'],
            'short_description' => ['required', 'string', 'max:256'],
            'slug' => ['required', 'string', 'max:256', 'unique:projects,slug,' . $this->route('project')->id],
            'sort_order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
            'screenshots' => ['nullable', 'array'],
            'screenshots.*' => ['nullable', 'file', 'mimes:jpeg,png,jpg', 'max:2048'],
            'keep_media' => ['nullable', 'array'],
            'keep_media.*' => ['integer', 'exists:media,id'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'A title is required',
            'short_description.required' => 'A short description is required',
            'is_published.required' => 'The publication status is required',
        ];
    }
}
