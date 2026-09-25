import Create from "./Create";
import Index from "./Index";
import Edit from "./Edit";
export default function GalleryDashboard({galleries, users, branches, services, partners}) {                              
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Gallery Dashboard</h1>
                    <Create users={users} branches={branches} services={services} partners={partners}/>
                    <Index galleries={galleries} />
                    <Edit />
                </div>
            </div>
        </div>
    )
}