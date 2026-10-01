import { useForm, usePage, Link } from "@inertiajs/react";
export default function Create() {
    const branches = usePage().props.branches ?? [];
    const partners = usePage().props.partners ?? [];
    const { data, setData, post, processing, errors } = useForm({
        contact_number: '',
        contact_email: '',
        contact_physical_address: '',
        branch_id: null,
        partner_id: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store', {ActionSource: 'finprivate'}));
    };

    return (
        <div className="p-6 flex justify-center items-center h-full flex-1">
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Contacts</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Contact number</label>
                        <input
                            type="text"
                            value={data.contact_number}
                            onChange={(e) => setData('contact_number', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.contact_number && <div>{errors.contact_number}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Email</label>
                        <input
                            value={data.contact_email}
                            onChange={(e) => setData('contact_email', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.contact_email && <div>{errors.contact_email}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Physical address</label>
                        <textarea
                            value={data.contact_physical_address}
                            onChange={(e) => setData('contact_physical_address', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.contact_physical_address && <div>{errors.contact_physical_address}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Branch</label>

                        <select
                            onChange={(e) => setData('branch_id', e.target.value)}
                        >
                            <option value="">Select Branch</option>

                            {branches && (branches.map((branch) => (
                                <option key={branch.branch_id} value={branch.branch_id}>
                                    {branch.branch_name}
                                </option>
                            )))}
                        </select>

                        {errors.branch_id && (
                            <div className="text-red-500">
                                {errors.branch_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Partner</label>

                        <select
                            onChange={(e) => setData('partner_id', e.target.value)}
                        >
                            <option value="">Select Partner</option>

                            {partners && (partners.data.map((partner) => (
                                <option key={partner.partner_id} value={partner.partner_id}>
                                    {partner.partner_name}
                                </option>
                            )))}
                        </select>

                        {errors.partner_id && (
                            <div className="text-red-500">
                                {errors.partner_id}
                            </div>
                        )}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}