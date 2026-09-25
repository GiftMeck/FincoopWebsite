import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
import Popup from "@/Components/Popup";
export default function TestimonialsDashboard({testimonials=[], customers=[], partners=[]}) {
    return(
        <div className="container">
            <Popup />
            <Index testimonials={testimonials} />
            <Create customers={customers} partners={partners} />
            <Edit />
        </div>
    )
}