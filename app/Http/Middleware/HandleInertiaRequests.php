<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\Branch;
use App\Models\document;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $filteredTabs = [
        [
            'key' => 'welcome.public',
            'label' => 'HOME',
            'prop' => 'welcome.public',
            'publicRoute' => 'welcome.public'
        ],
        [
            'key' => 'services',
            'label' => 'SERVICES',
            'prop' => 'services',
            'publicRoute' => 'services.public'
        ],
        [
            'key' => 'about',
            'label' => 'ABOUT',
            'prop' => 'about',
            'publicRoute' => 'about.public'
        ],
        [
            'key' => 'gallery',
            'label' => 'GALLERY',
            'prop' => 'gallery',
            'publicRoute' => 'gallery.public'
        ],
        [
            'key' => 'faqs',
            'label' => 'FAQs',
            'prop' => 'faqs',
            'publicRoute' => 'faqs.public'
        ],
        [
            'key' => 'partners',
            'label' => 'PARTNERS',
            'prop' => 'partners',
            'publicRoute' => 'partners.public'
        ],
        [
            'key' => 'testimonials',
            'label' => 'TESTIMONIALS',
            'prop' => 'testimonials',
            'publicRoute' => 'testimonials.public'
        ]
    ];
    $routes = [
        ['actionName' => 'services.index', 'resourceName' => 'services', 'label' => 'All services', 'publicRoute' => 'services.public.index'],
        ['actionName' => 'services.show', 'resourceName' => 'services', 'label' => 'View Service', 'publicRoute' => 'services.public.show'],
        ['actionName' => 'services.create', 'resourceName' => 'services', 'label' => 'Create Service', 'publicRoute' => 'services.public.create'],
        ['actionName' => 'services.edit', 'resourceName' => 'services', 'label' => 'Edit Service', 'publicRoute' => 'services.public.edit'],
        ['actionName' => 'services.store', 'resourceName' => 'services', 'label' => 'Store Service', 'publicRoute' => 'services.public.store'],
        ['actionName' => 'services.update', 'resourceName' => 'services', 'label' => 'Update Service', 'publicRoute' => 'services.public.update'],
        ['actionName' => 'services.destroy', 'resourceName' => 'services', 'label' => 'Delete Service', 'publicRoute' => 'services.public.destroy'],
        ['actionName' => 'about.index', 'resourceName' => 'about', 'label' => 'All Abouts', 'publicRoute' => 'about.public.index'],
        ['actionName' => 'about.show', 'resourceName' => 'about', 'label' => 'View About', 'publicRoute' => 'about.public.show'],
        ['actionName' => 'about.create', 'resourceName' => 'about', 'label' => 'Create About', 'publicRoute' => 'about.public.create'],
        ['actionName' => 'about.edit', 'resourceName' => 'about', 'label' => 'Edit About', 'publicRoute' => 'about.public.edit'],
        ['actionName' => 'about.store', 'resourceName' => 'about', 'label' => 'Store About', 'publicRoute' => 'about.public.store'],
        ['actionName' => 'about.update', 'resourceName' => 'about', 'label' => 'Update About', 'publicRoute' => 'about.public.update'],
        ['actionName' => 'about.destroy', 'resourceName' => 'about', 'label' => 'Delete About', 'publicRoute' => 'about.public.destroy'],
        ['actionName' => 'branches.index', 'resourceName' => 'branches', 'label' => 'All Branches', 'publicRoute' => 'branches.public.index'],
        ['actionName' => 'branches.show', 'resourceName' => 'branches', 'label' => 'View Branch', 'publicRoute' => 'branches.public.show'],
        ['actionName' => 'branches.create', 'resourceName' => 'branches', 'label' => 'Create Branch', 'publicRoute' => 'branches.public.create'],
        ['actionName' => 'branches.edit', 'resourceName' => 'branches', 'label' => 'Edit Branch', 'publicRoute' => 'branches.public.edit'],
        ['actionName' => 'branches.store', 'resourceName' => 'branches', 'label' => 'Store Branch', 'publicRoute' => 'branches.public.store'],
        ['actionName' => 'branches.update', 'resourceName' => 'branches', 'label' => 'Update Branch', 'publicRoute' => 'branches.public.update'],
        ['actionName' => 'branches.destroy', 'resourceName' => 'branches', 'label' => 'Delete Branch', 'publicRoute' => 'branches.public.destroy'],
        ['actionName' => 'contact.index', 'resourceName' => 'contact', 'label' => 'All Contact', 'publicRoute' => 'contact.public.index'],
        ['actionName' => 'contact.show', 'resourceName' => 'contact', 'label' => 'View Contact', 'publicRoute' => 'contact.public.show'],
        ['actionName' => 'contact.create', 'resourceName' => 'contact', 'label' => 'Create Contact', 'publicRoute' => 'contact.public.create'],
        ['actionName' => 'contact.edit', 'resourceName' => 'contact', 'label' => 'Edit Contact', 'publicRoute' => 'contact.public.edit'],
        ['actionName' => 'contact.store', 'resourceName' => 'contact', 'label' => 'Store Contact', 'publicRoute' => 'contact.public.store'],
        ['actionName' => 'contact.update', 'resourceName' => 'contact', 'label' => 'Update Contact', 'publicRoute' => 'contact.public.update'],
        ['actionName' => 'contact.destroy', 'resourceName' => 'contact', 'label' => 'Delete Contact', 'publicRoute' => 'contact.public.destroy'],
        ['actionName' => 'gallery.index', 'resourceName' => 'gallery', 'label' => 'All Gallery', 'publicRoute' => 'gallery.public.index'],
        ['actionName' => 'gallery.show', 'resourceName' => 'gallery', 'label' => 'View Gallery', 'publicRoute' => 'gallery.public.show'],
        ['actionName' => 'gallery.create', 'resourceName' => 'gallery', 'label' => 'Create Gallery', 'publicRoute' => 'gallery.public.create'],
        ['actionName' => 'gallery.edit', 'resourceName' => 'gallery', 'label' => 'Edit Gallery', 'publicRoute' => 'gallery.public.edit'],
        ['actionName' => 'gallery.store', 'resourceName' => 'gallery', 'label' => 'Store Gallery', 'publicRoute' => 'gallery.public.store'],
        ['actionName' => 'gallery.update', 'resourceName' => 'gallery', 'label' => 'Update Gallery', 'publicRoute' => 'gallery.public.update'],
        ['actionName' => 'gallery.destroy', 'resourceName' => 'gallery', 'label' => 'Delete Gallery', 'publicRoute' => 'gallery.public.destroy'],
        ['actionName' => 'faqs.index', 'resourceName' => 'faqs', 'label' => 'All FAQs', 'publicRoute' => 'faqs.public.index'],
        ['actionName' => 'faqs.show', 'resourceName' => 'faqs', 'label' => 'View FAQs', 'publicRoute' => 'faqs.public.show'],
        ['actionName' => 'faqs.create', 'resourceName' => 'faqs', 'label' => 'Create FAQs', 'publicRoute' => 'faqs.public.create'],
        ['actionName' => 'faqs.edit', 'resourceName' => 'faqs', 'label' => 'Edit FAQs', 'publicRoute' => 'faqs.public.edit'],
        ['actionName' => 'faqs.store', 'resourceName' => 'faqs', 'label' => 'Store FAQs', 'publicRoute' => 'faqs.public.store'],
        ['actionName' => 'faqs.update', 'resourceName' => 'faqs', 'label' => 'Update FAQs', 'publicRoute' => 'faqs.public.update'],
        ['actionName' => 'faqs.destroy', 'resourceName' => 'faqs', 'label' => 'Delete FAQs', 'publicRoute' => 'faqs.public.destroy'],
        ['actionName' => 'partners.index', 'resourceName' => 'partners', 'label' => 'All Partners', 'publicRoute' => 'partners.public.index'],
        ['actionName' => 'partners.show', 'resourceName' => 'partners', 'label' => 'View Partners', 'publicRoute' => 'partners.public.show'],
        ['actionName' => 'partners.create', 'resourceName' => 'partners', 'label' => 'Create Partners', 'publicRoute' => 'partners.public.create'],
        ['actionName' => 'partners.edit', 'resourceName' => 'partners', 'label' => 'Edit Partners', 'publicRoute' => 'partners.public.edit'],
        ['actionName' => 'partners.store', 'resourceName' => 'partners', 'label' => 'Store Partners', 'publicRoute' => 'partners.public.store'],
        ['actionName' => 'partners.update', 'resourceName' => 'partners', 'label' => 'Update Partners', 'publicRoute' => 'partners.public.update'],
        ['actionName' => 'partners.destroy', 'resourceName' => 'partners', 'label' => 'Delete Partners', 'publicRoute' => 'partners.public.destroy'],
        ['actionName' => 'testimonials.index', 'resourceName' => 'testimonials', 'label' => 'All Testimonials', 'publicRoute' => 'testimonials.public.index'],
        ['actionName' => 'testimonials.show', 'resourceName' => 'testimonials', 'label' => 'View Testimonials', 'publicRoute' => 'testimonials.public.show'],
        ['actionName' => 'testimonials.create', 'resourceName' => 'testimonials', 'label' => 'Create Testimonials', 'publicRoute' => 'testimonials.public.create'],
        ['actionName' => 'testimonials.edit', 'resourceName' => 'testimonials', 'label' => 'Edit Testimonials', 'publicRoute' => 'testimonials.public.edit'],
        ['actionName' => 'testimonials.store', 'resourceName' => 'testimonials', 'label' => 'Store Testimonials', 'publicRoute' => 'testimonials.public.store'],
        ['actionName' => 'testimonials.update', 'resourceName' => 'testimonials', 'label' => 'Update Testimonials', 'publicRoute' => 'testimonials.public.update'],
        ['actionName' => 'testimonials.destroy', 'resourceName' => 'testimonials', 'label' => 'Delete Testimonials', 'publicRoute' => 'testimonials.public.destroy'],
        ['actionName' => 'users.index', 'resourceName' => 'users', 'label' => 'All Users', 'publicRoute' => 'users.public.index'],
        ['actionName' => 'users.show', 'resourceName' => 'users', 'label' => 'View Users', 'publicRoute' => 'users.public.show'],
        ['actionName' => 'users.create', 'resourceName' => 'users', 'label' => 'Create Users', 'publicRoute' => 'users.public.create'],
        ['actionName' => 'users.edit', 'resourceName' => 'users', 'label' => 'Edit Users', 'publicRoute' => 'users.public.edit'],
        ['actionName' => 'users.store', 'resourceName' => 'users', 'label' => 'Store Users', 'publicRoute' => 'users.public.store'],
        ['actionName' => 'users.update', 'resourceName' => 'users', 'label' => 'Update Users', 'publicRoute' => 'users.public.update'],
        ['actionName' => 'users.destroy', 'resourceName' => 'users', 'label' => 'Delete Users', 'publicRoute' => 'users.public.destroy'],
        ['actionName' => 'roles.index', 'resourceName' => 'roles', 'label' => 'All Roles', 'publicRoute' => 'roles.public.index'],
        ['actionName' => 'roles.show', 'resourceName' => 'roles', 'label' => 'View Roles', 'publicRoute' => 'roles.public.show'],
        ['actionName' => 'roles.create', 'resourceName' => 'roles', 'label' => 'Create Roles', 'publicRoute' => 'roles.public.create'],
        ['actionName' => 'roles.edit', 'resourceName' => 'roles', 'label' => 'Edit Roles', 'publicRoute' => 'roles.public.edit'],
        ['actionName' => 'roles.store', 'resourceName' => 'roles', 'label' => 'Store Roles', 'publicRoute' => 'roles.public.store'],
        ['actionName' => 'roles.update', 'resourceName' => 'roles', 'label' => 'Update Roles', 'publicRoute' => 'roles.public.update'],
        ['actionName' => 'roles.destroy', 'resourceName' => 'roles', 'label' => 'Delete Roles', 'publicRoute' => 'roles.public.destroy'],
        ['actionName' => 'branches.index', 'resourceName' => 'branches', 'label' => 'All Branches', 'publicRoute' => 'branches.public.index'],
        ['actionName' => 'branches.show', 'resourceName' => 'branches', 'label' => 'View Branches', 'publicRoute' => 'branches.public.show'],
        ['actionName' => 'branches.create', 'resourceName' => 'branches', 'label' => 'Create Branches', 'publicRoute' => 'branches.public.create'],
        ['actionName' => 'branches.edit', 'resourceName' => 'branches', 'label' => 'Edit Branches', 'publicRoute' => 'branches.public.edit'],
        ['actionName' => 'branches.store', 'resourceName' => 'branches', 'label' => 'Store Branches', 'publicRoute' => 'branches.public.store'],
        ['actionName' => 'branches.update', 'resourceName' => 'branches', 'label' => 'Update Branches', 'publicRoute' => 'branches.public.update'],
        ['actionName' => 'branches.destroy', 'resourceName' => 'branches', 'label' => 'Delete Branches', 'publicRoute' => 'branches.public.destroy'],
    ];

        return [
        ...parent::share($request),

            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'branch_id' => $request->user()->branch_id,
                    'profile_picture' => $request->user()->profile_picture,
                ] : null,
            ],

            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            // Static navigation config — safe to share
            'filteredTabs' => $filteredTabs ?? [],
            'routes' => $routes ?? [],

            // Flash messages — safe to share
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'documents' => fn () => \App\Http\Resources\DocumentResource::collection(
                    \App\Models\document::latest()->take(4)->get()
                ),

            'branches' => fn () => \App\Http\Resources\BranchResource::collection(
                    \App\Models\branch::latest()->take(3)->get()
                ),
        ];

    }
}
