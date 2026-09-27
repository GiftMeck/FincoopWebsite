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
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Financial Benefits</h1>
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