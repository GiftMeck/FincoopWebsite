import { usePage } from "@inertiajs/react";
import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
export default function Show() {
    const {testimonial} = usePage().props;
 return (
    <>
        <NavBar />
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="
                    relative
                    min-h-[500px]
                    overflow-hidden
                    rounded-2xl
                    shadow-2xl
                    sm:min-h-[600px]
                    lg:min-h-[700px]
                ">
                    <img
                        src={`/storage/${testimonial.testimonial_image}`}
                        alt={testimonial.testimonial_title}
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />
                    <div className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/90
                        via-black/40
                        to-black/10
                    " />
                    <div className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-6
                        sm:p-10
                        lg:p-14
                    ">
                        <div className="max-w-4xl">
                            <span className="
                                mb-4
                                inline-block
                                rounded-full
                                bg-green-700/80
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-widest
                                text-white
                                backdrop-blur-sm

                                sm:text-sm
                            ">
                                {testimonial.customer.customer_name}
                            </span>
                            <h1 className="
                                text-3xl
                                font-black
                                leading-tight
                                text-white

                                sm:text-4xl
                                lg:text-6xl
                            ">
                                {testimonial.testimonial_title}
                            </h1>
                            <div className="
                                my-5
                                h-1
                                w-20
                                rounded-full
                                bg-orange-500

                                sm:w-28
                            " />
                            <p className="
                                max-w-3xl
                                text-sm
                                leading-7
                                text-white/90

                                sm:text-base
                                sm:leading-8
                                lg:text-lg
                            ">
                                {testimonial.testimonial_content}
                            </p>

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <Footer />
    </>
 )
};