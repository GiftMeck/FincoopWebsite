import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import SelectField from "@/Components/SelectField";
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
    Fingerprint,
    MapPin,
    Phone,
    Mail,
    ShieldCheck,
    Building2,
    BadgeCheck,
} from "lucide-react";


/*
|--------------------------------------------------------------------------
| Zod Schema — Only the official-use fields
|--------------------------------------------------------------------------
*/

const kycCheckSchema = z.object({
    cross_checked_comments: z.string().optional(),
    completed_by: z.string().optional(),
    date_completed: z.string().optional(),
    date_membership_update: z.string().optional(),
    member_identification_number: z.string().optional(),
    approval_status: z.string().optional(),
    approved_by: z.string().optional(),
    approval_date: z.string().optional(),
    branch_manager_name: z.string().optional(),
});


export default function KYCShow() {
    const { kycApplicant } = usePage().props;

    /*
    |--------------------------------------------------------------------------
    | React Hook Form — only for official-use fields
    |--------------------------------------------------------------------------
    */
    const form = useReactHookForm({
        resolver: zodResolver(kycCheckSchema),
        mode: "onChange",
        defaultValues: {
            cross_checked_comments: "",
            completed_by: "",
            date_completed: "",
            date_membership_update: "",
            member_identification_number: "",
            approval_status: "",
            approved_by: "",
            approval_date: "",
            branch_manager_name: "",
        },
    });

    /*
    |--------------------------------------------------------------------------
    | Inertia Form — for submission
    |--------------------------------------------------------------------------
    */
    const inertiaForm = useInertiaForm({
        cross_checked_comments: "",
        completed_by: "",
        date_completed: "",
        date_membership_update: "",
        member_identification_number: "",
        approval_status: "",
        approved_by: "",
        approval_date: "",
        branch_manager_name: "",
    });

    const [processing, setProcessing] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Submit — Approve & Complete
    |--------------------------------------------------------------------------
    */
    const submitApplication = (values) => {
        setProcessing(true);

        inertiaForm.transform(() => ({
            ...values,
            approval_status: values.approval_status || "approved",
            kyc_status: "verified",
        }));

        inertiaForm.put(
            route("kyc.approve", kycApplicant.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("kyc.index"));
                },
                onError: (errors) => {
                    console.error("Validation errors:", errors);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    /*
    Reject / Disapprove
    */
    const rejectApplication = () => {
        if (!confirm("Are you sure you want to disapprove this KYC record?")) {
            return;
        }

        router.post(
            route("kyc.reject", kycApplicant.id),
            {
                approved_by: form.getValues("approved_by") || "System",
                verification_notes: form.getValues("cross_checked_comments") || "",
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("kyc.index"));
                },
            }
        );
    };

    /*
    Helpers
    */
    const value = (v) => (v === null || v === undefined || v === "" ? "—" : v);

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

                    {/*
                        BACK BUTTON + HEADER
                    */}
                    <div className="mb-6 flex items-center justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(route("kyc.index"))}
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
                            Back to KYC List
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
                            Official KYC Review
                        </div>
                    </div>

                    {/*
                        APPLICANT DETAILS 
                    */}
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
                                icon={Fingerprint}
                                title="KYC Application"
                                description="Review the submitted KYC information before completing the official section."
                            />
                        </CardHeader>

                        <CardContent className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">

                            {/* ---------- PERSONAL DETAILS ---------- */}
                            <SectionBlock icon={UserRound} title="Personal Details">
                                <DetailItem label="Member SACCO Number" value={value(kycApplicant.member_sacco_number)} />
                                <DetailItem label="Phone Number" value={value(kycApplicant.member_phone_number)} />
                                <DetailItem label="ID Type" value={value(kycApplicant.id_type)} />
                                <DetailItem label="ID Number" value={value(kycApplicant.id_number)} />
                                <DetailItem label="Surname" value={value(kycApplicant.surname)} />
                                <DetailItem label="First Names" value={value(kycApplicant.first_names)} />
                                <DetailItem label="Date of Birth" value={value(kycApplicant.date_of_birth)} />
                                <DetailItem label="Gender" value={value(kycApplicant.gender)} />
                                <DetailItem label="Email" value={value(kycApplicant.email)} />
                                <DetailItem label="District" value={value(kycApplicant.district)} />
                                <DetailItem label="Village" value={value(kycApplicant.village)} />
                                <DetailItem label="Traditional Authority" value={value(kycApplicant.traditional_authority)} />
                            </SectionBlock>

                            {/* ---------- ADDRESSES ---------- */}
                            <SectionBlock icon={MapPin} title="Addresses">
                                <DetailItem label="Physical Address" value={value(kycApplicant.physical_address)} />
                                <DetailItem label="Mailing Address" value={value(kycApplicant.mailing_address)} />
                                <DetailItem label="Home Address" value={value(kycApplicant.home_address)} />
                            </SectionBlock>

                            {/* ---------- REFEREE ---------- */}
                            <SectionBlock icon={Users} title="Referee Details">
                                <DetailItem label="Referee Name" value={value(kycApplicant.referee_name)} />
                                <DetailItem label="Occupation" value={value(kycApplicant.referee_occupation)} />
                                <DetailItem label="Phone" value={value(kycApplicant.referee_phone)} />
                                <DetailItem label="Address" value={value(kycApplicant.referee_address)} />
                            </SectionBlock>
                        </CardContent>
                    </Card>

                    {/*
                        OFFICIAL USE FORM
                    */}
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
                                    Complete the official section and approve this KYC record.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={form.handleSubmit(submitApplication)} noValidate>

                            {/* Cross Checked Comments */}
                            <div className="mb-6">
                                <TextareaField
                                    Controller={Controller}
                                    form={form}
                                    name="cross_checked_comments"
                                    label="Cross Checked Comments"
                                    placeholder="Enter cross-check comments"
                                />
                            </div>

                            <FieldGroup className="grid gap-6 md:grid-cols-2">
                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="completed_by"
                                    label="Completed By"
                                    placeholder="Enter name"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="date_completed"
                                    label="Date Completed"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="date_membership_update"
                                    label="Date of Update to Membership"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="member_identification_number"
                                    label="Member Identification Number"
                                    placeholder="Enter member ID"
                                />

                                <SelectField
                                    Controller={Controller}
                                    form={form}
                                    name="approval_status"
                                    label="Approval Status"
                                    placeholder="Select status"
                                    options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "disapproved", label: "Disapproved" },
                                        { value: "pending", label: "Pending" },
                                    ]}
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="approved_by"
                                    label="Approved / Disapproved By"
                                    placeholder="Enter name"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="approval_date"
                                    label="Approval Date"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="branch_manager_name"
                                    label="Branch Manager Name"
                                    placeholder="Enter branch manager name"
                                />
                            </FieldGroup>

                            {/* ACTION BUTTONS */}
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
                                        : "Approve & Complete KYC"
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


/*
   Helper components
*/

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