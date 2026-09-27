import {usePage, useForm, Link} from '@inertiajs/react';
import { useState, useEffect } from 'react';
export default function Edit({selectedfinancialBenefit, onUpdate}) {
    const {serviceCategories} = usePage().props;
      const {
            data,
            setData,
            post,
            processing,
            errors,
        } = useForm({
            benefit_name: '',
            benefit_description: '',
            benefit_type: '',
            category_id: null,
            _method: "PUT",
        });
    
        useEffect(() => {
            if (selectedfinancialBenefit) {
                setData({
                    benefit_name: selectedfinancialBenefit.benefit_name,
                    benefit_description: selectedfinancialBenefit.benefit_description,
                    benefit_type: selectedfinancialBenefit.benefit_type,
                    category_id: selectedfinancialBenefit.category_id,
                    _method: "PUT",
                });
            }
        }, [selectedfinancialBenefit]);
    
        const submit = (e) => {
            e.preventDefault();
    
            if (!selectedfinancialBenefit) {
                return;
            }
    
            post(route("financialBenefits.update", selectedfinancialBenefit.benefit_id), {
                forceFormData: true,
                onSuccess: (page) => {
                    onUpdate(page.props.financialBenefits);
                }
            });
        };
    return (
        <div className="h-full w-full bg-gray-100 border p-4 flex justify-center shadow-md items-center">
            <div className="rounded px-4 flex flex-col w-full max-w-md">
                <h1 className="text-xl text-center font-semibold mb-4">Edit Financial Benefits</h1>
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
                            <option value="">Select service category</option>

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
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}