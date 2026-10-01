import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
import Popup from "@/Components/Popup";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
export default function ContactDashboard() {
    const {contacts} = usePage().props;
    const [selectedContact, setSelectedContact] = useState(null);
    const [updatedContacts, setUpdatedContacts] = useState(null);
    return (
        <div className="container">
            <Popup />
            <div className="row bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-3 gap-4">
                    <Index contacts={updatedContacts || contacts} onEdit={setSelectedContact} />
                    <Edit selectedContact={selectedContact} onUpdate={setUpdatedContacts} />
                    <Create />
                </div>
            </div>
        </div>
    );
}