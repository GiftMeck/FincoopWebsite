import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
export default function FinancialBenefitsDashboard() {
    const [selectedfinancialBenefit, setselectedfinancialBenefit] = useState(null);
    const [updatedfinancialBenefits, setupdatedfinancialBenefit] = useState(null);
    const {financialBenefits} = usePage().props;
    return(
        <div className="container mx-auto p-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Index 
                    financialBenefits={updatedfinancialBenefits || financialBenefits} 
                    onEdit={setselectedfinancialBenefit}
                />
                <Edit 
                    selectedfinancialBenefit={selectedfinancialBenefit}
                    onUpdate={setupdatedfinancialBenefit}  
                />
                <Create/>
            </div>
        </div>
    )
}