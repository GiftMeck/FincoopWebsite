<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\FinancialBenefitController;
use App\Http\Controllers\vertsController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LoanapplicationController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\MobileBankingApplicationController;
use App\Http\Controllers\KycController;
use App\Http\Controllers\GroupMembershipController;
use App\Http\Resources\CustomerResource;
use Inertia\Inertia;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'serviceCategories' => fn() => \App\Models\serviceCategory::all()
        ->map(fn($serviceCategory) => new \App\Http\Resources\serviceCategoryResource($serviceCategory)),
        'financialBenefits' => fn() => \App\Models\financial_benefit::all()
        ->map(fn($financialBenefit) => new \App\Http\Resources\FinancialBenefitResource($financialBenefit)),
        'verts' => fn() => \App\Models\verts::all()
        ->map(fn($vert) => new \App\Http\Resources\vertResource($vert)),
        'feedback' => fn() => \App\Models\customer::latest()
        ->paginate(3)
        ->through(fn ($customer) => new \App\Http\Resources\CustomerResource($customer)),
        'faqs' => fn() => \App\Models\faq::All()
    ]);
})->name('welcome.public.index');
// Public Routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', 
        [
            'serviceCategories' => fn() => App\Models\serviceCategory::paginate(4),
            'services' => fn() => App\Models\Service::paginate(4),
            'abouts' => fn() => App\Models\About::paginate(4),
            'customers' => fn() => App\Models\Customer::paginate(4),
            'galleries' => fn() => App\Models\Gallery::paginate(4),
            'faqs' => fn() => App\Models\Faq::paginate(4),
            'contacts' => fn() => App\Models\Contact::paginate(4),
            'partners' => fn() => App\Models\Partner::paginate(4),
            'testimonials' => fn() => App\Models\Testimonial::paginate(4),
            'users' => fn() => App\Models\User::paginate(4),
            'roles' => fn() => App\Models\Role::paginate(4),
            'financialBenefits' => fn() => App\Models\financial_benefit::paginate(4),
            'verts' => fn() => App\Models\verts::paginate(4),
            'documents' => fn() => App\Models\Document::paginate(4),
            'projects' => fn() => App\Models\Project::all(),
            'membershipApplications' => fn() => App\Models\Membership::paginate(4),
            'KYCApplications' => fn() => App\Models\kyc::paginate(4),
            'groupMembershipApplications' => fn() => App\Models\GroupMembership::paginate(4),
            'loanApplications' => fn() => App\Models\LoanApplication::paginate(4),
            'mobileBankingApplications' => fn() => App\Models\MobileBankingApplication::paginate(4),
        ]
    );
})->middleware(['auth', 'verified'])->name('dashboard');


Route::prefix('serviceCategories')->group(function () {
    Route::prefix('public')
        ->name('serviceCategories.public.')
        ->group(function () {
            Route::get('/', [ServiceCategoryController::class, 'index'])
                ->name('index');
            Route::get('/{category_id}/show', [ServiceCategoryController::class, 'show'])
                ->name('show');
            Route::get('/{category_id}/display', [ServiceCategoryController::class, 'display'])
                ->name('display');
            Route::get('/create', [ServiceCategoryController::class, 'create'])
            ->name('create');
        });
});
Route::prefix('services')->group(function () {
    Route::prefix('public')
        ->name('services.public.')
        ->group(function () {
            Route::get('/', [ServiceController::class, 'index'])
                ->name('index');
            Route::get('/create', [ServiceController::class, 'create'])
            ->name('create');
            Route::get('/{service_id}/show', [ServiceController::class, 'show'])
            ->name('show');
        });
});
Route::prefix('about')->group(function () {
    Route::prefix('public')
        ->name('about.public.')
        ->group(function () {
            Route::get('/', [AboutController::class, 'index'])
                ->name('index');
            Route::get('/create', [AboutController::class, 'create'])
            ->name('create');
        });
});
Route::prefix('gallery')->group(function () {
    Route::prefix('public')
        ->name('gallery.public.')
        ->group(function () {
            Route::get('/', [GalleryController::class, 'index'])
                ->name('index');
            Route::get('/create', [GalleryController::class, 'create'])
            ->name('create');
            Route::get('/{gallery_id}/show', [GalleryController::class, 'show'])
            ->name('show');
        });
});
Route::prefix('faqs')->group(function () {
    Route::prefix('public')
        ->name('faqs.public.')
        ->group(function () {
            Route::get('/', [FaqController::class, 'index'])
                ->name('index');
            Route::get('/create', [FaqController::class, 'create'])
            ->name('create');
            Route::get('/{faq_id}/show', [FaqController::class, 'show'])
            ->name('show');
        });
});
Route::prefix('contacts')->group(function () {
    Route::prefix('public')
        ->name('contacts.public.')
        ->group(function () {
            Route::get('/', [ContactController::class, 'index'])
                ->name('index');
            Route::get('/create', [ContactController::class, 'create'])
            ->name('create');
        });
});
Route::prefix('partners')->group(function () {
    Route::prefix('public')
        ->name('partners.public.')
        ->group(function () {
            Route::get('/', [PartnerController::class, 'index'])
                ->name('index');
            Route::get('/create', [PartnerController::class, 'create'])
            ->name('create');
            Route::get('/{partner_id}/show', [PartnerController::class, 'show'])
            ->name('show');
        });
});
Route::prefix('customers')->group(function () {
    Route::prefix('public')
        ->name('customers.public.')
        ->group(function () {
            Route::get('/', [CustomerController::class, 'index'])
                ->name('index');
            Route::get('/create', [CustomerController::class, 'create'])
            ->name('create');
            Route::get('/{partner_id}/show', [CustomerController::class, 'show'])
            ->name('show');
        });
});
Route::prefix('testimonials')->group(function () {
    Route::prefix('public')
        ->name('testimonials.public.')
        ->group(function () {
            Route::get('/', [TestimonialController::class, 'index'])
                ->name('index');
            Route::get('/create', [TestimonialController::class, 'create'])
            ->name('create');
            Route::get('/{testimonial_id}/show', [TestimonialController::class, 'show'])
            ->name('show');
        });
});
Route::prefix('branches')->group(function () {
    Route::prefix('public')
        ->name('branches.public.')
        ->group(function () {
            Route::get('/', [BranchController::class, 'index'])
                ->name('index');
            Route::get('/create', [BranchController::class, 'create'])
            ->name('create');
            Route::get('/store', [BranchController::class, 'store'])
            ->name('store');
        });
});
Route::prefix('documents')->group(function () {
    Route::prefix('public')
        ->name('documents.public.')
        ->group(function () {
            Route::get('/', [DocumentController::class, 'index'])
                ->name('index');
            Route::get('/create', [DocumentController::class, 'create'])
            ->name('create');
            Route::get('/store', [DocumentController::class, 'store'])
            ->name('store');
        });
});
Route::prefix('projects')->group(function () {
    Route::prefix('public')
        ->name('projects.public.')
        ->group(function () {
            Route::get('/', [ProjectController::class, 'index'])
                ->name('index');
            Route::get('/create', [ProjectController::class, 'create'])
            ->name('create');
            Route::get('/store', [ProjectController::class, 'store'])
            ->name('store');
        });
});

// Private routes
Route::group(['prefix' => 'service-categories', 'as' => 'serviceCategories.'], function () {
    Route::get('/', [ServiceCategoryController::class, 'index'])->name('index');
    Route::get('/create', [ServiceCategoryController::class, 'create'])->name('create');
    Route::post('/', [ServiceCategoryController::class, 'store'])->name('store');
    Route::get('/{category_id}/edit', [ServiceCategoryController::class, 'edit'])->name('edit');
    Route::put('/{category_id}', [ServiceCategoryController::class, 'update'])->name('update');
    Route::delete('/{category_id}', [ServiceCategoryController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'services', 'as' => 'services.'], function () {
    Route::get('/', [ServiceController::class, 'index'])->name('index');
    Route::get('/create', [ServiceController::class, 'create'])->name('create');
    Route::post('/', [ServiceController::class, 'store'])->name('store');
    Route::get('/{service_id}/edit', [ServiceController::class, 'edit'])->name('edit');
    Route::put('/{service_id}', [ServiceController::class, 'update'])->name('update');
    Route::delete('/{service_id}', [ServiceController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'about', 'as' => 'about.'], function () {
    Route::get('/', [AboutController::class, 'index'])->name('index');
    Route::get('/create', [AboutController::class, 'create'])->name('create');
    Route::post('/', [AboutController::class, 'store'])->name('store');
    Route::get('/{about_id}/edit', [AboutController::class, 'edit'])->name('edit');
    Route::put('/{about_id}', [AboutController::class, 'update'])->name('update');
    Route::delete('/{about_id}', [AboutController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'staff', 'as' => 'staff.'], function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/create', [UserController::class, 'create'])->name('create');
    Route::post('/', [UserController::class, 'store'])->name('store');
    Route::get('/{staff_id}/edit', [UserController::class, 'edit'])->name('edit');
    Route::put('/{staff_id}', [UserController::class, 'update'])->name('update');
    Route::delete('/{staff_id}', [UserController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'customers', 'as' => 'customers.'], function () {
    Route::get('/', [CustomerController::class, 'index'])->name('index');
    Route::get('/create', [CustomerController::class, 'create'])->name('create');
    Route::post('/', [CustomerController::class, 'store'])->name('store');
    Route::get('/{customer_id}/edit', [CustomerController::class, 'edit'])->name('edit');
    Route::put('/{customer_id}', [CustomerController::class, 'update'])->name('update');
    Route::delete('/{customer_id}', [CustomerController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'roles', 'as' => 'roles.'], function () {
    Route::get('/', [RoleController::class, 'index'])->name('index');
    Route::get('/create', [RoleController::class, 'create'])->name('create');
    Route::post('/', [RoleController::class, 'store'])->name('store');
    Route::get('/{role_id}/edit', [RoleController::class, 'edit'])->name('edit');
    Route::put('/{role_id}', [RoleController::class, 'update'])->name('update');
    Route::delete('/{role_id}', [RoleController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'gallery', 'as' => 'gallery.'], function () {
    Route::get('/', [GalleryController::class, 'index'])->name('index');
    Route::get('/create', [GalleryController::class, 'create'])->name('create');
    Route::post('/', [GalleryController::class, 'store'])->name('store');
    Route::get('/{gallery_id}/edit', [GalleryController::class, 'edit'])->name('edit');
    Route::put('/{gallery_id}', [GalleryController::class, 'update'])->name('update');
    Route::delete('/{gallery_id}', [GalleryController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'faq', 'as' => 'faqs.'], function () {
    Route::get('/', [FaqController::class, 'index'])->name('index');
    Route::get('/create', [FaqController::class, 'create'])->name('create');
    Route::post('/', [FaqController::class, 'store'])->name('store');
    Route::get('/{faq_id}/edit', [FaqController::class, 'edit'])->name('edit');
    Route::put('/{faq_id}', [FaqController::class, 'update'])->name('update');
    Route::delete('/{faq_id}', [FaqController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'contact', 'as' => 'contacts.'], function () {
    Route::get('/', [ContactController::class, 'index'])->name('index');
    Route::get('/create', [ContactController::class, 'create'])->name('create');
    Route::post('/', [ContactController::class, 'store'])->name('store');
    Route::get('/{contact_id}/edit', [ContactController::class, 'edit'])->name('edit');
    Route::put('/{contact_id}', [ContactController::class, 'update'])->name('update');
    Route::delete('/{contact_id}', [ContactController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'partners', 'as' => 'partners.'], function () {
    Route::get('/', [PartnerController::class, 'index'])->name('index');
    Route::get('/create', [PartnerController::class, 'create'])->name('create');
    Route::post('/', [PartnerController::class, 'store'])->name('store');
    Route::get('/{partners_id}/edit', [PartnerController::class, 'edit'])->name('edit');
})->middleware('auth');
Route::group(['prefix' => 'testimonials', 'as' => 'testimonials.'], function () {
    Route::get('/', [TestimonialController::class, 'index'])->name('index');
    Route::get('/create', [TestimonialController::class, 'create'])->name('create');
    Route::post('/', [TestimonialController::class, 'store'])->name('store');
    Route::get('/{testimonials_id}/edit', [TestimonialController::class, 'edit'])->name('edit');
})->middleware('auth');
Route::group(['prefix' => 'branches', 'as' => 'branches.'], function () {
    Route::get('/', [BranchController::class, 'index'])->name('index');
    Route::get('/create', [BranchController::class, 'create'])->name('create');
    Route::post('/', [BranchController::class, 'store'])->name('store');
    Route::get('/{branch_id}/edit', [BranchController::class, 'edit'])->name('edit');
})->middleware('auth');
Route::group(['prefix' => 'financialBenefits', 'as' => 'financialBenefits.'], function () {
    Route::get('/', [FinancialBenefitController::class, 'index'])->name('index');
    Route::get('/create', [FinancialBenefitController::class, 'create'])->name('create');
    Route::post('/', [FinancialBenefitController::class, 'store'])->name('store');
    Route::get('/{financialBenefit_id}/edit', [FinancialBenefitController::class, 'edit'])->name('edit'); 
    Route::delete('/{financialBenefit_id}', [FinancialBenefitController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'verts', 'as' => 'verts.'], function () {
    Route::get('/', [vertsController::class, 'index'])->name('index');
    Route::get('/create', [vertsController::class, 'create'])->name('create');
    Route::post('/', [vertsController::class, 'store'])->name('store');
    Route::get('/{vert_id}/edit', [vertsController::class, 'edit'])->name('edit');
    Route::delete('/{vert_id}', [vertsController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'documents', 'as' => 'documents.'], function () {
    Route::get('/', [DocumentController::class, 'index'])->name('index');
    Route::get('/create', [DocumentController::class, 'create'])->name('create');
    Route::post('/', [DocumentController::class, 'store'])->name('store');
    Route::get('/{document_id}/edit', [DocumentController::class, 'edit'])->name('edit'); 
    Route::put('/{document_id}/update', [DocumentController::class, 'update'])->name('update'); 
    Route::get('/{document}/download', [DocumentController::class, 'download'])->name('download'); 
    Route::delete('/{document_id}', [DocumentController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'projects', 'as' => 'projects.'], function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::get('/create', [ProjectController::class, 'create'])->name('create');
    Route::post('/', [ProjectController::class, 'store'])->name('store');
    Route::get('/{project_id}/edit', [ProjectController::class, 'edit'])->name('edit'); 
    Route::delete('/{project_id}', [ProjectController::class, 'destroy'])->name('destroy');
})->middleware('auth');
Route::group(['prefix' => 'memberships', 'as' => 'memberships.'], function () {
    Route::get('/', [MembershipController::class, 'create'])->name('create');
    Route::post('/', [MembershipController::class, 'store'])->name('store');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/index', [MembershipController::class, 'index'])->name('index');
        Route::get('/{membership}', [MembershipController::class, 'show'])->name('show')->where('membership', '[0-9]+');
        Route::put('/{membership}', [MembershipController::class, 'update'])->name('update')->where('membership', '[0-9]+');
        Route::delete('/{membership}', [MembershipController::class, 'destroy'])->name('destroy')->where('membership', '[0-9]+');
        Route::post('/{membershipApplicant}/approve', [MembershipController::class, 'approve'])->name('approve')->where('membershipApplicant', '[0-9]+');
        Route::post('/{membership}/reject', [MembershipController::class, 'reject'])->name('reject')->where('membership', '[0-9]+');
        Route::get('/generate-number', [MembershipController::class, 'generateMemberNumber'])->name('generate-number');
        Route::get('/export', [MembershipController::class, 'export'])->name('export');
        Route::get('/statistics', [MembershipController::class, 'statistics'])->name('statistics');
    });
});
Route::prefix('mobile-banking-applications')
    ->name('mobile-banking-applications.')
    ->group(function () {
        
    // Public routes (for customer submissions)
    Route::get('/', [MobileBankingApplicationController::class, 'create'])->name('create');
    Route::post('/', [MobileBankingApplicationController::class, 'store'])->name('store');

    // Admin routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/list', [MobileBankingApplicationController::class, 'index'])->name('index');
        Route::get('/{mobileBankingApplicant}', [MobileBankingApplicationController::class, 'show'])->name('show')->where('mobileBankingApplicant', '^[0-9]+$');
        Route::put('/{mobileBankingApplicant}', [MobileBankingApplicationController::class, 'update'])->name('update')->where('mobileBankingApplicant', '^[0-9]+$');
        Route::delete('/{mobileBankingApplicant}', [MobileBankingApplicationController::class, 'destroy'])->name('destroy')->where('mobileBankingApplicant', '^[0-9]+$');
        Route::post('/{mobileBankingApplicant}/approve', [MobileBankingApplicationController::class, 'approve'])->name('approve')->where('mobileBankingApplicant', '^[0-9]+$');
        Route::post('/{mobileBankingApplicant}/reject', [MobileBankingApplicationController::class, 'reject'])->name('reject')->where('mobileBankingApplicant', '^[0-9]+$');
        Route::post('/{mobileBankingApplicant}/process', [MobileBankingApplicationController::class, 'process'])->name('process')->where('mobileBankingApplicant', '^[0-9]+$');
        Route::get('/statistics', [MobileBankingApplicationController::class, 'statistics'])->name('statistics');
        Route::get('/export', [MobileBankingApplicationController::class, 'export'])->name('export');
        Route::get('/customer/mobile-numbers', [MobileBankingApplicationController::class, 'getCustomerMobileNumbers'])->name('customer.mobile-numbers');
    });
});
Route::prefix('kyc')
    ->name('kyc.')
    ->group(function () {

        // Public routes (for customer submissions)
        Route::get('/create', [KycController::class, 'create'])->name('create');
        Route::post('/', [KycController::class, 'store'])->name('store');
        Route::get('/generate-number', [KycController::class, 'generateKycNumberPublic'])->name('generate-number');
        Route::post('/check-status', [KycController::class, 'checkStatus'])->name('check-status');

        // Admin routes (protected)
        Route::middleware(['auth:sanctum'])->group(function () {
            Route::get('/', [KycController::class, 'index'])->name('index');
            Route::get('/{kyc}', [KycController::class, 'show'])->name('show')->where('kyc', '[0-9]+');
            Route::put('/{kyc}', [KycController::class, 'approve'])->name('approve')->where('kyc', '[0-9]+');
            Route::delete('/{kyc}', [KycController::class, 'destroy'])->name('destroy')->where('kyc', '[0-9]+');

            // Verification actions
            Route::post('/{kyc}/verify', [KycController::class, 'verify'])->name('verify')->where('kyc', '[0-9]+');
            Route::post('/{kyc}/reject', [KycController::class, 'reject'])->name('reject')->where('kyc', '[0-9]+');
            Route::post('/bulk-verify', [KycController::class, 'bulkVerify'])->name('bulk-verify');

            // Reports & statistics
            Route::get('/statistics', [KycController::class, 'statistics'])->name('statistics');
            Route::get('/export', [KycController::class, 'export'])->name('export');
            Route::get('/districts', [KycController::class, 'districts'])->name('districts');
        });
    });

Route::prefix('group-memberships')
    ->name('group-memberships.')
    ->group(function () {

        // Public routes (for customer submissions)
        Route::get('/create', [GroupMembershipController::class, 'create'])->name('create');
        Route::post('/', [GroupMembershipController::class, 'store'])->name('store');
        Route::get('/generate-number', [GroupMembershipController::class, 'generateMemberNumberPublic'])->name('generate-number');

        // Admin routes (protected)
        Route::middleware(['auth'])->group(function () {
            Route::get('/', [GroupMembershipController::class, 'index'])->name('index');
            Route::get('/{groupMembership}', [GroupMembershipController::class, 'show'])->name('show')->whereNumber('groupMembership');
            Route::get('/{groupMembership}/summary', [GroupMembershipController::class, 'summary'])->name('summary')->whereNumber('groupMembership');
            Route::put('/{groupMembership}', [GroupMembershipController::class, 'update'])->name('update')->whereNumber('groupMembership');
            Route::delete('/{groupMembership}', [GroupMembershipController::class, 'destroy'])->name('destroy')->whereNumber('groupMembership');

            // Approval actions
            Route::post('/{groupMembership}/approve', [GroupMembershipController::class, 'approve'])->name('approve')->where('groupMembership', '[0-9]+');
            Route::post('/{groupMembership}/disapprove', [GroupMembershipController::class, 'disapprove'])->name('disapprove')->where('groupMembership', '[0-9]+');
            Route::post('/bulk-approve', [GroupMembershipController::class, 'bulkApprove'])->name('bulk-approve');

            // Reports & statistics
            Route::get('/statistics', [GroupMembershipController::class, 'statistics'])->name('statistics');
            Route::get('/export', [GroupMembershipController::class, 'export'])->name('export');
            Route::get('/business-types', [GroupMembershipController::class, 'businessTypes'])->name('business-types');
        });
    });
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::prefix('loanapplications')->name('loanapplications.')->group(function () {
    Route::get('/', [loanapplicationController::class, 'create'])->name('create');
    Route::get('/readmore', [loanapplicationController::class, 'readmore'])->name('readmore');
    Route::post('/', [loanapplicationController::class, 'store'])->name('store');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/{loanApplicant}', [loanapplicationController::class, 'show'])->name('show')->where('loanApplicant', '[0-9]+');
        Route::get('/{loanApplicant}/edit', [loanapplicationController::class, 'edit'])->name('edit')->where('loanApplicant', '[0-9]+');
        Route::post('/{loanApplicant}', [loanapplicationController::class, 'approve'])->name('approve')->where('loanApplicant', '[0-9]+');
        Route::get('/export', [loanapplicationController::class, 'export'])->name('export');
    });
});

require __DIR__.'/auth.php';
