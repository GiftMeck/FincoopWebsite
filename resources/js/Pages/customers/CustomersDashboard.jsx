import Create from './Create';
import Edit from './Edit';
import Index from './Index';
export default function CustomersDashboard({customers=[]}) {
    const containerStyles = "p-6 flex justify-center items-center";
    const subContainerStyles = "bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md";
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Branches</h1>
                    <Create containerStyles={containerStyles} subContainerStyles={subContainerStyles} />
                    <Index customers={customers} />
                    <Edit />
                </div>
            </div>
        </div>
    )
}