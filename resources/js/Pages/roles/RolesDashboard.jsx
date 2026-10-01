import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
export default function RolesDashboard() {
    const { roles } = usePage().props;
    const [selectedRole, setSelectedRole] = useState(null);
    const [updatedRoles, setUpdatedRoles] = useState(null);
    return (
        <div className="container">
            <div className="row bg-white p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Index 
                        roles={updatedRoles || roles} 
                        onEdit={setSelectedRole}
                    />
                    <Edit
                        selectedRole={selectedRole}
                        onUpdate={setUpdatedRoles}
                    />
                    <Create />
                </div>
            </div>
        </div>
    );
}