import { useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        role_name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <div className="p-6 flex justify-center items-center h-full">
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col justify-start w-full">
                <h1 className="text-xl text-center font-semibold mb-4">Create Service Category</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.role_name}
                            onChange={(e) => setData('role_name', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.role_name && <div>{errors.role_name}</div>}
                    </div>
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}