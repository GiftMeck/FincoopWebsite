import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
import {usePage} from "@inertiajs/react";
import { useState } from "react";
const BranchesDashboard = () => {
    const {branches} = usePage().props;
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [updatedBranches, setUpdatedBranches] = useState(null);
    return(
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <Index 
                    branches={branches}
                    onEdit={setSelectedBranch}
                 />
                <Edit
                    selectedBranch={selectedBranch}
                    onUpdate={setUpdatedBranches}
                 />
                <Create />
            </div>
        </div>
    )
}
export default BranchesDashboard;