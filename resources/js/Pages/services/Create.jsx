import { useState, useEffect } from "react"
import { useForm, usePage, Link } from "@inertiajs/react"
export default function Create() {
    const serviceCategories = usePage().props.serviceCategories;
    const branches = usePage().props.branches;
    const { data, setData, post, processing, errors } = useForm({
        service_name: '',
        service_description: '',
        category_id: 0,
        branch_id: 0,
        service_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('services.store'));
    };

    return(
        <div className="h-full w-full bg-gray-100 border p-4 flex justify-center shadow-md items-center">
            <div className="rounded px-4 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Services</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 h-full flex flex-col">
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.service_name}
                            onChange={(e) => setData('service_name', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.service_name && <div>{errors.service_name}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Service Description</label>
                        <textarea
                            value={data.service_description}
                            onChange={(e) => setData('service_description', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.service_description && <div>{errors.service_description}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Service Category</label>

                        <select
                            onChange={(e) => setData('category_id', e.target.value)}
                        >
                            <option value="">Select Service Category</option>

                            {serviceCategories && (serviceCategories.data.map((serviceCategory) => (
                                <option key={serviceCategory.category_id} value={serviceCategory.category_id}>
                                    {serviceCategory.category_name}
                                </option>
                            )))}
                        </select>

                        {errors.category_id && (
                            <div className="text-red-500">
                                {errors.category_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Service branch</label>

                        <select
                            onChange={(e) => setData('branch_id', e.target.value)}
                        >
                            <option value="">Select service branch</option>

                            {branches && (branches.map((branch) => (
                                <option key={branch.branch_id} value={branch.branch_id}>
                                    {branch.branch_name}
                                </option>
                            )))}
                        </select>

                        {errors.service_category_id && (
                            <div className="text-red-500">
                                {errors.service_category_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Service Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('service_image', e.target.files[0])}
                        />
                        {errors.service_image && <div>{errors.service_image}</div>}
                    </div>
                    <button className="bg-green-700 w-full text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}