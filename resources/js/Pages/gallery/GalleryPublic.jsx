import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage, Link } from "@inertiajs/react";
export default function GalleryPublic() {
    const { galleries } = usePage().props;
    return(
    <>
        <NavBar />
        <div className="container bg-gray-100 p-4">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {galleries && (
                        galleries.map((gallery) =>(
                            <Link
                                key={gallery.gallery_id}
                                href={route('gallery.public.show', gallery.gallery_id)}
                                className="transition cursor-pointer duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:z-50"
                            >
                                <div className="relative rounded-xl overflow-hidden">
                                    <img
                                        src={`/storage/${gallery.gallery_image}`}
                                        alt="Gallery"
                                        className="h-64 w-full rounded-lg object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50">
                                        <div
                                            className="text-white bg-green-900 w-full p-2 text-sm font-bold"
                                        >
                                            <h3>
                                                {gallery.gallery_title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link> 
                        )
                    ))}
                </div>
            </div>
        </div>
        <Footer />
    </>
    )
}