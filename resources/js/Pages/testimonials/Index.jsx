import NavBar from "@/Layouts/NavBar";
import { usePage } from "@inertiajs/react";
export default function Index() {
    const user = usePage().props.auth.user;
    const testimonials = usePage().props.testimonials;
    const ActionSource = usePage().props.ActionSource;
    return (
        <>
            {ActionSource  ? <NavBar scrolled={true}/> : null}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Testimonials</h1>
                        <p>Here are some testimonials from our satisfied customers:</p>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">John Doe</h5>
                                <p className="card-text">"I have been using this service for a while now and I am extremely satisfied with the results. The team is professional and responsive, and the quality of the work is top-notch. I highly recommend this service to anyone in need of a reliable and high-quality service."</p>
                            </div>
                        </div>
                        {/* Add more testimonials here */}
                    </div>
                </div>
            </div>
        </>
    );
}
