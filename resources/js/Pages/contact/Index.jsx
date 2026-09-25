import NavBar from "@/Layouts/NavBar";
import { usePage } from "@inertiajs/react";
export default function Index() {
    const user = usePage().props.auth.user;
    const ActionSource = usePage().props.ActionSource;
    const contacts = usePage().props.contacts ?? [];
    return (
        <>
            {ActionSource ? <NavBar scrolled={true}/> : null}
            <div>
                <h1>Contact Index</h1>
            </div>
        </>
    );
}
