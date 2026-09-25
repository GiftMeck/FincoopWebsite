import { useForm, usePage, Link } from "@inertiajs/react";
export default function Create({roles, branches}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        branch_id: 0,
        role: '',
        profile_picture: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('staff.store'));
    };

    return (
        <div className="h-full bg-gray-100 shadow-md w-full flex flex-col border p-4">
            <h1 className="text-xl text-center font-semibold mb-4">Add Staff</h1>
            <form onSubmit={submit}>
                <div className="mb-4 flex flex-col">
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="border rounded p-2"
                    />
                    {errors.name && (<div className="text-red-500">{errors.name}</div>)}
                </div>
                <div className="mb-4 flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="border rounded p-2"
                    />
                    {errors.email && (<div className="text-red-500">{errors.email}</div>)}
                </div>
                <div className="mb-4 flex flex-col">
                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="border rounded p-2"
                    />
                    {errors.password && (<div className="text-red-500">{errors.password}</div>)}
                </div>
                <div className="mb-4 flex flex-col">
                    <label>Branches</label>

                    <select
                        onChange={(e) => setData('branch_id', e.target.value)}
                    >
                        <option value="">Select branch</option>

                        {branches.data.map((branch) => (
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
                    <label>Roles</label>

                    <select
                        onChange={(e) => setData('role', e.target.value)}
                    >
                        <option value="">Select role</option>

                        {roles.data.map((role) => (
                            <option key={role.role_id} value={role.role_name}>
                                {role.role_name}
                            </option>
                        ))}
                    </select>

                    {errors.role && (
                        <div className="text-red-500">
                            {errors.role}
                        </div>
                    )}
                </div>
                <div className="mb-4 flex flex-col">
                    <label>Profile picture</label>
                    <input
                        type="file"
                        onChange={(e) => setData('profile_picture', e.target.files[0])}
                    />
                    {errors.profile_picture && (<div className="text-red-500">{errors.profile_picture}</div>)}
                </div>
                <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                    Create
                </button>
            </form>
        </div>
    );
}