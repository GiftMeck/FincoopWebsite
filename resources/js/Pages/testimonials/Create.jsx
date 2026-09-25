import { useForm, usePage, Link } from "@inertiajs/react";
export default function Create() {
    const {flash} = usePage().props;
    const partners = usePage().props.partners ?? [];
    const customers = usePage().props.customers ?? [];
    const { data, setData, post, processing, errors } = useForm({
        testimonial_title: '',
        testimonial_content: '',
        customer_id: null,
        partner_id: null,
        testimonial_image: null,
    });
    
    const submit = (e) => {
        e.preventDefault();
        post(route('testimonials.store'));
    };

    return (
        <div className="p-6 flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Testimonials</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Testimonial title</label>
                        <input
                            type="text"
                            value={data.testimonial_title}
                            onChange={(e) =>{
                                if(flash.success){
                                    flash.success = null;
                                }
                                setData('testimonial_title', e.target.value)
                            }}
                            className="border rounded p-2"
                        />
                        {errors.testimonial_title && <div>{errors.testimonial_title[0]}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Testimonial Description</label>
                        <textarea
                            value={data.testimonial_content}
                            onChange={(e) => {
                                if(flash.success){
                                    flash.success = null;
                                }
                                setData('testimonial_content', e.target.value)
                            }}
                            className="border rounded p-2"
                        />
                        {errors.testimonial_content && <div>{errors.testimonial_content[0]}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Customers</label>

                        <select
                            onChange={(e) => setData('customer_id', e.target.value)}
                        >
                            <option value="">Select customer</option>

                            {customers.map((customer) => (
                                <option key={customer.customer_id} value={customer.customer_id}>
                                    {customer.customer_name}
                                </option>
                            ))}
                        </select>

                        {errors.customer_id && (
                            <div className="text-red-500">
                                {errors.customer_id[0]}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Partners</label>

                        <select
                            onChange={(e) => setData('partner_id', e.target.value)}
                        >
                            <option value="">Select partner</option>

                            {partners.map((partner) => (
                                <option key={partner.partner_id} value={partner.partner_id}>
                                    {partner.partner_name}
                                </option>
                            ))}
                        </select>

                        {errors.partner_id && (
                            <div className="text-red-500">
                                {errors.partner_id[0]}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Testimonial Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('testimonial_image', e.target.files[0])}
                        />
                        {errors.testimonial_image && <div>{errors.testimonial_image[0]}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}