import { useForm} from "@inertiajs/react";
import { useEffect } from "react";
export default function Edit({selectedRole, onUpdate}) {
         const {
                data,
                setData,
                post,
                processing,
                errors,
            } = useForm({
                role_name: '',
                _method: "PUT"
            });
        
            useEffect(() => {
                if (selectedRole) {
                    setData({
                        role_name: selectedRole.role_name,
                        _method: "PUT",
                    });
                }
            }, [selectedRole]);
        
            const submit = (e) => {
                e.preventDefault();
        
                if (!selectedRole) {
                    return;
                }
        
                post(route("roles.update", selectedRole.role_id), {
                    forceFormData: true,
                    onSuccess: (page) => {
                        onUpdate(page.props.roles);
                    }
                });
            };
    return (
        <div className="p-6 flex justify-center items-center h-full">
            <div className="bg-gray-100 rounded shadow-md p-8 flex flex-col justify-start w-full">
                <h1 className="text-xl text-center font-semibold mb-4">Edit Role</h1>
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
                        {processing ? 'Processing...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
        )
    }