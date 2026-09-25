import { useState, useEffect } from "react"
import { useForm, usePage, Link } from "@inertiajs/react"
export default function Create() {
    const documentOwner = usePage().props.auth.user.name ?? '';
    const { data, setData, post, processing, errors } = useForm({
        document_name: '',
        document_type: '',
        document_status: '',
        document_owner: '',
        document_description: '',
        document_path: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('documents.store'));
    };

    return(
        <div className="h-full w-full bg-gray-100 border p-4 flex justify-center shadow-md items-center">
            <div className="rounded px-4 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Document</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Document Name</label>
                        <input
                            type="text"
                            value={data.document_name}
                            onChange={(e) => setData('document_name', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.document_name && <div>{errors.document_name}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Document Type</label>
                        <input
                            type="text"
                            value={data.document_type}
                            onChange={(e) => setData('document_type', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.document_type && <div>{errors.document_type}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Document Status</label>
                        <select 
                            value={data.document_status}
                            onChange={(e) => setData('document_status', e.target.value)}
                        >
                            <option value="">Select document status</option>
                            <option key={`active`} value="active">Active</option>
                            <option key={`inactive`} value="inactive">Inactive</option>
                        </select>
                        {errors.document_status && <div>{errors.document_status}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Document Owner</label>
                        <select 
                            value={data.document_owner}
                            onChange={(e) => setData('document_owner', e.target.value)}
                        >
                            <option value="">Select Document Owner</option>
                            <option key={documentOwner} value={documentOwner}>{documentOwner}</option>
                        </select>
                        {errors.document_owner && <div>{errors.document_owner}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Description</label>
                        <textarea
                            value={data.document_description}
                            onChange={(e) => setData('document_description', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.document_description && <div>{errors.document_description}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Document</label>
                        <input
                            type="file"
                            onChange={(e) => setData('document_path', e.target.files[0])}
                        />
                        {errors.document_path && <div>{errors.document_path}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}