import { useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        partner_name: '',
        partner_logo: '',
        partner_description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('partners.store'));
    };

    return (
        <div className="p-6 flex justify-center items-center h-full">
            <div className="bg-gray-100 rounded shadow-md p-6 flex flex-col w-full">
                <h1 className="text-xl text-center font-semibold mb-4">Create Partners</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Partner Name</label>
                        <input
                            type="text"
                            value={data.partner_name}
                            onChange={(e) => setData('partner_name', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.partner_name && <div>{errors.partner_name}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Partner Description</label>
                        <textarea
                            value={data.partner_description}
                            onChange={(e) => setData('partner_description', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.partner_description && <div>{errors.partner_description}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Partner Logo</label>
                        <input
                            type="file"
                            onChange={(e) => setData('partner_logo', e.target.files[0])}
                        />
                        {errors.partner_logo && <div>{errors.partner_logo}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}