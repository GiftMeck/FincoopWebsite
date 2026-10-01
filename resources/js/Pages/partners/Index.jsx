import NavBar from "@/Layouts/NavBar";
import Create from "./Create";
import { useState } from "react";
import {usePage, useForm, Link} from "@inertiajs/react";
export default function Index({partners, onEdit}) {
    const ActionSource = usePage().props.ActionSource;
    /*
    const deletePartner = (e, partner) => {
            e.preventDefault();
            console.log(partner);
            //post(route("partners.destroy", partner.partner_id));
        };
    */
    return (
        <>
            <div className="h-full bg-gray-100 shadow-md w-full flex flex-col border p-4">
                <h1 className="text-xl text-center font-semibold mb-4">Partners</h1>
                {partners && partners.data.map((partner) =>(
                    <div key={partner.partner_id}
                        className="flex justify-between bg-white items-center p-4 border-2 border-gray-300 rounded-lg"
                    >
                        <div>
                            <span>{partner.partner_name}</span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onEdit(partner)}
                            >
                                <span className="text-white mx-2 bg-blue-500 rounded-lg p-2">Edit</span>
                            </button>
                            <button
                               onClick={() => {}}
                            >
                                <span className="text-white mx-2 bg-red-500 rounded-lg p-2">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="py-4">
                    {partners && (partners.links.map((link, index) => (
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