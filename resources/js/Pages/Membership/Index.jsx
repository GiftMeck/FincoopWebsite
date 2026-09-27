import { usePage, Link } from "@inertiajs/react"
export default function Membership() {
    const {membershipApplications} = usePage().props
    return(
        <>
            <div>
                <h1 className="text-xl text-center font-semibold mb-4">Membership Applications</h1>
                    <div className="flex justify-center mb-4">
                        <a
                            href={route('memberships.export')}
                            className="bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Export to CSV
                        </a>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b border-slate-500 p-4 text-left">Membership ID</th>
                                <th className="border-b border-slate-500 p-4 text-left">First Name</th>
                                <th className="border-b border-slate-500 p-4 text-left">Surname</th>
                                <th className="border-b border-slate-500 p-4 text-left">Cell Phone</th>
                                <th className="border-b border-slate-500 p-4 text-left">Village</th>
                                <th className="border-b border-slate-500 p-4 text-left">District</th>
                                <th className="border-b border-slate-500 p-4 text-left">Entry Date</th>
                                <th className="border-b border-slate-500 p-4"></th>
                                <th className="border-b border-slate-500 p-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {membershipApplications && membershipApplications.data.map((membershipApplication) =>(
                                <tr key={membershipApplication.membership_id} className="border-b border-slate-100 hover:bg-gray-100">
                                    <td className="p-4">{membershipApplication.membership_id}</td>
                                    <td className="p-4">{membershipApplication.first_name}</td>
                                    <td className="p-4">{membershipApplication.surname}</td>
                                    <td className="p-4">{membershipApplication.cell_phone}</td>
                                    <td className="p-4">{membershipApplication.village}</td>
                                    <td className="p-4">{membershipApplication.district}</td>
                                    <td className="p-4">{membershipApplication.created_at}</td>
                                    <td>
                                        <Link
                                            href={route('memberships.show', membershipApplication.membership_id)}
                                        >
                                            <span className="text-white mx-2 bg-green-700 rounded-lg p-2">Check</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="py-4">
                    {membershipApplications && (membershipApplications.links.map((link, index) => (
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