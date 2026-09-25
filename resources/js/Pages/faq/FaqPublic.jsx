import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";

export default function FaqPublic() {
    const faqs = usePage().props.faqs;

    const [selectedFaq, setSelectedFaq] = useState(
        faqs?.[0] || null
    );

    const [hoveredFaq, setHoveredFaq] = useState(null);

    const displayedFaq = hoveredFaq || selectedFaq;
    const selectedIndex = faqs?.findIndex(
        (faq) => faq.faq_id === selectedFaq?.faq_id
    );

    const previousFaq =
        selectedIndex > 0
            ? faqs[selectedIndex - 1]
            : null;

    const nextFaq =
        selectedIndex < faqs?.length - 1
            ? faqs[selectedIndex + 1]
            : null;

    return (
        <>
            <NavBar />

            <div className="container bg-gray-100 p-4">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 bg-white lg:px-8">
                    <div className="p-8 rounded-lg">
                        <h2 className="text-9xl font-extrabold tracking-widest text-green-800 sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-2 text-lg text-gray-500">
                            Here are some of the most frequently asked questions about our services.
                        </p>
                        <div className="w-[100px] h-[4px] bg-orange-500/70 my-2 rounded-s-full"></div>
                        <div
                            className="
                                max-w-[500px]
                                rounded-full
                                border
                                bg-green-900/20
                                px-4
                                py-2
                                mt-8
                                font-semibold
                                uppercase
                                tracking-[0.3em]
                                text-green-800
                                backdrop-blur-md
                                sm:text-sm
                            "
                        >
                           <span className="text-xs">DIRECTING TOWARDS FINANCIAL FREEDOM</span> 
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-8 shadow-lg rounded-3xl p-8 transition-shadow duration-300 hover:shadow-3xl">

                        <div className="col-span-12 lg:col-span-6 flex flex-col p-8 items-start justify-center">

                            <div className="p-4">
                                {faqs &&
                                    faqs.map((faq) => (
                                        <Link
                                            key={faq.faq_id}
                                            onMouseEnter={() =>
                                                setHoveredFaq(faq)
                                            }
                                            onClick={() =>
                                                setSelectedFaq(faq)
                                            }
                                            href={route('faqs.public.show', faq.faq_id)}
                                        >
                                            <div
                                            className="
                                                text-lg 
                                                cursor-pointer 
                                                p-2 
                                                rounded-lg 
                                                text-gray-500 
                                                hover:bg-green-900/20 
                                                hover:text-green-800 
                                                transition-all 
                                                duration-300 
                                                ease-in-out"
                                            >
                                                <h3 className="font-bold">
                                                {`${faq.faq_id} - ${faq.faq_question}`}
                                                </h3>

                                                <p className="text-sm ml-4">
                                                    {`-${faq.faq_answer}`}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                <div className="flex items-center justify-between mt-6 px-4">
                                    {previousFaq ? (
                                        <button
                                            onClick={() =>
                                                setSelectedFaq(previousFaq)
                                            }
                                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300"
                                        >
                                            Previous
                                        </button>
                                    ) : (
                                        <span className="text-sm text-gray-300">
                                            Previous
                                        </span>
                                    )}
                                    <span className="text-sm text-gray-400">
                                        {selectedIndex + 1} / {faqs?.length}
                                    </span>
                                    {nextFaq ? (
                                        <button
                                            onClick={() =>
                                                setSelectedFaq(nextFaq)
                                            }
                                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <span className="text-sm text-gray-300">
                                            Next
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="col-span-12 lg:col-span-6 h-[550px]">

                            <Link
                                href={route(
                                    "faqs.public.show",
                                    displayedFaq.faq_id
                                )}
                                className="block h-full cursor-pointer"
                            >
                                <div className="flex h-full flex-col items-center justify-center">

                                    <div className="w-full h-full shrink-0 overflow-hidden rounded-lg">

                                        <img
                                            src={`/storage/${displayedFaq.demo_photo}`}
                                            alt="Demo Photo"
                                            className="h-full w-full object-cover"
                                        />

                                    </div>

                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}