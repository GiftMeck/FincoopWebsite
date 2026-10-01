import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage } from "@inertiajs/react";

export default function ServiceCategoriesPublic() {
    const category = usePage().props.category;

    return (
        <>
            <NavBar />

            <div className="bg-gray-100 p-4">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start items-stretch">


                        <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl min-h-[350px] sm:min-h-[450px] lg:min-h-[650px]">
                            <img
                                src={`/storage/${category.category_image}`}
                                alt={category.category_name}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                            <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-10">
                                <div className="text-white">
                                    <span className="mb-4 inline-block rounded-full bg-green-700 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                                        SERVICE CATEGORY
                                    </span>

                                    <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                                        {category.category_name}
                                    </h1>

                                    <div className="my-2 h-1 w-24 rounded-full bg-orange-500" />

                                    <p className="max-w-xl text-sm leading-tight text-white/90 sm:text-base lg:text-lg">
                                        {category.category_description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-full flex-col">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-green-900 sm:text-3xl">
                                    Related Services
                                </h2>
                                <p className="mt-2 text-slate-600">
                                    Explore the services available under this category.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {category.services && category.services.length != 0 ? category.services.map((service) => (
                                    <div
                                        key={service.service_id}
                                        className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="overflow-hidden">
                                            {service.service_image && (<img
                                                src={`/storage/${service.service_image}`}
                                                alt={service.service_name}
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />)}
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold text-green-900 transition-colors group-hover:text-green-700">
                                                {service.service_name}
                                            </h3>

                                            <p className="mt-2 line-clamp-3 text-sm leading-tight text-slate-600">
                                                {service.service_description}
                                            </p>
                                        </div>
                                    </div>
                                )) : 'No related services available'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}