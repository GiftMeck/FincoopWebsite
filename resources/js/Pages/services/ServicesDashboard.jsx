import Index from "./Index";
import Create from "./Create";
import Edit from "./Edit";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function ServicesDashboard({
}) {
    const branches = usePage().props.branches;
    const services = usePage().props.services;
    const serviceCategories = usePage().props.serviceCategories;
    const [selectedService, setSelectedService] = useState(null);
    const [updatedServices, setUpdatedServices] = useState(null);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <Index
                    services={updatedServices || services}
                    onEdit={setSelectedService}
                />
                <Edit
                    service={selectedService}
                    serviceCategories={serviceCategories}
                    branches={branches}
                    onUpdated={setUpdatedServices}
                />
                <Create />
            </div>
        </>
    );
}