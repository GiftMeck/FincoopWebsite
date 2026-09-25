import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

const AboutDashboard = () => {
    const abouts = usePage().props.abouts
    const [selectedAbout, setSelectedAbout] = useState(null);
    const [updatedAbouts, setUpdatedAbouts] = useState(null)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Index 
                abouts={updatedAbouts || abouts}
                onEdit={setSelectedAbout} 
            />
            <Edit
            about={selectedAbout}
            onUpdate={setUpdatedAbouts}
            />
            <Create />
        </div>
    );
}
export default AboutDashboard;