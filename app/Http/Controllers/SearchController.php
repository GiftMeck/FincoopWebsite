<?php

namespace App\Http\Controllers;

use App\Models\about;
use App\Models\branch;
use App\Models\document;
use App\Models\faq;
use App\Models\financial_benefit;
use App\Models\gallery;
use App\Models\partner;
use App\Models\project;
use App\Models\service;
use App\Models\serviceCategory;
use App\Models\testimonial;
use App\Models\verts;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route as RouteFacade;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    /**
     * Global site search across all publicly searchable content.
     *
     * Returns a JSON payload grouped by content type so the frontend
     * command-palette can render labelled sections. Every result carries
     * a ready-to-use URL built with Laravel's route() helper.
     */
    public function __invoke(Request $request)
    {
        $query = trim((string) $request->input('q', ''));

        // Require at least 2 characters before hitting the database.
        if (mb_strlen($query) < 2) {
            return response()->json(['query' => $query, 'groups' => [], 'total' => 0]);
        }

        $term = '%'.$this->escapeLike($query).'%';
        $perType = 5; // max results shown per content type

        // label => [model class, [searchable columns], title column, description column, route name, [route params], meta]
        $definitions = [
            'Services' => [service::class, ['service_name', 'service_description'], 'service_name', 'service_description', 'services.public.show', 'service_id', 'Service'],
            'Service Categories' => [serviceCategory::class, ['category_name', 'category_description'], 'category_name', 'category_description', 'serviceCategories.public.display', 'category_id', 'Category'],
            'FAQs' => [faq::class, ['faq_question', 'faq_answer'], 'faq_question', 'faq_answer', 'faqs.public.show', 'faq_id', 'FAQ'],
            'About' => [about::class, ['about_title', 'about_description'], 'about_title', 'about_description', 'about.public.index', null, 'About'],
            'Gallery' => [gallery::class, ['gallery_title', 'gallery_description'], 'gallery_title', 'gallery_description', 'gallery.public.show', 'gallery_id', 'Gallery'],
            'Partners' => [partner::class, ['partner_name', 'partner_description'], 'partner_name', 'partner_description', 'partners.public.show', 'partner_id', 'Partner'],
            'Testimonials' => [testimonial::class, ['testimonial_title', 'testimonial_content'], 'testimonial_title', 'testimonial_content', 'testimonials.public.show', 'testimonial_id', 'Testimonial'],
            'Branches' => [branch::class, ['branch_name', 'branch_address'], 'branch_name', 'branch_address', 'branches.public.index', null, 'Branch'],
            'Financial Benefits' => [financial_benefit::class, ['benefit_name', 'benefit_description'], 'benefit_name', 'benefit_description', 'welcome.public.index', null, 'Benefit'],
            'Promotions' => [verts::class, ['advert_title', 'advert_description'], 'advert_title', 'advert_description', 'welcome.public.index', null, 'Promotion'],
            'Documents' => [document::class, ['document_name', 'document_description'], 'document_name', 'document_description', 'documents.public.index', null, 'Document'],
            'Projects' => [project::class, ['project_name', 'project_description'], 'project_name', 'project_description', 'projects.public.index', null, 'Project'],
        ];

        $groups = [];

        foreach ($definitions as $label => [$model, $columns, $titleCol, $descCol, $routeName, $paramKey, $meta]) {
            /** @var Builder $builder */
            $builder = $model::query();

            $builder->where(function ($q) use ($columns, $term) {
                foreach ($columns as $i => $column) {
                    $i === 0 ? $q->where($column, 'like', $term) : $q->orWhere($column, 'like', $term);
                }
            });

            $rows = $builder->latest()->limit($perType)->get();

            $items = [];
            foreach ($rows as $row) {
                $params = $paramKey ? [$paramKey => $row->{$paramKey}] : [];
                $url = $this->safeRoute($routeName, $params);
                if (! $url) {
                    continue;
                }

                $description = trim(strip_tags((string) $row->{$descCol}));

                $items[] = [
                    'title' => trim(strip_tags((string) $row->{$titleCol})) ?: 'Untitled',
                    'description' => Str::limit($description, 120),
                    'url' => $url,
                    'meta' => $meta,
                ];
            }

            if (! empty($items)) {
                $groups[] = ['label' => $label, 'items' => $items];
            }
        }

        return response()->json([
            'query' => $query,
            'groups' => $groups,
            'total' => collect($groups)->sum(fn ($g) => count($g['items'])),
        ]);
    }

    /**
     * Build a host-independent, relative URL for a named route.
     *
     * We derive the path from the route's URI definition and substitute the
     * bound parameters rather than relying on route()/APP_URL, so the link
     * works regardless of how the app is hosted and is ideal for Inertia's
     * client-side navigation. Returns null if the route does not exist.
     */
    private function safeRoute(string $name, array $params = []): ?string
    {
        try {
            $route = RouteFacade::getRoutes()->getByName($name);
            if (! $route) {
                return null;
            }

            $uri = $route->uri(); // e.g. services/public/{service_id}/show

            // Substitute bound parameters into {param} / {param?} placeholders.
            foreach ($params as $key => $value) {
                $uri = str_replace(['{'.$key.'}', '{'.$key.'?}'], rawurlencode((string) $value), $uri);
            }

            // Drop any leftover optional parameters, e.g. "{foo?}".
            $uri = (string) preg_replace('/\/\{[^}]+\?\}/', '', $uri);

            return '/'.ltrim($uri, '/');
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Escape LIKE wildcards so user input is treated literally.
     */
    private function escapeLike(string $value): string
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $value);
    }
}
