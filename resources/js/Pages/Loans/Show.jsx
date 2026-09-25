import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import SectionHeader from "@/Components/SectionHeader";
import CheckboxField from "@/Components/CheckboxField";
import { usePage, router } from "@inertiajs/react";
import { Controller } from "react-hook-form";


import { FieldGroup } from "@/Components/ui/field";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import {
    UserRound,
    WalletCards,
    BriefcaseBusiness,
    Landmark,
    ClipboardCheck,
    BookOpen,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Building2,
    FileCheck2,
    Calculator,
} from "lucide-react";


/*
|--------------------------------------------------------------------------
| Zod Schema — Only the official-use / approval fields
|--------------------------------------------------------------------------
*/

const optionalNumber = z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z.number().min(0).optional()
);

const loanCheckSchema = z.object({
    employment_verified: z.boolean().optional(),
    gross_income_verified: z.boolean().optional(),
    net_income_verified: z.boolean().optional(),

    loan_recommended_by: z.string().optional(),
    amount_recommended: optionalNumber,

    credit_officer_name: z.string().optional(),

    branch_manager_name: z.string().optional(),

    amount_approved: optionalNumber,
    approval_date: z.string().optional(),
});


export default function LoanShow() {
    const { loanApplicant } = usePage().props;
    const errorMessage = null;
    /*
    React Hook Form — only official fields
    */
    const form = useReactHookForm({
        resolver: zodResolver(loanCheckSchema),
        mode: "onChange",
        defaultValues: {
            employment_verified: false,
            gross_income_verified: false,
            net_income_verified: false,

            loan_recommended_by: "",
            amount_recommended: "",

            credit_officer_name: "",

            branch_manager_name: "",
            amount_approved: "",
            approval_date: "",
        },
    });

    /*
    Inertia Form
    */
    const inertiaForm = useInertiaForm({
        employment_verified: false,
        gross_income_verified: false,
        net_income_verified: false,

        loan_recommended_by: "",
        amount_recommended: "",

        credit_officer_name: "",

        branch_manager_name: "",

        amount_approved: "",
        approval_date: "",
        
    });

    const [processing, setProcessing] = useState(false);

    /*
    Approve & Complete
    */
    const submitApplication = (values) => {
        setProcessing(true);
        console.log("2. loanApplicant.id:", loanApplicant.id);
        inertiaForm.transform(() => ({
            ...values,
            status: "approved",
        }));
        inertiaForm.post(
            route("loanapplications.approve", loanApplicant.id),
            {
                preserveScroll: true,
                onError: (errors) => {
                    errorMessage={...errors};
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    /*
    Disapprove
    */
    const rejectApplication = () => {
        if (!confirm("Are you sure you want to disapprove this loan application?")) {
            return;
        }

        router.post(
            route("loanapplications.disapprove", loanApplicant.id),
            {
                approved_disapproved_by:
                    form.getValues("branch_manager_name") || "System",
                denial_reason:
                    form.getValues("denial_reason") || "Not specified",
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("dashboard"));
                },
                onError: (errors) => {
                    errorMessage={...errors};
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */
    const value = (v) =>
        v === null || v === undefined || v === "" ? "—" : v;

    return (
        <>
            <NavBar />

            <div className="
                min-h-screen
                bg-gray-50
                px-4
                py-8
                font-questrial
                sm:px-6
                lg:px-8
            ">
                <div className="mx-auto w-full max-w-6xl">

                    {/* =====================================================
                        BACK BUTTON + HEADER
                    ===================================================== */}
                    <div className="mb-6 flex items-center justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(route("loanapplications.index"))}
                            className="
                                h-11
                                rounded-xl
                                border-gray-300
                                bg-white
                                px-5
                                font-semibold
                                text-gray-600
                                hover:border-green-700
                                hover:bg-green-50
                                hover:text-green-800
                            "
                        >
                            <ArrowLeft className="mr-2 size-4" />
                            Back to Loan Applications
                        </Button>

                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-green-800/20
                            bg-green-50
                            px-4
                            py-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-widest
                            text-green-800
                        ">
                            <ClipboardCheck className="size-4" />
                            Official Loan Review
                        </div>
                    </div>

                    {/* =====================================================
                        APPLICANT DETAILS (read-only)
                    ===================================================== */}
                    <Card className="
                        mb-8
                        overflow-hidden
                        rounded-2xl
                        border-gray-200
                        bg-white
                        shadow-xl
                    ">
                        <CardHeader className="
                            border-b
                            border-gray-100
                            bg-gradient-to-r
                            from-green-50
                            to-white
                            px-6
                            py-6
                            sm:px-8
                        ">
                            <SectionHeader
                                icon={FileCheck2}
                                title="Loan Application"
                                description="Review the submitted loan details before completing the official section."
                            />
                        </CardHeader>

                        <CardContent className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">

                            {/* ---------- PERSONAL DETAILS ---------- */}
                            <SectionBlock icon={UserRound} title="Personal Details">
                                <DetailItem label="Account Number" value={value(loanApplicant.account_number)} />
                                <DetailItem label="Employment Number" value={value(loanApplicant.employment_number)} />
                                <DetailItem label="ID Type" value={value(loanApplicant.id_type)} />
                                <DetailItem label="ID Number" value={value(loanApplicant.id_number)} />
                                <DetailItem label="Surname" value={value(loanApplicant.surname)} />
                                <DetailItem label="First Names" value={value(loanApplicant.first_names)} />
                                <DetailItem label="Title" value={value(loanApplicant.title)} />
                                <DetailItem label="Age" value={value(loanApplicant.age)} />
                                <DetailItem label="Gender" value={value(loanApplicant.gender)} />
                                <DetailItem label="Phone" value={value(loanApplicant.phone_number)} />
                                <DetailItem label="Email" value={value(loanApplicant.email)} />
                                <DetailItem label="District" value={value(loanApplicant.district)} />
                                <DetailItem label="Village" value={value(loanApplicant.village)} />
                                <DetailItem label="Traditional Authority" value={value(loanApplicant.traditional_authority)} />
                                <DetailItem label="Physical Address" value={value(loanApplicant.physical_address)} />
                                <DetailItem label="Mailing Address" value={value(loanApplicant.mailing_address)} />
                            </SectionBlock>

                            {/* ---------- LOAN DETAILS ---------- */}
                            <SectionBlock icon={WalletCards} title="Loan Details">
                                <DetailItem label="Loan Type" value={value(loanApplicant.loanapplication_type)} />
                                <DetailItem label="Loan Amount" value={value(loanApplicant.loanapplication_amount)} />
                                <DetailItem label="Amount in Words" value={value(loanApplicant.loanapplication_amount_in_words)} />
                                <DetailItem label="Repayment Period (months)" value={value(loanApplicant.repayment_period)} />
                                <DetailItem label="Purpose" value={value(loanApplicant.loanapplication_purpose)} />
                            </SectionBlock>

                            {/* ---------- EMPLOYMENT & BUSINESS ---------- */}
                            <SectionBlock icon={BriefcaseBusiness} title="Employment & Business">
                                <DetailItem label="Employer Name" value={value(loanApplicant.employer_name)} />
                                <DetailItem label="Job Title" value={value(loanApplicant.job_title)} />
                                <DetailItem label="Employment Period" value={value(loanApplicant.employment_period)} />
                                <DetailItem label="Employer Phone" value={value(loanApplicant.employer_phone)} />
                                <DetailItem label="Employer Address" value={value(loanApplicant.employer_address)} />
                                <DetailItem label="Gross Income" value={value(loanApplicant.gross_income)} />
                                <DetailItem label="Net Income" value={value(loanApplicant.net_income)} />
                                <DetailItem label="Business Name" value={value(loanApplicant.business_name)} />
                                <DetailItem label="Business Type" value={value(loanApplicant.business_type)} />
                                <DetailItem label="Years in Business" value={value(loanApplicant.years_in_business)} />
                                <DetailItem label="Trading Area" value={value(loanApplicant.trading_area)} />
                            </SectionBlock>

                            {/* ---------- FINANCIAL INFORMATION ---------- */}
                            <SectionBlock icon={Landmark} title="Financial Information">
                                <DetailItem label="Shares Balance" value={value(loanApplicant.shares_balance)} />
                                <DetailItem label="Savings Balance" value={value(loanApplicant.savings_balance)} />
                                <DetailItem label="Fixed Deposit Balance" value={value(loanApplicant.fixed_deposit_balance)} />
                                <DetailItem label="Existing Loans Balance" value={value(loanApplicant.existing_loanapplications_balance)} />
                            </SectionBlock>

                        </CardContent>
                    </Card>

                    {/* =====================================================
                        OFFICIAL USE FORM
                    ===================================================== */}
                    <div className="
                        rounded-2xl
                        border-2
                        border-blue-300
                        bg-gradient-to-br
                        from-blue-50/80
                        to-white
                        p-5
                        sm:p-8
                        shadow-lg
                    ">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-600
                                text-white
                                shadow-md
                            ">
                                <BookOpen className="size-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-blue-900">
                                    For Official Use Only
                                </h3>
                                <p className="text-sm text-blue-600">
                                    Complete the official section and approve this loan application.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={form.handleSubmit(submitApplication)} noValidate>

                            {/* =============================================
                                EMPLOYMENT VERIFICATION
                            ============================================= */}
                            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
                                <h4 className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2
                                    text-base
                                    font-bold
                                    text-green-900
                                ">
                                    <Building2 className="size-5 text-green-700" />
                                    Employment & Income Verification
                                </h4>

                                <div className="grid gap-3">
                                    <CheckboxField
                                        Controller={Controller}
                                        form={form}
                                        name="employment_verified"
                                        label="Employment information verified"
                                    />
                                    <CheckboxField
                                        Controller={Controller}
                                        form={form}
                                        name="gross_income_verified"
                                        label="Gross income verified"
                                    />
                                    <CheckboxField
                                        Controller={Controller}
                                        form={form}
                                        name="net_income_verified"
                                        label="Net income verified"
                                    />
                                </div>
                            </div>

                            {/* =============================================
                                RECOMMENDATION (Credit Officer)
                            ============================================= */}
                            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
                                <h4 className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2
                                    text-base
                                    font-bold
                                    text-green-900
                                ">
                                    <Calculator className="size-5 text-green-700" />
                                    Recommendation
                                </h4>

                                <FieldGroup className="grid gap-6 md:grid-cols-2">
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="loan_recommended_by"
                                        label="Loan Recommended By"
                                        placeholder="Enter name"
                                    />
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="amount_recommended"
                                        label="Amount Recommended (K)"
                                        type="number"
                                        placeholder="Enter amount"
                                    />
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="credit_officer_name"
                                        label="Credit Officer Name"
                                        placeholder="Enter name"
                                    />
                                </FieldGroup>
                            </div>

                            {/* =============================================
                                BRANCH MANAGER
                            ============================================= */}
                            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
                                <h4 className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2
                                    text-base
                                    font-bold
                                    text-green-900
                                ">
                                    <UserRound className="size-5 text-green-700" />
                                    Branch Manager Verification
                                </h4>

                                <FieldGroup className="grid gap-6 md:grid-cols-2">
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="branch_manager_name"
                                        label="Branch Manager Name"
                                        placeholder="Enter name"
                                    />
                                </FieldGroup>
                            </div>

                            {/* =============================================
                                CREDIT COMMITTEE
                            ============================================= */}
                            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
                                <h4 className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2
                                    text-base
                                    font-bold
                                    text-green-900
                                ">
                                    <ClipboardCheck className="size-5 text-green-700" />
                                    Credit Committee
                                </h4>

                                <FieldGroup className="grid gap-6 md:grid-cols-3">
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="amount_approved"
                                        label="Amount Approved (K)"
                                        type="number"
                                        placeholder="Enter amount"
                                    />

                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="approval_date"
                                        label="Date of Approval / Disapproval"
                                        type="date"
                                    />
                                </FieldGroup>
                            </div>

                            {/* =============================================
                                ACTION BUTTONS
                            ============================================= */}
                            <div className="
                                mt-8
                                flex
                                flex-col-reverse
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-end
                            ">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={rejectApplication}
                                    disabled={processing}
                                    className="
                                        h-12
                                        rounded-xl
                                        border-red-300
                                        bg-white
                                        px-6
                                        font-semibold
                                        text-red-600
                                        hover:border-red-500
                                        hover:bg-red-50
                                        hover:text-red-700
                                        disabled:opacity-60
                                    "
                                >
                                    <XCircle className="mr-2 size-5" />
                                    Disapprove
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing || inertiaForm.processing}
                                    className="
                                        h-12
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-green-800
                                        to-green-900
                                        px-7
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-green-900/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:shadow-xl
                                        hover:shadow-green-900/30
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {processing || inertiaForm.processing
                                        ? "Processing..."
                                        : "Approve & Complete Loan"}
                                    {!processing && !inertiaForm.processing && (
                                        <CheckCircle2 className="ml-2 size-5" />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}


/* ========================================================================
   Helper components
   ======================================================================== */

function SectionBlock({ icon: Icon, title, children }) {
    return (
        <div className="
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
            sm:p-6
        ">
            <h3 className="
                mb-5
                flex
                items-center
                gap-2
                text-lg
                font-bold
                text-green-900
            ">
                <Icon className="size-5 text-green-700" />
                {title}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
                {children}
            </div>
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div>
            <p className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-gray-400
            ">
                {label}
            </p>
            <p className="mt-1 font-semibold text-gray-800">
                {value}
            </p>
        </div>
    );
}