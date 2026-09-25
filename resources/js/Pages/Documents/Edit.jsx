import { usePage, useForm, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
export default function Edit({ document, onUpdate }) {
      const {
            data,
            setData,
            post,
            processing,
            errors,
        } = useForm({
            document_name: '',
            document_type: '',
            document_path: '',
            document_status: '',
            document_owner: null,
            document_description: '',
            _method: "PUT",
        });
    
        useEffect(() => {
            if (document) {
                setData({
                    document_name: document.document_name,
                    document_type: document.document_type,
                    document_path: document.document_path,
                    document_status: document.document_status,
                    document_owner: document.document_owner,
                    document_description: document.document_description,
                    _method: "PUT",
                });
            }
        }, [document]);
    
        const submit = (e) => {
            e.preventDefault();
    
            if (!document) {
                return;
            }
    
            post(route("documents.update", document.document_id), {
                forceFormData: true,
                onSuccess: (page) => {
                    onUpdate(page.props.documents);
                }
            });
        };
    
        if (!document) {
            return (
                <div className="bg-gray-100 rounded shadow-md p-8">
                    <h1 className="text-xl font-semibold mb-4">
                        Edit Document
                    </h1>
    
                    <p className="text-gray-500">
                        Select a Document from the list to edit it.
                    </p>
                </div>
            );
        }
    return (
        <div className="bg-gray-100 rounded shadow-md p-8">
            <h1 className="text-xl font-semibold mb-6">
                Edit Document
            </h1>

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
                        <option key={data.document_owner} value={data.document_owner}>{data.document_owner}</option>
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

                <button
                    type="submit"
                    disabled={processing}
                    className="
                        w-full
                        bg-green-700
                        hover:bg-green-800
                        text-white
                        rounded
                        p-2
                    "
                >
                    {processing
                        ? "Updating..."
                        : "Update Document"}
                </button>

            </form>
        </div>
    )
}