import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Edit({testimonial, onUpdate }) {
    const { customers, partners } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        testimonial_title: "",
        testimonial_content: "",
        partner_id: "",
        customer_id: "",
        testimonial_image: '',
        _method: "PUT",
    });

    useEffect(() => {
        if (testimonial){
            setData({
                testimonial_title: testimonial.testimonial_title ?? "",
                testimonial_content: testimonial.testimonial_content ?? "",
                partner_id: testimonial.partner_id ?? "",
                customer_id: testimonial.customer_id ?? "",
                testimonial_image: null,
                _method: "PUT",
            });
        }
    }, [testimonial]);
    
    const submit = (e) => {
        e.preventDefault();
        if (!testimonial || processing) return;

        post(route("testimonials.update", testimonial.testimonial_id), {
            forceFormData: true,
            onSuccess: (page) => {
                onUpdate?.(page.props.testimonials);
            },
        });
    };

    return (
        <div className="p-6 flex justify-center items-center h-full">
            <div className="bg-gray-100 rounded shadow-md p-6 flex flex-col w-full">
                <h1 className="text-xl text-center font-semibold mb-4">
                    Edit Testimonial
                </h1>

                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Testimonial title</label>
                        <input
                            type="text"
                            value={data.testimonial_title}
                            onChange={(e) =>
                                setData("testimonial_title", e.target.value)
                            }
                            className="border rounded p-2"
                        />
                        {errors.testimonial_title && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.testimonial_title}
                            </div>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label>Testimonial Description</label>
                        <textarea
                            value={data.testimonial_content}
                            onChange={(e) =>
                                setData("testimonial_content", e.target.value)
                            }
                            className="border rounded p-2"
                            rows={4}
                        />
                        {errors.testimonial_content && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.testimonial_content}
                            </div>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label>Customer</label>
                        <select
                            value={data.customer_id ?? ""}
                            onChange={(e) =>
                                setData("customer_id", e.target.value)
                            }
                            className="border rounded p-2"
                        >
                            <option value="">Select customer</option>
                            {customers?.data?.map((customer) => (
                                <option
                                    key={customer.customer_id}
                                    value={customer.customer_id}
                                >
                                    {customer.customer_name}
                                </option>
                            ))}
                        </select>
                        {errors.customer_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.customer_id}
                            </div>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label>Partner</label>
                        <select
                            value={data.partner_id ?? ""}
                            onChange={(e) =>
                                setData("partner_id", e.target.value)
                            }
                            className="border rounded p-2"
                        >
                            <option value="">Select partner</option>
                            {partners?.data?.map((partner) => (
                                <option
                                    key={partner.partner_id}
                                    value={partner.partner_id}
                                >
                                    {partner.partner_name}
                                </option>
                            ))}
                        </select>
                        {errors.partner_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.partner_id}
                            </div>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label>Testimonial Image</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("testimonial_image", e.target.files[0])
                            }
                        />
                        {errors.testimonial_image && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.testimonial_image}
                            </div>
                        )}
                    </div>

                    <button
                        className="bg-green-700 text-white rounded p-2 w-full disabled:opacity-50"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? "Saving…" : "Update Testimonial"}
                    </button>
                </form>
            </div>
        </div>
    );
}