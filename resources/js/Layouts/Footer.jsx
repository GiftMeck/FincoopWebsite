import { Download, Mail, Phone, Building2 } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function Footer() {
    const documents = usePage().props?.documents ?? [];
    const branches = usePage().props?.branches ?? [];
    return (
        <footer className="bg-green-950 text-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-green-300/80">
                            Our Branches
                        </h2>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {branches && (
                                branches.map((branch) => (
                                    <div
                                        key={branch.branch_id}
                                        className="
                                            rounded-xl
                                            border border-green-700/40
                                            bg-green-800/20
                                            p-4
                                            shadow-md
                                            transition-colors duration-200
                                            hover:bg-green-800/40
                                        "
                                    >
                                        <h3 className="text-base sm:text-lg font-semibold text-green-300">
                                            {branch.branch_name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-green-100">
                                            <p className="flex items-start gap-2">
                                                <Building2 className="mt-0.5 h-4 w-4 shrink-0 rounded-sm bg-green-300 p-0.5 text-green-800" />
                                                <span className="leading-snug">
                                                    {branch.branch_address}
                                                </span>
                                            </p>

                                            <p className="flex items-start gap-2">
                                                <Phone className="mt-0.5 h-4 w-4 shrink-0 rounded-sm bg-green-300 p-0.5 text-green-800" />
                                                <a
                                                    href={`tel:${branch.branch_phone}`}
                                                    className="leading-snug text-green-100 hover:text-green-300 transition-colors"
                                                >
                                                    {branch.branch_phone}
                                                </a>
                                            </p>

                                            <p className="flex items-start gap-2">
                                                <Mail className="mt-0.5 h-4 w-4 shrink-0 rounded-sm bg-green-300 p-0.5 text-green-800" />
                                                <a
                                                    href={`mailto:${branch.branch_email}`}
                                                    className="min-w-0 break-words leading-snug text-green-100 hover:text-green-300 transition-colors"
                                                >
                                                    {branch.branch_email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-green-300/80">
                                Download Forms
                            </h2>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {documents && (
                                    documents.map((document) => (
                                        <a
                                            key={document.document_id}
                                            href={route("documents.download", {
                                                document: document.document_id,
                                            })}
                                            className="
                                                group
                                                inline-flex items-center justify-between gap-3
                                                rounded-lg
                                                border border-green-700/40
                                                bg-green-800/40
                                                px-4 py-3
                                                text-sm
                                                text-green-100
                                                shadow-md
                                                transition-colors duration-200
                                                hover:bg-green-800/60
                                            "
                                        >
                                            <span className="min-w-0 truncate">
                                                {document.document_name}
                                            </span>
                                            <Download className="h-4 w-4 shrink-0 text-orange-500 transition-transform duration-200 group-hover:scale-110" />
                                        </a>
                                    ))
                                )}
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-green-300/80">
                                Quick Summary
                            </h2>

                            <div
                                className="
                                    mt-6
                                    grid grid-cols-3 gap-3
                                    rounded-lg
                                    border border-green-700/40
                                    bg-green-800/40
                                    p-4
                                    text-center
                                "
                            >
                                <div>
                                    <p className="text-orange-500 text-base sm:text-lg font-bold">
                                        Our Members
                                    </p>
                                    <p className="mt-1 text-sm sm:text-base text-green-100">
                                        64,656
                                    </p>
                                </div>
                                <div>
                                    <p className="text-orange-500 text-base sm:text-lg font-bold">
                                        Projects
                                    </p>
                                    <p className="mt-1 text-sm sm:text-base text-green-100">
                                        10
                                    </p>
                                </div>
                                <div>
                                    <p className="text-orange-500 text-base sm:text-lg font-bold">
                                        Partners
                                    </p>
                                    <p className="mt-1 text-sm sm:text-base text-green-100">
                                        12
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    );
}