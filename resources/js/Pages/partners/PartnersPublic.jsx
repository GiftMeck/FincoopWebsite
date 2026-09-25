import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";

export default function PartnersPublic() {
    const { partners } = usePage().props;

    const [selectedPartner, setSelectedPartner] = useState(
        partners?.[0] || null
    );

    const [hoveredPartner, setHoveredPartner] = useState(null);

    const displayedPartner = hoveredPartner || selectedPartner;

    if (!partners || partners.length === 0) {
        return (
            <>
                <NavBar />

                <div className="container">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <p>No partners available.</p>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="container bg-gray-100 p-4">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 bg-white gap-8 shadow-lg rounded-lg p-8 transition-shadow duration-300 hover:shadow-3xl">
                        <div className="col-span-12 lg:col-span-6 flex flex-col p-8 items-start justify-center">
                            <div className="p-8">
                                {partners.map((partner) => (
                                    <h2
                                        key={partner.partner_id}
                                        onMouseEnter={() =>
                                            setHoveredPartner(partner)
                                        }
                                        onClick={() =>
                                            setSelectedPartner(partner)
                                        }
                                        className="text-xl cursor-pointer font-bold text-green-900 hover:underline-offset-2 transition-all duration-300 ease-in-out hover:underline"
                                    >
                                        {`${partner.partner_id} - ${partner.partner_name}`}
                                    </h2>
                                ))}

                                <div className="w-[100px] h-[4px] bg-orange-500/70 mt-4 rounded-s-full"></div>

                            </div>

                        </div>
                        <div className="col-span-12 lg:col-span-6 h-[550px]">

                            <Link
                                href={route(
                                    "partners.public.show",
                                    displayedPartner.partner_id
                                )}
                                className="block h-full cursor-pointer"
                            >
                                <div className="flex h-full flex-col items-center justify-center">
                                    <div className="w-full h-[300px] shrink-0 overflow-hidden rounded-lg">

                                        <img
                                            src={`/storage/${displayedPartner.partner_logo}`}
                                            alt="Partner Logo"
                                            className="h-full w-full object-cover"
                                        />

                                    </div>
                                    <div className="text-gray-500 w-full p-2 text-sm font-bold">

                                        <h2 className="text-xl text-green-900">
                                            {displayedPartner.partner_name}
                                        </h2>

                                        <p className="text-sm py-4">
                                            {displayedPartner.partner_description}
                                        </p>

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