import { useForm, Link, usePage } from "@inertiajs/react";
export default function Create() {
    const {serviceCategories} = usePage().props;
        const { data, setData, post, processing, errors } = useForm({
            benefit_name: '',
            benefit_description: '',
            benefit_type: '',
            category_id: 0
        });
    
        const submit = (e) => {
            e.preventDefault();
            post(route('financialBenefits.store'));
        };
    
        return (
            <div className="h-full w-full bg-gray-100 border p-4 flex justify-center shadow-md items-center">
                <div className="rounded px-4 flex flex-col w-full max-w-md">
                    <h1 className="text-xl text-center font-semibold mb-4">Create Financial Benefits</h1>
                    <form onSubmit={submit}>
                        <div className="mb-4 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                value={data.benefit_name}
                                onChange={(e) => setData('benefit_name', e.target.value)}
                                className="border rounded p-2"
                            />
                            {errors.benefit_name && <div>{errors.benefit_name}</div>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label>Description</label>
                            <textarea
                                value={data.benefit_description}
                                onChange={(e) => setData('benefit_description', e.target.value)}
                                className="border rounded p-2"
                            />
                            {errors.benefit_description && <div>{errors.benefit_description}</div>}
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label>Service</label>

                            <select
                                onChange={(e) => setData('category_id', e.target.value)}
                            >
                                <option value="">Select service</option>

                                {serviceCategories && (serviceCategories.data.map((serviceCategory) => (
                                    <option key={serviceCategory.category_id} value={serviceCategory.category_id}>
                                        {serviceCategory.category_name}
                                    </option>
                                )))}
                            </select>

                            {errors.category_id && (
                                <div className="text-red-500">
                                    {errors.category_id}
                                </div>
                            )}
                        </div>
                        <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                            Create
                        </button>
                    </form>
                </div>
            </div>
        );
}