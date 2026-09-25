import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage, Link } from "@inertiajs/react";
export default function TestimonialsPublic() {
    const { testimonials } = usePage().props;
    return(
        <>
            <NavBar />

            <div className="container bg-gray-100 p-4">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-9 bg-white rounded-3xl flex flex-col p-8 items-start justify-center">
                            <div className="p-8">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-900">
                                    Testimonials
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    See what our customers have to say about us
                                </p>

                                <div className="w-[100px] h-[4px] bg-orange-500/70 my-2 rounded-s-full"></div>
                            </div>
                        </div>
                        {testimonials && (
                            testimonials.map((testimonial) => (
                                <Link
                                    href={route('testimonials.public.show', testimonial.testimonial_id)}
                                    key={testimonial.testimonial_id}
                                    className="col-span-12 sm:col-span-6 lg:col-span-3 cursor-pointer hover:shadow-3xl hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    <div className="flex flex-col items-center justify-center shadow-lg rounded-lg bg-white p-8">

                                        <img
                                            src={`/storage/${testimonial.testimonial_image}`}
                                            alt="Testimonial Image"
                                            className="h-20 w-20 rounded-full object-cover"
                                        />

                                        <div className="text-gray-400 w-full p-2 text-sm font-bold">
                                            <p className="text-sm py-4">
                                                "{testimonial.testimonial_content}"
                                            </p>
                                            <span className="
                                                mt-4
                                                inline-block
                                                rounded-full
                                                bg-green-700
                                                px-4
                                                py-2
                                                text-xs
                                                uppercase
                                                tracking-widest
                                                text-white
                                                backdrop-blur-sm
                                            ">
                                                {testimonial.customer.customer_name}
                                            </span>
                                        </div>

                                    </div>
                                </Link>
                            ))
                        )}

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}