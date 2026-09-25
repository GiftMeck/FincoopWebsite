import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
export default function FinancialBenefitsDashboard({financialBenefits, serviceCategories}) {
    return(
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Financial Benefits</h1>
                <Create serviceCategories={serviceCategories} />
                <Index financialBenefits={financialBenefits} />
                <Edit />
            </div>
        </div>
    )
}