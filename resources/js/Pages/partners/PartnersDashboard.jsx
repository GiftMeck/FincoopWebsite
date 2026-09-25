import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";

export default function PartnersDashboard({partners=[]}) {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Partners</h1>
                    <Create />
                    <Index partners={partners} />
                    <Edit />
                </div>
            </div>
        </div>
    )
}