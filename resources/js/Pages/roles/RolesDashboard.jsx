import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
export default function RolesDashboard({roles=[]}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Roles Dashboard</h1>
                    <Index roles={roles} />
                    <Create />
                    <Edit />
                </div>
            </div>
        </div>
    );
}