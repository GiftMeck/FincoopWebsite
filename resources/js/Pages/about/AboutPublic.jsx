import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage } from "@inertiajs/react";

export default function AboutPublic() {

    const abouts = usePage().props.abouts ?? [];

    return (
        <>
            <NavBar />
            <div className="bg-gray-100 p-4">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="container">
                        {abouts.map((about, index) => (
                            <div
                                key={about.about_id ?? index}
                                className="
                                    grid
                                    grid-cols-12
                                    overflow-hidden
                                    rounded-3xl
                                    bg-white
                                    shadow-xl
                                    mb-10
                                "
                            >
                                <div
                                    className="
                                        relative
                                        flex
                                        items-end
                                        min-h-[450px]
                                        overflow-hidden
                                        col-span-4
                                    "
                                >
                                    <div className="
                                        absolute
                                        inset-0
                                    " />
                                    <div
                                        className="
                                            relative
                                            z-10
                                            w-full
                                            p-6
                                            sm:p-8
                                            lg:p-10
                                        "
                                    >

                                        <span className="
                                            inline-block
                                            rounded-full
                                            bg-green-700
                                            px-4
                                            py-2
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-widest
                                            text-white
                                            backdrop-blur-md
                                        ">
                                            ABOUT
                                        </span>
                                        <h1
                                            className="
                                                mt-4
                                                text-4xl
                                                font-bold
                                                leading-tight
                                                text-green-900
                                                sm:text-5xl
                                            "
                                        >
                                            {about.about_title}
                                        </h1>


                                        <div
                                            className="
                                                mt-4
                                                mb-6
                                                h-1
                                                w-24
                                                rounded-full
                                                bg-orange-500
                                            "
                                        />


                                        <div
                                            className="
                                                max-w-xl
                                                text-base
                                                leading-7
                                                text-gray-500
                                                sm:text-lg
                                                sm:leading-8
                                            "
                                        >
                                            <p>
                                                {about.about_description}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                                <div
                                    className="
                                        min-h-[350px]
                                        overflow-hidden
                                        col-span-8
                                    "
                                >

                                    <img
                                        src={`/storage/${about.about_image}`}
                                        alt={about.about_title}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            hover:scale-105
                                        "
                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}