import { useForm, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Edit({selectedPartner, onUpdate}) {
    const {
            data,
            setData,
            post,
            processing,
            errors,
        } = useForm({
            partner_name: '',
            partner_logo: '',
            partner_description: '',
            _method: "PUT",
        });
    
        useEffect(() => {
            if (selectedPartner) {
                setData({
                    partner_name: selectedPartner.partner_name,
                    partner_logo: selectedPartner.partner_logo,
                    partner_description: selectedPartner.partner_description,
                    _method: "PUT",
                });
            }
        }, [selectedPartner]);
    
        const submit = (e) => {
            e.preventDefault();
    
            if (!selectedPartner) {
                return;
            }
    
            post(route("partners.update", selectedPartner.partner_id), {
                forceFormData: true,
                onSuccess: (page) => {
                    onUpdate(page.props.partners);
                }
            });
        };
    return(
        <div className="p-6 flex justify-center items-center h-full">
            <div className="bg-gray-100 rounded shadow-md p-6 flex flex-col w-full">
                <h1 className="text-xl text-center font-semibold mb-4">Edit Partners</h1>
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
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}