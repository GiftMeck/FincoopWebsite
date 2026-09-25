import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({
    serviceCategory,
    onUpdate,
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        category_name: '',
        category_description: '',
        category_image: null,
        _method: "PUT",
    });

    useEffect(() => {
        if (serviceCategory) {
            setData({
                category_name: serviceCategory.category_name ?? "",
                category_description: serviceCategory.category_description ?? "",
                category_image: serviceCategory.category_image ?? null,
                _method: "PUT",
            });
        }
    }, [serviceCategory]);

    const submit = (e) => {
        e.preventDefault();

        if (!serviceCategory) {
            return;
        }

        post(route("serviceCategories.update", serviceCategory.category_id), {
            forceFormData: true,
            onSuccess: (page) => {
                onUpdate(page.props.serviceCategories);
            }
        });
    };

    if (!serviceCategory) {
        return (
            <div className="bg-gray-100 rounded shadow-md p-8">
                <h1 className="text-xl font-semibold mb-4">
                    Edit Service Category
                </h1>

                <p className="text-gray-500">
                    Select a Service Category from the list to edit it.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 rounded shadow-md p-8">
            <h1 className="text-xl font-semibold mb-6">
                Edit Service Category
            </h1>

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
                        : "Update Service"}
                </button>

            </form>
        </div>
    );
}
