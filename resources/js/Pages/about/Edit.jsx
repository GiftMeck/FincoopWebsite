import { usePage, useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
export default function Edit({about, onUpdate}) {
         const {
                data,
                setData,
                post,
                processing,
                errors,
            } = useForm({
                about_title: '',
                about_description: '',
                about_image: null,
                _method: "PUT"
            });
        
            useEffect(() => {
                if (about) {
                    setData({
                        about_title: about.about_title,
                        about_description: about.about_description,
                        about_image: about.about_image,
                        _method: "PUT",
                    });
                }
            }, [about]);
        
            const submit = (e) => {
                e.preventDefault();
        
                if (!about) {
                    return;
                }
        
                post(route("about.update", about.about_id), {
                    forceFormData: true,
                    onSuccess: (page) => {
                        onUpdate(page.props.abouts);
                    }
                });
            };
        
            if (!about) {
                return (
                    <div className="bg-gray-100 rounded shadow-md p-8">
                        <h1 className="text-xl font-semibold mb-4">
                            Edit About
                        </h1>
        
                        <p className="text-gray-500">
                            Select a About from the list to edit it.
                        </p>
                    </div>
                );
            }
    return (
        <div className="bg-gray-100 rounded shadow-md p-8">
            <h1 className="text-xl text-center font-semibold mb-4">Edit About Content</h1>
            <form onSubmit={submit}>
                <div className="mb-4 flex flex-col">
                    <label>About Title</label>
                    <input
                        type="text"
                        value={data.about_title}
                        onChange={(e) => setData('about_title', e.target.value)}
                        className="border rounded p-2"
                    />
                    {errors.about_title && <div>{errors.about_title[0]}</div>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label>About Description</label>
                    <textarea
                        value={data.about_description}
                        onChange={(e) => setData('about_description', e.target.value)}
                        className="border rounded p-2"
                    />
                    {errors.about_description && <div>{errors.about_description}</div>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label>About Image</label>
                    <input
                        type="file"
                        onChange={(e) => setData('about_image', e.target.files[0])}
                    />
                    {errors.about_image && <div>{errors.about_image}</div>}
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