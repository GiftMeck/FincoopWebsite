import { usePage, Link } from "@inertiajs/react";
export default function GroupMembership(){
    const {groupMembershipApplications} = usePage().props;
    return(
        <>
            <div>
                <h1 className="text-xl text-center font-semibold mb-4">Group Membership Applications</h1>
                    <div className="flex justify-center mb-4">
                        <a
                            href={route('group-memberships.export')}
                            className="bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Export to CSV
                        </a>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b border-slate-500 p-4 text-left">Group ID</th>
                                <th className="border-b border-slate-500 p-4 text-left">Group Name</th>
                                <th className="border-b border-slate-500 p-4 text-left">Group Members</th>
                                <th className="border-b border-slate-500 p-4 text-left">Group Registration Number</th>
                                <th className="border-b border-slate-500 p-4 text-left">Registration Date</th>
                                <th className="border-b border-slate-500 p-4 text-left">Registration Under</th>
                                <th className="border-b border-slate-500 p-4 text-left">Type Of Business</th>
                                <th className="border-b border-slate-500 p-4 text-left">Place Of Business Operation</th>
                                <th className="border-b border-slate-500 p-4"></th>
                                <th className="border-b border-slate-500 p-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupMembershipApplications && groupMembershipApplications.data.map((GroupMembershipApplication) =>(
                                <tr key={GroupMembershipApplication.id} className="border-b border-slate-100 hover:bg-gray-100">
                                    <td className="p-4">{GroupMembershipApplication.id}</td>
                                    <td className="p-4">{GroupMembershipApplication.group_name}</td>
                                    <td className="p-4">{GroupMembershipApplication.number_of_members_total}</td>
                                    <td className="p-4">{GroupMembershipApplication.registration_number}</td>
                                    <td className="p-4">{GroupMembershipApplication.date_of_registration}</td>
                                    <td className="p-4">{GroupMembershipApplication.registered_under}</td>
                                    <td className="p-4">{GroupMembershipApplication.business_type}</td>
                                    <td className="p-4">{GroupMembershipApplication.place_of_operation}  {GroupMembershipApplication.trading_area}</td>
                                    <td>
                                        <Link
                                         href={route('group-memberships.show', GroupMembershipApplication.id)}
                                        >
                                            <span className="text-white mx-2 bg-green-700 rounded-lg p-2">Check</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="py-4">
                    {groupMembershipApplications && (groupMembershipApplications.links.map((link, index) => (
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