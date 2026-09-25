import { usePage, Link } from "@inertiajs/react";
export default function(){
    const roles = usePage().props.roles ?? [];
    return (
        <>
            <div>
                <h3>
                    Roles
                </h3>
            </div>
        </>
    )
}