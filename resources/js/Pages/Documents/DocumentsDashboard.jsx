import Index from "./Index";
import Create from "./Create";
import Edit from "./Edit";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
export default function DocumentsDashboard() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [updatedDocuments, setUpdatedDocuments] = useState(null);
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Index
              onEdit={setSelectedDocument}
              documents={updatedDocuments || usePage().props.documents}
            />
            <Edit
              onUpdate={setUpdatedDocuments}
              document={selectedDocument}
            />
            <Create />
        </div>
        </>
    )
}