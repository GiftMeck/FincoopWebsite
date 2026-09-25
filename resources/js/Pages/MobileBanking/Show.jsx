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
import { usePage, router } from "@inertiajs/react";
import { Controller } from "react-hook-form";

import { FieldGroup } from "@/Components/ui/field";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import {
    UserRound,
    Users,
    BookOpen,
    ClipboardCheck,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Smartphone,
    MapPin,
    Phone,
    Mail,
    Wallet,
    ShieldCheck,
    BadgeCheck,
    Building2,
    Clock,
    Fingerprint,
} from "lucide-react";


/*
|--------------------------------------------------------------------------
| Zod Schema — Only the official-use fields
|--------------------------------------------------------------------------
*/

const optionalNumber = z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z.number().min(0).optional()
);

const mobileBankingCheckSchema = z.object({
    member_customer_number: z.string().optional(),
    received_by: z.string().optional(),
    received_date: z.string().optional(),
    approved_by: z.string().optional(),
    approved_date: z.string().optional(),
    processed_by: z.string().optional(),
    processed_date: z.string().optional(),
    status: z.string().optional(),
});


export default function MobileBankingShow() {
    const { mobileBankingApplicant } = usePage().props;

    /*
    |--------------------------------------------------------------------------
    | React Hook Form — official fields only
    |--------------------------------------------------------------------------
    */
    const form = useReactHookForm({
        resolver: zodResolver(mobileBankingCheckSchema),
        mode: "onChange",
        defaultValues: {
            member_customer_number: "",
            received_by: "",
            received_date: "",
            approved_by: "",
            approved_date: "",
            processed_by: "",
            processed_date: "",
            status: "",
        },
    });

    /*
    |--------------------------------------------------------------------------
    | Inertia Form
    |--------------------------------------------------------------------------
    */
    const inertiaForm = useInertiaForm({
        member_customer_number: "",
        received_by: "",
        received_date: "",
        approved_by: "",
        approved_date: "",
        processed_by: "",
        processed_date: "",
        status: "",
    });

    const [processing, setProcessing] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Approve & Complete
    |--------------------------------------------------------------------------
    */
    const submitApplication = (values) => {
        setProcessing(true);

        inertiaForm.transform(() => ({
            ...values,
            status: values.status || "approved",
        }));

        inertiaForm.post(
            route("mobile-banking-applications.approve", mobileBankingApplicant.id),
            {
                preserveScroll: true,
                onError: (errors) => {
                    console.error("Validation errors:", errors);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Disapprove
    |--------------------------------------------------------------------------
    */
    const rejectApplication = () => {
        if (!confirm("Are you sure you want to disapprove this mobile banking application?")) {
            return;
        }

        router.post(
            route("mobile-banking.disapprove", mobileBankingApplicant.id),
            {
                approved_by:
                    form.getValues("approved_by") || "System",
                reason: "Disapproved by officer",
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("mobile-banking.index"));
                },
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

    /* Selected services as array */
    const selectedServices = [];
    if (mobileBankingApplicant.balance_savings) selectedServices.push("Balance Savings");
    if (mobileBankingApplicant.balance_loans) selectedServices.push("Balance Loans");
    if (mobileBankingApplicant.balance_other)
        selectedServices.push(`Balance Other${mobileBankingApplicant.balance_other_specify ? ` (${mobileBankingApplicant.balance_other_specify})` : ""}`);
    if (mobileBankingApplicant.funds_transfer) selectedServices.push("Funds Transfer");

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
                            onClick={() => router.visit(route("mobile-banking.index"))}
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
                            Back to Applications
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
                            Official Mobile Banking Review
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
                                icon={Smartphone}
                                title="Mobile Banking Application"
                                description="Review the submitted mobile banking details before completing the official section."
                            />
                        </CardHeader>

                        <CardContent className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">

                            {/* ---------- PERSONAL DETAILS ---------- */}
                            <SectionBlock icon={UserRound} title="Personal Details">
                                <DetailItem label="Title" value={value(mobileBankingApplicant.title)} />
                                <DetailItem label="First Name" value={value(mobileBankingApplicant.first_name)} />
                                <DetailItem label="Surname" value={value(mobileBankingApplicant.surname)} />
                                <DetailItem label="ID Type" value={value(mobileBankingApplicant.id_type)} />
                                <DetailItem label="ID Number" value={value(mobileBankingApplicant.id_number)} />
                                <DetailItem label="Cell Phone" value={value(mobileBankingApplicant.cell_phone)} />
                                <DetailItem label="Email" value={value(mobileBankingApplicant.email)} />
                                <DetailItem label="SACCO / Employment" value={value(mobileBankingApplicant.sacc_number_employment)} />
                                <DetailItem label="Postal Address" value={value(mobileBankingApplicant.postal_address)} />
                            </SectionBlock>

                            {/* ---------- REQUEST TYPE ---------- */}
                            <SectionBlock icon={BadgeCheck} title="Request">
                                <DetailItem label="Request Type" value={value(mobileBankingApplicant.request_type)} />
                                <DetailItem label="Add Mobile Number" value={mobileBankingApplicant.add_mobile_number ? "Yes" : "No"} />
                                <DetailItem label="Remove Mobile Number" value={mobileBankingApplicant.remove_mobile_number ? "Yes" : "No"} />
                            </SectionBlock>

                            {/* ---------- MOBILE NUMBERS ---------- */}
                            <SectionBlock icon={Phone} title="Linked Mobile Numbers">
                                <DetailItem label="Mobile 1 Number" value={value(mobileBankingApplicant.mobile_1_number)} />
                                <DetailItem label="Mobile 1 SMS Notification" value={value(mobileBankingApplicant.mobile_1_sms_notification)} />
                                <DetailItem label="Mobile 2 Number" value={value(mobileBankingApplicant.mobile_2_number)} />
                                <DetailItem label="Mobile 2 SMS Notification" value={value(mobileBankingApplicant.mobile_2_sms_notification)} />
                            </SectionBlock>

                            {/* ---------- SELECTED SERVICES ---------- */}
                            <SectionBlock icon={Wallet} title="Selected Services">
                                {selectedServices.length > 0 ? (
                                    selectedServices.map((s, i) => (
                                        <DetailItem key={i} label={`Service ${i + 1}`} value={s} />
                                    ))
                                ) : (
                                    <DetailItem label="Services" value="None selected" />
                                )}
                            </SectionBlock>
                        </CardContent>
                    </Card>

                    {/* =====================================================
                        OFFICE USE FORM
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
                                    Office Use Only
                                </h3>
                                <p className="text-sm text-blue-600">
                                    Complete the official section and approve this mobile banking application.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={form.handleSubmit(submitApplication)} noValidate>
                            <FieldGroup className="grid gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="member_customer_number"
                                        label="Member / Customer Number / Employment Number"
                                        placeholder="Enter member, customer or employment number"
                                    />
                                </div>

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="received_by"
                                    label="Received By"
                                    placeholder="Enter name"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="received_date"
                                    label="Date Received"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="approved_by"
                                    label="Approved By"
                                    placeholder="Enter name"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="approved_date"
                                    label="Approval Date"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="processed_by"
                                    label="Processed By"
                                    placeholder="Enter name"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="processed_date"
                                    label="Processing Date"
                                    type="date"
                                />
                            </FieldGroup>

                            {/* ---------- ACTION BUTTONS ---------- */}
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
                                        : "Approve & Complete Application"
                                    }
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