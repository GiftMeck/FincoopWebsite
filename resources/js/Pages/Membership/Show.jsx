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
    Building2,
    FileCheck2,
    Heart,
} from "lucide-react";


const optionalNumber = z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z.number().min(0).optional()
);

const membershipCheckSchema = z.object({
    entrance_fee_paid_on: z.string().optional(),
    entrance_fee_amount: optionalNumber,
    receipt_number: z.string().optional(),
    completed_by: z.string().optional(),
    completed_date: z.string().optional(),
    date_of_admission: z.string().optional(),
    approved_disapproved_by: z.string().optional(),
    branch_manager: z.string().optional(),
    official_date: z.string().optional(),
    approval_status: z.string().optional(),
});


export default function MembershipShow() {
    const { membershipApplicant } = usePage().props;
    const form = useReactHookForm({
        resolver: zodResolver(membershipCheckSchema),
        mode: "onChange",
        defaultValues: {
            entrance_fee_paid_on: "",
            entrance_fee_amount: "",
            receipt_number: "",
            completed_by: "",
            completed_date: "",
            date_of_admission: "",
            approved_disapproved_by: "",
            branch_manager: "",
            official_date: "",
            approval_status: "",
        },
    });
    const inertiaForm = useInertiaForm({
        entrance_fee_paid_on: "",
        entrance_fee_amount: "",
        receipt_number: "",
        completed_by: "",
        completed_date: "",
        date_of_admission: "",
        approved_disapproved_by: "",
        branch_manager: "",
        official_date: "",
        approval_status: "",
    });

    const [processing, setProcessing] = useState(false);

    const submitApplication = (values) => {
        setProcessing(true);

        inertiaForm.transform(() => ({
            ...values,
            approval_status: values.approval_status || "approved",
        }));
        inertiaForm.post(
            route("memberships.approve", membershipApplicant.membership_id),
            {
                preserveScroll: true,
                onError: (errors) => {
                    console.error("Validation errors:", errors);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    const rejectApplication = () => {
        if (!confirm("Are you sure you want to disapprove this membership application?")) {
            return;
        }

        router.post(
            route("memberships.disapprove", membershipApplicant.id),
            {
                approved_disapproved_by:
                    form.getValues("approved_disapproved_by") || "System",
                reason:
                    form.getValues("cross_checked_comments") || "Not specified",
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("memberships.index"));
                },
            }
        );
    };

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

                    <div className="mb-6 flex items-center justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(route("dashboard"))}
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
                            Official Membership Review
                        </div>
                    </div>

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
                                icon={Heart}
                                title="Individual Membership Application"
                                description="Review the submitted membership details before completing the official section."
                            />
                        </CardHeader>

                        <CardContent className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">

                            {/* ---------- PERSONAL DETAILS ---------- */}
                            <SectionBlock icon={UserRound} title="Personal Details">
                                <DetailItem label="Member SACCO Number" value={value(membershipApplicant.member_sacco_number)} />
                                <DetailItem label="Phone Number" value={value(membershipApplicant.member_phone_number)} />
                                <DetailItem label="ID Type" value={value(membershipApplicant.id_type)} />
                                <DetailItem label="ID Number" value={value(membershipApplicant.id_number)} />
                                <DetailItem label="Surname" value={value(membershipApplicant.surname)} />
                                <DetailItem label="First Names" value={value(membershipApplicant.first_names)} />
                                <DetailItem label="Date of Birth" value={value(membershipApplicant.date_of_birth)} />
                                <DetailItem label="Gender" value={value(membershipApplicant.gender)} />
                                <DetailItem label="Email" value={value(membershipApplicant.email)} />
                                <DetailItem label="District" value={value(membershipApplicant.district)} />
                                <DetailItem label="Village" value={value(membershipApplicant.village)} />
                                <DetailItem label="Traditional Authority" value={value(membershipApplicant.traditional_authority)} />
                            </SectionBlock>

                            {/* ---------- ADDRESSES ---------- */}
                            <SectionBlock icon={MapPin} title="Addresses">
                                <DetailItem label="Physical Address" value={value(membershipApplicant.physical_address)} />
                                <DetailItem label="Mailing Address" value={value(membershipApplicant.mailing_address)} />
                                <DetailItem label="Home Address" value={value(membershipApplicant.home_address)} />
                            </SectionBlock>

                            {/* ---------- REFEREE ---------- */}
                            <SectionBlock icon={Users} title="Referee Details">
                                <DetailItem label="Referee Name" value={value(membershipApplicant.referee_name)} />
                                <DetailItem label="Occupation" value={value(membershipApplicant.referee_occupation)} />
                                <DetailItem label="Phone" value={value(membershipApplicant.referee_phone)} />
                                <DetailItem label="Address" value={value(membershipApplicant.referee_address)} />
                            </SectionBlock>
                        </CardContent>
                    </Card>

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
                                    Complete the official section and approve this membership application.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={form.handleSubmit(submitApplication)} noValidate>
                            <FieldGroup className="grid gap-6 md:grid-cols-2">
                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="entrance_fee_paid_on"
                                    label="Entrance Fee Paid On"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="entrance_fee_amount"
                                    label="Amount (MK)"
                                    type="number"
                                    placeholder="Enter amount"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="receipt_number"
                                    label="Receipt Number"
                                    placeholder="Enter receipt number"
                                />

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
                                    name="completed_date"
                                    label="Completed Date"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="date_of_admission"
                                    label="Date of Admission to Membership"
                                    type="date"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="approved_disapproved_by"
                                    label="Approved / Disapproved By"
                                    placeholder="Enter name"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="branch_manager"
                                    label="Branch Manager"
                                    placeholder="Enter branch manager"
                                />

                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="official_date"
                                    label="Official Date"
                                    type="date"
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
                            </FieldGroup>

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
                                    onClick={()=>{
                                        console.log(form.getValues())
                                    }}
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
                                        : "Approve & Complete Membership"
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