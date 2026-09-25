import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";

export default function StaffDashboard() {
    const staff = usePage().props.users;
    const roles = usePage().props.roles;
    const branches = usePage().props.branches;
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [updatedStaff, setUpdatedStaff] = useState(null);
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Index staff={updatedStaff || staff} onEdit={setSelectedStaff} />
            <Edit
                updatedStaff={selectedStaff}
                onUpdated={setUpdatedStaff}
                roles={roles} 
                branches={branches}
            />
            <Create roles={roles} branches={branches} /> 
        </div>
    )
}