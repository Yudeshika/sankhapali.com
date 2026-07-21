# sankhapali-admin — Claude Guidelines

## Stack Versions

- PHP 8.4
- Laravel v13
- Inertia Laravel v3 + Inertia Vue v3
- Vue 3
- Tailwind CSS v4
- Pest v4
- Laravel Pint v1
- Laravel Wayfinder v0

## Conventions

- Follow existing code conventions — check sibling files for structure, naming, and approach before writing new code.
- Use descriptive names for variables and methods.
- Check for existing components to reuse before creating a new one.
- Stick to the existing directory structure; don't create new base folders without approval.
- Don't change dependencies without approval.
- Only create documentation files if explicitly requested.

## PHP

- Always use curly braces for control structures, even single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`
- Use explicit return type declarations and type hints for all method parameters.
- Use TitleCase for Enum keys.
- Prefer PHPDoc blocks over inline comments.

## Laravel

- Use `php artisan make:` commands to create files. Pass `--no-interaction` always.
- Use named routes and the `route()` function for URL generation.
- For APIs, use Eloquent API Resources with versioning (`api/v1/`).
- When creating models, also create factories and seeders.
- If you get a Vite manifest error, run `npm run build` or `composer run dev`.

## Inertia v3

- Components live in `resources/js/pages`. Use `Inertia::render()` instead of Blade views.
- `Inertia::lazy()` is removed — use `Inertia::optional()` instead.
- Axios is removed — use the built-in XHR client.
- `router.cancel()` replaced by `router.cancelAll()`.
- Events: `invalid` → `httpException`, `exception` → `networkError`.
- Vue components must have a single root element.

## Wayfinder

- Use Wayfinder for TypeScript route functions. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

## Testing (Pest)

- Every change must have a test. Write or update a test and run it before finishing.
- Create tests: `php artisan make:test --pest {name}`
- Run tests: `php artisan test --compact` or `--filter=testName`
- Use factories when creating models in tests.
- Do NOT delete tests without approval.

## Pint (Code Formatter)

- After modifying any PHP files, run: `vendor/bin/pint --dirty --format agent`
