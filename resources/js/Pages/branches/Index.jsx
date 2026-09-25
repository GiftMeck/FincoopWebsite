import NavBar from "@/Layouts/NavBar";
import { usePage } from "@inertiajs/react";
export default function Index({branches=[]}) {
    const user = usePage().props.auth.user;
    const ActionSource = usePage().props.ActionSource;
    return (
        <>
            {ActionSource ? <NavBar scrolled={true}/> : null}
            <div>
                <h1>Branches & Agencies</h1>
                {
                    branches.map((branch) => {
                        return (
                            <div key={branch.id}>
                                <h2>{branch.branch_name}</h2>
                                <p>{branch.branch_address}</p>
                                <p>{branch.branch_phone}</p>
                                <p>{branch.branch_email}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
