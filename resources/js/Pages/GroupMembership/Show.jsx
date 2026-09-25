import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from '@/Components/TextField';
import TextareaField from "@/Components/TextareaField";
import SectionHeader from '@/Components/SectionHeader';
import { usePage, router } from "@inertiajs/react";
import { Controller } from "react-hook-form";

import { FieldGroup } from "@/Components/ui/field";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import {
    UserRound,
    Building2,
    Users,
    UsersRound,
    ClipboardCheck,
    BookOpen,
    Shield,
    ArrowLeft,
    CheckCircle2,
    XCircle,
} from "lucide-react";

export default function GroupMembershipShow() {
    const { groupMembershipApplicant } = usePage().props;
    const checkSchema = z.object({
        cross_checked_comments: z.string().optional(),
        entrance_fee_paid_on: z.string().optional(),
        entrance_fee_amount: z.preprocess(
            (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
            z.number().min(0).optional()
        ),
        receipt_number: z.string().optional(),
        completed_by: z.string().optional(),
        completed_date: z.string().optional(),
        date_of_admission: z.string().optional(),
        member_identification_number: z.string().optional(),
        approved_disapproved_by: z.string().optional(),
        branch_manager: z.string().optional(),
        official_signature: z.string().optional(),
        official_date: z.string().optional(),
    });

    // Inside component:
    const form = useReactHookForm({
        resolver: zodResolver(checkSchema),
        mode: "onChange",
        defaultValues: {
            cross_checked_comments: "",
            entrance_fee_paid_on: "",
            entrance_fee_amount: "",
            receipt_number: "",
            completed_by: "",
            completed_date: "",
            date_of_admission: "",
            member_identification_number: "",
            approved_disapproved_by: "",
            branch_manager: "",
            official_signature: "",
            official_date: "",
        },
    });
    const inertiaForm = useInertiaForm({
        cross_checked_comments: "",
        entrance_fee_paid_on: "",
        entrance_fee_amount: "",
        receipt_number: "",
        completed_by: "",
        completed_date: "",
        date_of_admission: "",
        member_identification_number: "",
        approved_disapproved_by: "",
        branch_manager: "",
        official_signature: "",
        official_date: "",
    });

    const [processing, setProcessing] = useState(false);

    /*
    Submit Official Request (Approve & Complete Record)
    */
    const submitApplication = (values) => {
        setProcessing(true);

        inertiaForm.transform(() => ({
            ...values,
            status: "approved",
        }));

        inertiaForm.post(
            route("group-memberships.approve", groupMembershipApplicant.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("group-memberships.index"));
                },
                onError: (errors) => {
                    console.error("Validation errors:", errors);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    /*
    Reject Application
    */
    const rejectApplication = () => {
        if (!confirm("Are you sure you want to disapprove this application?")) {
            return;
        }

        router.post(
            route("group-memberships.disapprove", groupMembershipApplicant.id),
            {
                approved_disapproved_by: form.getValues("approved_disapproved_by") || "System",
                disapproval_reason: form.getValues("cross_checked_comments") || "",
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("group-memberships.index"));
                },
            }
        );
    };

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
                            Official Review
                        </div>
                    </div>

                    {/*
                        RECORD DETAILS
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
                                icon={ClipboardCheck}
                                title="Group Membership Application"
                                description="Review the submitted application before completing official section."
                            />
                        </CardHeader>

                        <CardContent className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">

                            {/* GROUP DETAILS */}
                            <SectionBlock icon={Building2} title="Group Details">
                                <DetailItem label="Group Name" value={groupMembershipApplicant.group_name} />
                                <DetailItem label="Male Members" value={groupMembershipApplicant.number_of_members_male} />
                                <DetailItem label="Female Members" value={groupMembershipApplicant.number_of_members_female} />
                                <DetailItem label="Total Members" value={groupMembershipApplicant.number_of_members_total} />
                                <DetailItem label="Date of Registration" value={groupMembershipApplicant.date_of_registration} />
                                <DetailItem label="Registration Number" value={groupMembershipApplicant.registration_number} />
                                <DetailItem label="Registered Under" value={groupMembershipApplicant.registered_under} />
                                <DetailItem label="Business Type" value={groupMembershipApplicant.business_type} />
                                <DetailItem label="Income Source" value={groupMembershipApplicant.income_source} />
                                <DetailItem label="Place of Operation" value={groupMembershipApplicant.place_of_operation} />
                                <DetailItem label="Trading Area" value={groupMembershipApplicant.trading_area} />
                            </SectionBlock>

                            {/* REPRESENTATIVES */}
                            <SectionBlock icon={Users} title="Contact Person / Representatives">
                                <DetailItem label="Rep 1 Full Name" value={groupMembershipApplicant.rep1_full_name} />
                                <DetailItem label="Rep 1 ID Number" value={groupMembershipApplicant.rep1_id_number} />
                                <DetailItem label="Rep 1 Position" value={groupMembershipApplicant.rep1_position} />
                                <DetailItem label="Rep 1 Telephone" value={groupMembershipApplicant.rep1_telephone} />

                                <DetailItem label="Rep 2 Full Name" value={groupMembershipApplicant.rep2_full_name} />
                                <DetailItem label="Rep 2 ID Number" value={groupMembershipApplicant.rep2_id_number} />
                                <DetailItem label="Rep 2 Position" value={groupMembershipApplicant.rep2_position} />
                                <DetailItem label="Rep 2 Telephone" value={groupMembershipApplicant.rep2_telephone} />

                                <DetailItem label="Rep 3 Full Name" value={groupMembershipApplicant.rep3_full_name} />
                                <DetailItem label="Rep 3 ID Number" value={groupMembershipApplicant.rep3_id_number} />
                                <DetailItem label="Rep 3 Position" value={groupMembershipApplicant.rep3_position} />
                                <DetailItem label="Rep 3 Telephone" value={groupMembershipApplicant.rep3_telephone} />
                            </SectionBlock>

                            {/* ADDRESSES */}
                            <SectionBlock icon={Building2} title="Group Addresses">
                                <DetailItem label="Mailing Address" value={groupMembershipApplicant.group_mailing_address} />
                                <DetailItem label="Physical Address" value={groupMembershipApplicant.group_physical_address} />
                            </SectionBlock>

                            {/*RECOMMENDATION */}
                            <SectionBlock icon={UsersRound} title="Recommendation">
                                <DetailItem label="Centre Name" value={groupMembershipApplicant.recommendation_centre_name} />
                                <DetailItem label="Recommendation Date" value={groupMembershipApplicant.recommendation_date} />
                                <DetailItem label="Leader 1" value={groupMembershipApplicant.leader1_name} />
                                <DetailItem label="Leader 1 Position" value={groupMembershipApplicant.leader1_position} />
                                <DetailItem label="Leader 2" value={groupMembershipApplicant.leader2_name} />
                                <DetailItem label="Leader 2 Position" value={groupMembershipApplicant.leader2_position} />
                                <DetailItem label="Leader 3" value={groupMembershipApplicant.leader3_name} />
                                <DetailItem label="Leader 3 Position" value={groupMembershipApplicant.leader3_position} />
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
                                    Complete the official section and approve this application.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={form.handleSubmit(submitApplication)} noValidate>
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
                                    label="Date of Admission"
                                    type="date"
                                />
                                <div className="md:col-span-2">
                                    <TextField
                                        Controller={Controller}
                                        form={form}
                                        name="member_identification_number"
                                        label="Member Identification Number"
                                        placeholder="Enter member ID"
                                    />
                                </div>
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
                                    placeholder="Enter branch manager name"
                                />
                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="official_signature"
                                    label="Official Signature"
                                    placeholder="Enter signature"
                                />
                                <TextField
                                    Controller={Controller}
                                    form={form}
                                    name="official_date"
                                    label="Official Date"
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
                                    //type="submit"
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
                                    type="submit"
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
                {value || "—"}
            </p>
        </div>
    );
}