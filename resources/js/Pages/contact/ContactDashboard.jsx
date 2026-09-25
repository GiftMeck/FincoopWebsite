import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
import Popup from "@/Components/Popup";
export default function ContactDashboard(contacts=[], branches=[], partners=[]) {
    return (
        <div className="container">
            <Popup />
            <div className="row">
                <div className="col-md-12">
                    <h1>Contact Dashboard</h1>
                    <Index contacts={contacts} />
                    <Create branches={branches} partners={partners} />
                    <Edit />
                </div>
            </div>
        </div>
    );
}