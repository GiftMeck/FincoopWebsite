import { useForm, usePage, Link } from "@inertiajs/react";
import Popup from "@/Components/Popup";
export default function Create({users=[], branches=[], services=[], partners=[]}) {
    const { data, setData, post, processing, errors } = useForm({
        gallery_title: '',
        gallery_description: '',
        branch_id: null,
        user_id: null,
        service_id: null,
        partner_id: null,
        gallery_image: null,
        gallery_video: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('gallery.store'));
    };

    return (
        <div className="p-6 flex justify-center items-center h-screen">
            <Popup />
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create gallery</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Gallery title</label>
                        <input
                            type="text"
                            value={data.gallery_title}
                            onChange={(e) => setData('gallery_title', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.gallery_title && <div>{errors.gallery_title[0]}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Gallery Description</label>
                        <textarea
                            value={data.gallery_description}
                            onChange={(e) => setData('gallery_description', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.gallery_description && <div>{errors.gallery_description}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Branch</label>

                        <select
                            onChange={(e) => setData('branch_id', e.target.value)}
                        >
                            <option value="">Select branch</option>

                            {branches.map((branch) => (
                                <option key={branch.branch_id} value={branch.branch_id}>
                                    {branch.branch_name}
                                </option>
                            ))}
                        </select>

                        {errors.branch_id && (
                            <div className="text-red-500">
                                {errors.branch_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Users</label>

                        <select
                            onChange={(e) => setData('user_id', e.target.value)}
                        >
                            <option value="">Select users</option>

                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                        {errors.user_id && (
                            <div className="text-red-500">
                                {errors.user_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Service</label>

                        <select
                            onChange={(e) => setData('service_id', e.target.value)}
                        >
                            <option value="">Select Service</option>

                            {services.map((service) => (
                                <option key={service.service_id} value={service.service_id}>
                                    {service.service_name}
                                </option>
                            ))}
                        </select>

                        {errors.service_id && (
                            <div className="text-red-500">
                                {errors.service_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Partners</label>

                        <select
                            onChange={(e) => setData('partner_id', e.target.value)}
                        >
                            <option value="">Select Partner</option>

                            {partners.map((partner) => (
                                <option key={partner.partner_id} value={partner.partner_id}>
                                    {partner.partner_name}
                                </option>
                            ))}
                        </select>

                        {errors.partner_id && (
                            <div className="text-red-500">
                                {errors.partner_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Gallery Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('gallery_image', e.target.files[0])}
                        />
                        {errors.category_image && <div>{errors.category_image}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Gallery Video</label>
                        <input
                            type="file"
                            onChange={(e) => setData('gallery_video', e.target.files[0])}
                        />
                        {errors.gallery_video && <div>{errors.gallery_video}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}