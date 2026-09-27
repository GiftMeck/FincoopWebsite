import { usePage, Link } from "@inertiajs/react";
export default function MobileBankingApplications(){
    const {mobileBankingApplications} = usePage().props;
    return (
        <>
            <div>
                <h1 className="text-xl text-center font-semibold mb-4">KYC Applications</h1>
                    <div className="flex justify-center mb-4">
                        <a
                            href={route('mobile-banking-applications.export')}
                            className="bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Export to CSV
                        </a>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b border-slate-500 p-4 text-left">Application ID</th>
                                <th className="border-b border-slate-500 p-4 text-left">First Name</th>
                                <th className="border-b border-slate-500 p-4 text-left">Surname</th>
                                <th className="border-b border-slate-500 p-4 text-left">Member ID Type</th>
                                <th className="border-b border-slate-500 p-4 text-left">Member ID Number</th>
                                <th className="border-b border-slate-500 p-4 text-left">Phone Number</th>
                                <th className="border-b border-slate-500 p-4 text-left">SACCO Number</th>
                                <th className="border-b border-slate-500 p-4 text-left">Application Date</th>
                                <th className="border-b border-slate-500 p-4"></th>
                                <th className="border-b border-slate-500 p-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mobileBankingApplications && mobileBankingApplications.data.map((mobileBankingApplication) =>(
                                <tr key={mobileBankingApplication.id} className="border-b border-slate-100 hover:bg-gray-100">
                                    <td className="p-4">{mobileBankingApplication.id}</td>
                                    <td className="p-4">{mobileBankingApplication.first_name}</td>
                                    <td className="p-4">{mobileBankingApplication.surname}</td>
                                    <td className="p-4">{mobileBankingApplication.id_type}</td>
                                    <td className="p-4">{mobileBankingApplication.id_number}</td>
                                    <td className="p-4">{mobileBankingApplication.cell_phone}</td>
                                    <td className="p-4">{mobileBankingApplication.sacc_number_employment}</td>
                                    <td className="p-4">{mobileBankingApplication.created_at}</td>
                                    <td>
                                        <Link
                                            href={route('mobile-banking-applications.show', mobileBankingApplication.id)}
                                        >
                                            <span className="text-white mx-2 bg-green-700 rounded-lg p-2">Check</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="py-4">
                    {mobileBankingApplications && (mobileBankingApplications.links.map((link, index) => (
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