import { Download, Mail, Phone, Building2} from "lucide-react";
import { usePage } from "@inertiajs/react";
export default function Footer() {
    const documents = usePage().props.documents;
    const branches = usePage().props.branches;
    return (
        <footer className="bg-green-950 text-white">
            <div className="
                mx-auto
                max-w-7xl
                p-6
                grid 
                lg:grid-cols-2 
                grid-cols-1
                gap-2  
            ">
                <div className="">
                    <h2 className="
                        text-center
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-green-300/70
                    ">
                        OUR BRANCHES
                    </h2>

                    <div className="
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        gap-2
                        mt-7
                    ">

                        {branches.data.map((branch) => {
                            return(
                                <div
                                key={branch.branch_id}
                                className="
                                    flex
                                    flex-col
                                    justify-between
                                    h-full
                                    min-h-[240px]
                                    rounded-xl
                                    border
                                    border-green-700/40
                                    bg-green-800/20
                                    backdrop-blur-sm
                                    p-3
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:bg-green-800/40
                                    hover:shadow-2xl
                                "
                            >
                                <h3 className="
                                    mb-4
                                    text-lg
                                    sm:text-xl
                                    font-semibold
                                    text-green-300
                                ">
                                    {branch.branch_name}
                                </h3>

                                <div className="
                                    space-y-3
                                    text-sm
                                    sm:text-base
                                    text-green-100
                                ">
                                        <p className="text-sm">
                                            <Building2 className="bg-green-300 p-1 rounded-sm text-green-800 inline-block mr-2" />
                                            {branch.branch_address}
                                        </p>

                                        <p className="break-all mb-4 text-sm">
                                            <Phone className="bg-green-300 p-1 rounded-sm text-green-800 inline-block mr-2" />
                                            {branch.branch_phone}
                                        </p>
                                        <address>
                                            <a href={`https://${branch.branch_email}`} target="blank" className="break-all text-sm text-blue-500">
                                                <Mail className="bg-green-300 p-1 rounded-sm text-green-800 inline-block mr-2" />
                                                {branch.branch_email}
                                            </a>
                                        </address>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div>
                    <div className="">
                        <h1 className=" 
                            text-green-300/70
                            text-2xl
                            sm:text-3xl
                            font-bold
                        ">
                            DOWNLOAD FORMS
                        </h1>
                        <div className="
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                            gap-4
                            mt-7
                        ">
                            {documents && (
                                documents.data.map((document) => {
                                    return (
                                        <a
                                        key={document.document_id}
                                        href={route('documents.download', {
                                            document: document.document_id
                                        })}
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-lg
                                            border
                                            border-green-700/40
                                            bg-green-800/40
                                            px-4
                                            py-2
                                            text-green-100
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:bg-green-800/60
                                            hover:shadow-lg
                                        "
                                        >
                                            {document.document_name}

                                            <Download
                                                className="
                                                    text-orange-500
                                                    transition-transform
                                                    duration-300
                                                    group-hover:scale-110
                                                "
                                            />
                                        </a>
                                    )
                                })
                            )}
                        </div>
                        <div className="mt-7">
                            <h1
                            className=" 
                                text-green-300/70
                                text-lg
                                font-bold
                            "
                            >
                                QUICK SUMMARY
                            </h1>
                        </div>
                        <div
                            className="
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                            gap-4
                            mt-4
                            bg-green-800/40
                            text-green-100
                            rounded-lg
                            p-2
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            border
                            border-green-700/40
                            text-center
                            "
                        >
                           <div>
                                <h1 
                                    className="
                                    text-orange-500
                                    text-lg
                                    font-bold
                                    "
                                >
                                    Our Members
                                </h1>
                                <h3>64656</h3>
                            </div> 
                           <div>
                                <h1
                                    className="
                                    text-orange-500
                                    text-lg
                                    font-bold
                                    "
                                >
                                    Projects
                                </h1>
                                <h3>10</h3>
                            </div> 
                           <div>
                                <h1
                                    className="
                                    text-orange-500
                                    text-lg
                                    font-bold
                                    "
                                >
                                    Partners
                                </h1>
                                <h3>12</h3>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}