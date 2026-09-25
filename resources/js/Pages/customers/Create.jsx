import { useForm } from "@inertiajs/react";
export default function Create({containerStyles='', subContainerStyles=''}) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('customers.store', {ActionSource: false}));
    };

    return (
        <div className={containerStyles}>
            <div className={subContainerStyles}>
                <form onSubmit={submit} className="text-gray-600 pt-4">
                    <div className="mb-4 flex flex-col bg-gradient-to-br
                ">
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.customer_name}
                            onChange={(e) => setData('customer_name', e.target.value)}
                            className="border-slate-400 border rounded-lg p-2"
                        />
                        {errors.customer_name && <div>{errors.customer_name}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Email (Optional)</label>
                        <input
                            type="text"
                            value={data.customer_email}
                            onChange={(e) => setData('customer_email', e.target.value)}
                            className="border-slate-400 border rounded-lg p-2"
                        />
                        {errors.customer_email && <div>{errors.customer_email}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={data.customer_phone}
                            onChange={(e) => setData('customer_phone', e.target.value)}
                            className="border-slate-400 border rounded-lg p-2"
                        />
                        {errors.customer_phone && <div>{errors.customer_phone}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Message</label>
                        <textarea
                            value={data.customer_message}
                            onChange={(e) => setData('customer_message', e.target.value)}
                            className="border-slate-400 border rounded-lg p-2"
                        />
                        {errors.customer_message && <div>{errors.customer_message}</div>}
                    </div>
                    <button className="bg-green-800 text-green-100 tracking-widest font-semibold text-sm uppercase rounded p-2" type="submit" disabled={processing}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
} 