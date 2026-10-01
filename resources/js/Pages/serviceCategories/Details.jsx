import { usePage, Link } from "@inertiajs/react";
import Footer from "@/Layouts/Footer";
import NavBar from "@/Layouts/NavBar";
import { FaArrowRight } from "react-icons/fa";
export default function Details(){
    serviceCategoryDetails = usePage().props.serviceCategories
    if(!serviceCategories){
        return (
            <div className="max-w-[700px] m-auto">
                <h1 className="text-3xl">No Service Category details available</h1>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {serviceCategoryDetails && (
                serviceCategoryDetails.map((category) => (
                <Link
                    href={route('serviceCategories.public.show', category.category_id)}
                    key={category.category_id}
                    className="
                        overflow-hidden
                        rounded-2xl
                        bg-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-2xl
                        cursor-pointer
                    "
                >
                    <div className="flex h-full flex-col md:flex-row">
                        <img
                            src={category ? `storage/${category.category_image}` : ""}
                            alt={category.category_name}
                            className="
                                h-56
                                w-full
                                object-cover
                                md:h-auto
                                md:w-56
                                lg:w-64
                            "
                        />
                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-green-900
                                    sm:text-2xl
                                    lg:text-3xl
                                "
                            >
                                {category.category_name}
                            </h2>

                            <p
                                className="
                                    mt-3
                                    line-clamp-5
                                    text-sm
                                    leading-tight
                                    text-gray-600
                                    sm:text-base
                                    lg:text-lg
                                "
                            >
                                {category.category_description}
                            </p>

                            <Link
                                href={route('serviceCategories.public.show', category.category_id)}
                                className="
                                    mt-auto
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-3
                                    rounded-full
                                    border
                                    bg-green-800
                                    px-5
                                    py-3
                                    text-sm
                                    font-medium
                                    text-white
                                    transition-colors
                                    duration-300
                                    hover:bg-green-900
                                    sm:px-6
                                    sm:text-base
                                "
                            >
                                Read More
                                <FaArrowRight className="text-orange-500" />
                            </Link>
                        </div>
                    </div>
                </Link>
            ))
            )}
        </div>
    )
}