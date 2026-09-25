import { useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        about_title: '',
        about_description: '',
        about_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('about.store', {ActionSource: false}));
    };

    return (
        <div className="bg-gray-100 rounded shadow-md p-8">
            <h1 className="text-xl text-center font-semibold mb-4">Create About Content</h1>
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
                <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                    Create
                </button>
            </form>
        </div>
    );
}