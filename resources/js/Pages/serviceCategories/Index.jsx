import Create from '@/Pages/serviceCategories/Create';
import Delete from '@/Pages/serviceCategories/Delete';
import Edit from '@/Pages/serviceCategories/Edit';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
export default function Index({ serviceCategories, onEdit }) {
    const serviceCategoriesData = serviceCategories || usePage().props.serviceCategories;
    return (
        <>
            <div className="h-full bg-gray-100 shadow-md w-full flex flex-col border p-4">
                <h1 className="text-xl text-center font-semibold mb-4">Service Categories</h1>
                {serviceCategories && serviceCategories.data.map((serviceCategory) =>(
                    <div key={serviceCategory.category_id}
                        className="flex justify-between bg-white items-center p-4 border-2 border-gray-300 rounded-lg"
                    >
                        <div>
                            <span>{serviceCategory.category_name}</span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onEdit(serviceCategory)}
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
                    {serviceCategories && (serviceCategories.links.map((link, index) => (
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
