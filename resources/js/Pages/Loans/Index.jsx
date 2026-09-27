import { usePage, Link } from "@inertiajs/react";
export default function LoanApplications(){
    const {loanApplications} = usePage().props;
    return (
        <>
            <div>
                <h1 className="text-xl text-center font-semibold mb-4">Loan Applications</h1>
                    <div className="flex justify-center mb-4">
                        <a
                            href={route('loanapplications.export')}
                            className="bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Export to CSV
                        </a>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b border-slate-500 p-4 text-left">Loan ID</th>
                                <th className="border-b border-slate-500 p-4 text-left">First Name</th>
                                <th className="border-b border-slate-500 p-4 text-left">Surname</th>
                                <th className="border-b border-slate-500 p-4 text-left">Phone Number</th>
                                <th className="border-b border-slate-500 p-4 text-left">Share Balance</th>
                                <th className="border-b border-slate-500 p-4 text-left">Application Amount</th>
                                <th className="border-b border-slate-500 p-4 text-left">Security Offered</th>
                                <th className="border-b border-slate-500 p-4 text-left">Application Date</th>
                                <th className="border-b border-slate-500 p-4 text-left">Repayment Period (Months)</th>
                                <th className="border-b border-slate-500 p-4"></th>
                                <th className="border-b border-slate-500 p-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanApplications && loanApplications.data.map((loanApplication) =>(
                                <tr key={loanApplication.id} className="border-b border-slate-100 hover:bg-gray-100">
                                    <td className="p-4">{loanApplication.id}</td>
                                    <td className="p-4">{loanApplication.first_names}</td>
                                    <td className="p-4">{loanApplication.surname}</td>
                                    <td className="p-4">{loanApplication.phone_number}</td>
                                    <td className="p-4">{loanApplication.shares_balance}</td>
                                    <td className="p-4">{loanApplication.loanapplication_amount}</td>
                                    <td className="p-4">{loanApplication.security_offered}</td>
                                    <td className="p-4">{loanApplication.created_at}</td>
                                    <td className="p-4">{loanApplication.repayment_period}</td>
                                    <td>
                                        <Link
                                            href={route('loanapplications.show', loanApplication.id)}
                                        >
                                            <span className="text-white mx-2 bg-green-700 rounded-lg p-2">Check</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="py-4">
                    {loanApplications && (loanApplications.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            preserveScroll
                            preserveState
                            className={`
                                px-4
                                py-2
                                rounded-lg
                                border

                                ${
                                    link.active
                                        ? "bg-green-700 text-white"
                                        : "bg-white text-green-900 hover:bg-green-100"
                                }

                                ${!link.url ? "pointer-events-none opacity-40" : ""}
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />

                    )))}
                </div>
            </div>
        </>
    )
}