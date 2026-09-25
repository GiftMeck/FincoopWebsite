import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

const FaqDashboard = () => {
    const users = usePage().props.users;
    const faqs = usePage().props.faqs;
    const customers = usePage().props.customers;
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [updatedFaqs, setUpdatedFaqs] = useState(null);
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Index 
                faqs={updatedFaqs || faqs} 
                onEdit={setSelectedFaq}
                updatedFaqs={updatedFaqs}
            />
            <Edit
                faq={selectedFaq}
                onUpdate={setUpdatedFaqs} 
            />
            <Create users={users} customers={customers}/>
        </div>
    )
}
export default FaqDashboard;