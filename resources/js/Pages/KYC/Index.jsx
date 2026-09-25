import { usePage, Head, Link, useForm } from "@inertiajs/react";
export default function KYC() {
    const {KYCApplications} = usePage().props;
    return(
        <>
            <div>
                <h1 className="text-xl text-center font-semibold mb-4">KYC Applications</h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b border-slate-500 p-4 text-left">Customer ID</th>
                                <th className="border-b border-slate-500 p-4 text-left">First Name</th>
                                <th className="border-b border-slate-500 p-4 text-left">Surname</th>
                                <th className="border-b border-slate-500 p-4 text-left">SACCO Number</th>
                                <th className="border-b border-slate-500 p-4 text-left">Cell Phone</th>
                                <th className="border-b border-slate-500 p-4 text-left">Village</th>
                                <th className="border-b border-slate-500 p-4 text-left">District</th>
                                <th className="border-b border-slate-500 p-4 text-left">Entry Date</th>
                                <th className="border-b border-slate-500 p-4"></th>
                                <th className="border-b border-slate-500 p-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {KYCApplications && KYCApplications.data.map((KYCApplication) =>(
                                <tr key={KYCApplication.membership_id} className="border-b border-slate-100 hover:bg-gray-100">
                                    <td className="p-4">{KYCApplication.id}</td>
                                    <td className="p-4">{KYCApplication.first_names}</td>
                                    <td className="p-4">{KYCApplication.surname}</td>
                                    <td className="p-4">{KYCApplication.member_sacco_number}</td>
                                    <td className="p-4">{KYCApplication.member_phone_number}</td>
                                    <td className="p-4">{KYCApplication.village}</td>
                                    <td className="p-4">{KYCApplication.district}</td>
                                    <td className="p-4">{KYCApplication.created_at}</td>
                                    <td>
                                        <Link
                                           href={route('kyc.show', KYCApplication.id)}
                                        >
                                            <span className="text-white mx-2 bg-green-700 rounded-lg p-2">Check</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="py-4">
                    {KYCApplications && (KYCApplications.links.map((link, index) => (
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