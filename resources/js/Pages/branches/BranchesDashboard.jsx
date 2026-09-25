import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";

const BranchesDashboard = ({branches=[]}) => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Branches</h1>
                    <Create />
                    <Index branches={branches} />
                    <Edit />
                </div>
            </div>
        </div>
    )
}
export default BranchesDashboard;