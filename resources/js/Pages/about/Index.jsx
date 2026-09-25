import NavBar from "@/Layouts/NavBar";
import { usePage, Link } from "@inertiajs/react";
export default function Index({abouts, onEdit}) {
    const Abouts = abouts
    const user = usePage().props.auth.user;
    const ActionSource = usePage().props.ActionSource;
    return (
        <>
            <div className="h-full bg-gray-100 shadow-md w-full flex flex-col border p-4">
                <h1 className="text-xl text-center font-semibold mb-4">About</h1>
                {Abouts && Abouts.data.map((About) =>(
                    <div key={About.about_id}
                        className="flex justify-between bg-white items-center p-4 border-2 border-gray-300 rounded-lg"
                    >
                        <div>
                            <span>{About.about_title}</span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onEdit(About)}
                            >
                                <span className="text-white mx-2 bg-blue-500 rounded-lg p-2">Edit</span>
                            </button>
                            <button
                               
                            >
                                <span className="text-white mx-2 bg-red-500 rounded-lg p-2">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="py-4">
                    {Abouts && (Abouts.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            preserveScroll
                            preserveState
                            className={`
                                px-4
                                py-2
                                rounded-lg
                                border

                                ${
                                    link.active
                                        ? "bg-green-700 text-white"
                                        : "bg-white text-green-900 hover:bg-green-100"
                                }

                                ${!link.url ? "pointer-events-none opacity-40" : ""}
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />

                    )))}
                </div>
            </div>
        </>
    );
}