import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({
    service,
    serviceCategories = [],
    branches = [],
    onUpdated,
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        service_name: "",
        service_description: "",
        category_id: "",
        branch_id: "",
        service_image: null,
        _method: "PUT",
    });

    useEffect(() => {
        if (service) {
            setData({
                service_name: service.service_name ?? "",
                service_description: service.service_description ?? "",
                category_id: service.category_id ?? "",
                branch_id: service.branch_id ?? "",
                service_image: null,
                _method: "PUT",
            });
        }
    }, [service]);

    const submit = (e) => {
        e.preventDefault();

        if (!service) {
            return;
        }

        post(route("services.update", service.service_id), {
            forceFormData: true,
            onSuccess: (page) => {
                onUpdated(page.props.services);
            }
        });
    };

    if (!service) {
        return (
            <div className="bg-gray-100 rounded shadow-md p-8">
                <h1 className="text-xl font-semibold mb-4">
                    Edit Service
                </h1>

                <p className="text-gray-500">
                    Select a service from the list to edit it.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 rounded shadow-md p-8">
            <h1 className="text-xl font-semibold mb-6">
                Edit Service
            </h1>

            <form onSubmit={submit}>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1">
                        Service Name
                    </label>

                    <input
                        type="text"
                        value={data.service_name}
                        onChange={(e) =>
                            setData(
                                "service_name",
                                e.target.value
                            )
                        }
                        className="border rounded p-2"
                    />

                    {errors.service_name && (
                        <div className="text-red-500 text-sm">
                            {errors.service_name}
                        </div>
                    )}
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1">
                        Service Description
                    </label>

                    <textarea
                        value={data.service_description}
                        onChange={(e) =>
                            setData(
                                "service_description",
                                e.target.value
                            )
                        }
                        className="border rounded p-2"
                        rows="5"
                    />

                    {errors.service_description && (
                        <div className="text-red-500 text-sm">
                            {errors.service_description}
                        </div>
                    )}
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1">
                        Service Category
                    </label>

                    <select
                        value={data.category_id}
                        onChange={(e) =>
                            setData(
                                "category_id",
                                e.target.value
                            )
                        }
                        className="border rounded p-2"
                    >
                        <option value="">
                            Select Service Category
                        </option>

                        {serviceCategories.data.map(
                            (serviceCategory) => (
                                <option
                                    key={
                                        serviceCategory.category_id
                                    }
                                    value={
                                        serviceCategory.category_id
                                    }
                                >
                                    {
                                        serviceCategory.category_name
                                    }
                                </option>
                            )
                        )}
                    </select>

                    {errors.category_id && (
                        <div className="text-red-500 text-sm">
                            {errors.category_id}
                        </div>
                    )}
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1">
                        Service Branch
                    </label>

                    <select
                        value={data.branch_id}
                        onChange={(e) =>
                            setData(
                                "branch_id",
                                e.target.value
                            )
                        }
                        className="border rounded p-2"
                    >
                        <option value="">
                            Select Service Branch
                        </option>

                        {branches.map((branch) => (
                            <option
                                key={branch.branch_id}
                                value={branch.branch_id}
                            >
                                {branch.branch_name}
                            </option>
                        ))}
                    </select>

                    {errors.branch_id && (
                        <div className="text-red-500 text-sm">
                            {errors.branch_id}
                        </div>
                    )}
                </div>
                <div className="mb-6 flex flex-col">
                    <label className="mb-1">
                        Replace Service Image
                    </label>

                    <input
                        type="file"
                        onChange={(e) =>
                            setData(
                                "service_image",
                                e.target.files[0]
                            )
                        }
                    />
                    {errors.service_image && (
                        <div className="text-red-500 text-sm">
                            {errors.service_image}
                        </div>
                    )}
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