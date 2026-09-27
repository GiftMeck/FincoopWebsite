import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { Link, usePage } from "@inertiajs/react";
import {
    Handshake,
    Download,
    Briefcase,
    Sprout,
    AlertCircle,
    Users,
    User,
    ShieldCheck,
    ArrowRight,
    Percent,
    Calendar,
    Landmark,
} from "lucide-react";

export default function ReadMore() {
    const { documents } = usePage().props;

    const loanDocument =
    documents?.data?.find((doc) =>
        doc.document_name?.toLowerCase().includes("loan")
    ) ?? documents?.data?.[0];

    return (
        <>
            <NavBar />

            <div className="
                min-h-screen
                bg-gradient-to-b
                from-gray-50
                via-white
                to-green-50/30
                font-questrial
            ">
                <section className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-12
                    sm:px-6
                    sm:py-16
                    lg:px-8
                ">
                    <div className="mb-14">
                        <div className="mb-8 text-center">
                            <h2 className="
                                text-2xl
                                font-bold
                                text-green-900
                                sm:text-3xl
                            ">
                                Types of Loans
                            </h2>
                            <p className="
                                mx-auto
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-gray-600
                                sm:text-base
                            ">
                                Loans are categorized by membership type, urgency,
                                and purpose — so you get the right product for the
                                right situation.
                            </p>
                        </div>

                        <div className="
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                            lg:grid-cols-4
                        ">
                            <LoanCard
                                icon={User}
                                title="Personal Loan"
                                description="For personal needs, education, home improvements, or any individual goal."
                                accent="green"
                            />
                            <LoanCard
                                icon={Briefcase}
                                title="Business Loan"
                                description="Working capital, equipment, or expansion funding for entrepreneurs and SMEs."
                                accent="blue"
                            />
                            <LoanCard
                                icon={Sprout}
                                title="Agricultural Loan"
                                description="Seasonal financing for inputs, equipment, or harvest cycle support for farmers."
                                accent="orange"
                            />
                            <LoanCard
                                icon={AlertCircle}
                                title="Emergency Loan"
                                description="Fast-tracked financing for urgent, unexpected financial needs."
                                accent="red"
                            />
                        </div>
                    </div>
                    <div className="
                        grid
                        grid-cols-1
                        gap-6
                        mb-14
                        lg:grid-cols-2
                    ">
                        <div className="
                            rounded-2xl
                            border
                            border-green-100
                            bg-white
                            p-6
                            shadow-md
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                            sm:p-8
                        ">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-green-800
                                    text-white
                                    shadow-md
                                ">
                                    <Users className="size-6" />
                                </div>
                                <div>
                                    <h3 className="
                                        text-lg
                                        font-bold
                                        text-green-900
                                        sm:text-xl
                                    ">
                                        Membership Requirements
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Before you can borrow
                                    </p>
                                </div>
                            </div>

                            <div className="
                                mt-5
                                h-1
                                w-16
                                rounded-full
                                bg-orange-500
                            " />

                            <ul className="mt-5 space-y-3">
                                <RequirementItem
                                    text="Be an active member of FINCOOP for at least 3 months"
                                />
                                <RequirementItem
                                    text="Maintain a minimum share balance that meets the loan amount applied"
                                />
                                <RequirementItem
                                    text="Have a clean repayment history with the SACCO"
                                />
                                <RequirementItem
                                    text="Complete the loan application form with accurate details"
                                />
                            </ul>
                        </div>
                        <div className="
                            rounded-2xl
                            border
                            border-green-100
                            bg-white
                            p-6
                            shadow-md
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                            sm:p-8
                        ">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-green-700
                                    to-green-900
                                    text-white
                                    shadow-md
                                ">
                                    <ShieldCheck className="size-6" />
                                </div>
                                <div>
                                    <h3 className="
                                        text-lg
                                        font-bold
                                        text-green-900
                                        sm:text-xl
                                    ">
                                        Loan Security
                                    </h3>
                                </div>
                            </div>

                            <div className="
                                mt-5
                                h-1
                                w-16
                                rounded-full
                                bg-orange-500
                            " />

                            <p className="
                                mt-5
                                text-sm
                                leading-7
                                text-gray-600
                                sm:text-base
                            ">
                                Loan security is anything that can be converted
                                into value equal to the amount of the loan applied.
                                It acts as a safety measure for FINCOOP in case
                                of failure to repay.
                            </p>

                            <div className="
                                mt-5
                                rounded-xl
                                border
                                border-green-100
                                bg-green-50/50
                                p-4
                            ">
                                <p className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-green-700
                                ">
                                    Acceptable Security
                                </p>
                                <div className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    gap-2
                                ">
                                    {[
                                        "Share Contributions",
                                        "Savings Deposits",
                                        "Fixed Deposits",
                                        "Physical Assets",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                border
                                                border-green-200
                                                bg-white
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                text-green-800
                                            "
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-14">
                        <div className="
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                            lg:grid-cols-3
                        ">
                            <FeatureCard
                                icon={Percent}
                                title="Competitive Rates"
                                description="Lower interest rates than most commercial lenders in Malawi."
                            />
                            <FeatureCard
                                icon={Calendar}
                                title="Flexible Repayment"
                                description="Choose a repayment period that aligns with your income cycle."
                            />
                            <FeatureCard
                                icon={Landmark}
                                title="Higher Limits"
                                description="Your loan limit grows as your shares and savings grow."
                            />
                        </div>
                    </div>
                    <div className="
                        rounded-3xl
                        border
                        border-green-100
                        bg-gradient-to-br
                        from-green-50
                        via-white
                        to-orange-50/30
                        p-8
                        shadow-lg
                        sm:p-10
                        lg:p-12
                    ">
                        <div className="
                            flex
                            flex-col
                            items-center
                            gap-6
                            text-center
                        ">
                            <div>
                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-green-900
                                    sm:text-3xl
                                ">
                                    Ready to Apply?
                                </h2>
                                <div className="
                                    mx-auto
                                    mt-3
                                    h-1
                                    w-20
                                    rounded-full
                                    bg-orange-500
                                " />
                                <p className="
                                    mx-auto
                                    mt-4
                                    max-w-xl
                                    text-sm
                                    leading-7
                                    text-gray-600
                                    sm:text-base
                                ">
                                    Start your application now, or download the
                                    form to complete offline. Either way, you'll
                                    hear from us within 3 working days.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-center
                            ">
                                <Link
                                    href={route("loanapplications.create")}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-green-800
                                        to-green-900
                                        px-7
                                        py-3.5
                                        text-base
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-green-900/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                        hover:shadow-green-900/30
                                    "
                                >
                                    Apply Now
                                </Link>

                                {loanDocument && (
                                    <a
                                        href={route("documents.download", {
                                            document: loanDocument.document_id,
                                        })}
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border-2
                                            border-green-800
                                            bg-white
                                            px-7
                                            py-3.5
                                            text-base
                                            font-bold
                                            text-green-800
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:bg-green-50
                                            hover:shadow-lg
                                        "
                                    >
                                        Download Form
                                        <Download className="size-5 text-orange-500" />
                                    </a>
                                )}
                            </div>
                            <p className="
                                mt-2
                                max-w-md
                                text-xs
                                leading-6
                                text-gray-400
                            ">
                                Documents provided are for reference. Actual
                                rates and terms depend on your membership
                                category and share balance.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <Link
                            href="/"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-green-700
                                transition-colors
                                duration-200
                                hover:text-green-900
                            "
                        >
                            Back to Home
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

function LoanCard({ icon: Icon, title, description, accent = "green" }) {
    const accents = {
        green: "bg-green-800",
        blue: "bg-blue-600",
        orange: "bg-orange-500",
        red: "bg-red-500",
    };

    return (
        <div className="
            group
            flex
            flex-col
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-md
            transition-all
            duration-500
            hover:-translate-y-2
            hover:border-green-300
            hover:shadow-2xl
        ">
            <div className="
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-green-800
                to-green-900
                p-6
                text-white
            ">
                <div className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-green-800
                    shadow-lg
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                `}>
                    <Icon className="size-8" />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="
                    text-lg
                    font-bold
                    text-green-900
                    transition-colors
                    duration-300
                    group-hover:text-green-700
                ">
                    {title}
                </h3>

                <p className="
                    mt-3
                    text-sm
                    leading-6
                    text-gray-600
                ">
                    {description}
                </p>
            </div>
        </div>
    );
}

function RequirementItem({text }) {
    return (
        <li className="flex items-start gap-3">
            <span className="
                text-sm
                leading-6
                text-gray-700
                sm:text-base
            ">
                {text}
            </span>
        </li>
    );
}

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="
            group
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-green-300
            hover:shadow-lg
            sm:p-6
        ">
            <div className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-green-100
                text-green-800
                transition-all
                duration-300
                group-hover:bg-green-800
                group-hover:text-white
            ">
                <Icon className="size-6" />
            </div>
            <div>
                <h3 className="
                    text-base
                    font-bold
                    text-green-900
                ">
                    {title}
                </h3>
                <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-gray-600
                ">
                    {description}
                </p>
            </div>
        </div>
    );
}