import NavBar from "@/Layouts/NavBar";
import { usePage } from "@inertiajs/react";
export default function Index() {
    const user = usePage().props.auth.user;
    const ActionSource = usePage().props.ActionSource;
    const galleries = usePage().props.galleries ?? [];
    return (
        <>
            {ActionSource ? <NavBar scrolled={true}/> : null}
            <div>
                <h1>Gallery Index</h1>
            </div>
        </>
    );
}
    