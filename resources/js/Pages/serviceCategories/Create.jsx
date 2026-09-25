import { useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        category_name: '',
        category_description: '',
        category_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('serviceCategories.store'));
    };

    return (
        <div className="h-full w-full bg-gray-100 border p-4 flex justify-center shadow-md items-center">
            <div className="rounded px-4 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Service Category</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.category_name}
                            onChange={(e) => setData('category_name', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.category_name && <div>{errors.category_name}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Description</label>
                        <textarea
                            value={data.category_description}
                            onChange={(e) => setData('category_description', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.category_description && <div>{errors.category_description}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('category_image', e.target.files[0])}
                        />
                        {errors.category_image && <div>{errors.category_image}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
