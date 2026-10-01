import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
import Popup from "@/Components/Popup";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
export default function TestimonialsDashboard() {
    const {testimonials, customers, partners} = usePage().props;
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [updatedTestimonials, setUpdatedTestimonials] = useState(null);
    return(
        <div className="flex flex-col">
            <Popup />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Index 
                    testimonials={updatedTestimonials || testimonials}
                    onEdit={setSelectedTestimonial}
                />
                <Edit
                    testimonial={selectedTestimonial}
                    onUpdate={setUpdatedTestimonials}
                />
                <Create customers={customers} partners={partners} />
            </div>
        </div>
    )
}