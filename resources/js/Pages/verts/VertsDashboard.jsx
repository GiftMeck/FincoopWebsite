import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
export default function VertsDashboard() {
  const {verts} = usePage().props;
  const [selectedVert, setSelectedVert] = useState(null);
  const [updatedVerts, setUpdatedVerts] = useState(null);
  return(
    <div className="bg-white shadow-lg p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Index 
            verts={updatedVerts || verts} 
            onEdit={setSelectedVert}
          />
          <Edit
            selectedVert={selectedVert}
            onUpdate = {setUpdatedVerts}
          />
          <Create />
        </div>
    </div>
  )
}