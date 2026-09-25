export default function Index({financialBenefits}) {
        return(
        <div className="flex flex-col">
            <div className="flex flex-col justify-between items-center">
                <h1 className="text-2xl font-bold">Financial Benefits</h1>
                {financialBenefits && (financialBenefits.map((benefit) =>{
                    return(
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold">{benefit.benefit_name}</h2>
                            <p className="text-gray-500">{benefit.benefit_description}</p>
                            <p className="text-gray-500">{benefit.benefit_type}</p>
                        </div>  
                    )
                }))}
            </div>
        </div>
    )
}