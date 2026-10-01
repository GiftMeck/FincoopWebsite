import { useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        branch_name: '',
        branch_address: '',
        branch_phone: '',
        branch_email: '',
        social_media_links: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('branches.store', {ActionSource: false}));
    };

    return (
        <div className="p-6 flex justify-center items-center h-full">
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Branches</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Branch Name</label>
                        <input
                            type="text"
                            value={data.branch_name}
                            onChange={(e) => setData('branch_name', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.branch_name && <div>{errors.branch_name}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Branch Address</label>
                        <textarea
                            type="text"
                            value={data.branch_address}
                            onChange={(e) => setData('branch_address', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.branch_address && <div>{errors.branch_address}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Branch Phone Number</label>
                        <input
                            type="text"
                            value={data.branch_phone}
                            onChange={(e) => setData('branch_phone', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.branch_phone && <div>{errors.branch_phone}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Branch Email</label>
                        <input
                            type="text"
                            value={data.branch_email}
                            onChange={(e) => setData('branch_email', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.branch_email && <div>{errors.branch_email}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Social Media Links</label>
                        <input
                            type="text"
                            value={data.social_media_links}
                            onChange={(e) => setData('social_media_links', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.social_media_links && <div>{errors.social_media_links}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
} 