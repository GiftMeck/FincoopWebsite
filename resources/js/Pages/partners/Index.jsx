import NavBar from "@/Layouts/NavBar";
import { usePage } from "@inertiajs/react";
export default function Index() {
    const user  = usePage().props.auth.user;
    const ActionSource = usePage().props.ActionSource;
    const partners = usePage().props.partners ?? [];
    return (
        <>
            {ActionSource ? <NavBar scrolled={true}/> : null}
            <div>
                <h1>Partners</h1>
            </div>
        </>
    );
}
