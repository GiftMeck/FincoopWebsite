import Index from "./Index";
import Create from "./Create";
import Edit from "./Edit";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const ServiceCategoriesDashboard = () => {
    const serviceCategories = usePage().props.serviceCategories;
    const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
    const [updatedServiceCategories, setUpdatedServiceCategories] = useState(null);
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Index 
                serviceCategories={serviceCategories}
                onEdit={setSelectedServiceCategory}
            />
            <Edit 
                serviceCategory={selectedServiceCategory}
                onUpdate={setUpdatedServiceCategories}
            />
            <Create/>
        </div>
    )
}
export default ServiceCategoriesDashboard;