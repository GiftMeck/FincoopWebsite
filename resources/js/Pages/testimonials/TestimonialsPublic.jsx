import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage, Link } from "@inertiajs/react";

export default function TestimonialsPublic() {
    const { testimonials } = usePage().props;

    return (
        <>
            <NavBar />

            <section className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <header className="mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900">
                            Testimonials
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            See what our customers have to say about us
                        </p>
                        <div className="mt-3 w-24 h-1 bg-orange-500/70 rounded-full" />
                    </header>
                    {testimonials?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {testimonials.map((testimonial) => (
                                <Link
                                    key={testimonial.testimonial_id}
                                    href={route(
                                        "testimonials.public.show",
                                        testimonial.testimonial_id
                                    )}
                                    className="group block h-full"
                                >
                                    <article className="h-full flex flex-col items-center text-center rounded-2xl bg-white p-5 sm:p-6 shadow-md transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
                                        <img
                                            src={`/storage/${testimonial.testimonial_image}`}
                                            alt={testimonial.customer?.customer_name ?? "Customer"}
                                            loading="lazy"
                                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover shrink-0 ring-2 ring-green-100"
                                        />

                                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-700 line-clamp-5">
                                            “{testimonial.testimonial_content}”
                                        </p>

                                        <span className="mt-4 inline-block rounded-full bg-green-700 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-white">
                                            {testimonial.customer?.customer_name}
                                        </span>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-12">
                            No testimonials yet.
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}