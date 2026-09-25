import { usePage, Link } from "@inertiajs/react";

export default function(){
    const customers = usePage().props.customers ?? [];
    return (
        <>
            <div>
                <h3>
                    Customers
                </h3>
            </div>
        </>
    )
}