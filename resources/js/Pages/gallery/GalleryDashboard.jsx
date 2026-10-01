import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
export default function GalleryDashboard() {     
    const {galleries} = usePage().props;
    const [selectedGallery, setSelectedGallery] = useState(null);  
    const [updatedGallery, setUpdatedGallery] = useState(null)                   
    return(
        <div className="container">
            <div className="row bg-whate rounded-md shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Index 
                        galleries={updatedGallery || galleries}
                        onEdit={setSelectedGallery}
                    />
                    <Edit
                        selectedGallery={selectedGallery}
                        onUpdate={setUpdatedGallery}
                    />
                    <Create />
                </div>
            </div>
        </div>
    )
}