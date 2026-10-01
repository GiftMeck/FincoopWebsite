import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
export default function FinancialBenefitsDashboard() {
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [updatedPartners, setUpdatedPartners] = useState(null);
    const {partners} = usePage().props;
    return(
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <Index 
                    partners={updatedPartners || partners} 
                    onEdit={setSelectedPartner}
                />
                <Edit 
                    selectedPartner={selectedPartner}
                    onUpdate={setUpdatedPartners}  
                />
                <Create/>
            </div>
        </div>
    )
}