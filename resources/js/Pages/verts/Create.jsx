import { useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        advert_title: '',
        advert_description: '',
        advert_link: '',
        advert_image: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('verts.store', {ActionSource: false}));
    };

    return (
        <div className="p-6 flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Create Adverts</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Advert title</label>
                        <input
                            type="text"
                            value={data.advert_title}
                            onChange={(e) => setData('advert_title', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.advert_title && <div>{errors.advert_title}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Advert Description</label>
                        <textarea
                            type="text"
                            value={data.advert_description}
                            onChange={(e) => setData('advert_description', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.advert_description && <div>{errors.advert_description}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Phone Number Or Link attached to Advert</label>
                        <input
                            type="text"
                            value={data.advert_link}
                            onChange={(e) => setData('advert_link', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.advert_link && <div>{errors.advert_link}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Advert Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('advert_image', e.target.files[0])}
                        />
                        {errors.advert_image && <div>{errors.advert_image}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
} 