import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import UseGroupMembershipInertiaForm from './Components/GroupMembershipInertiaForm';
import UseGroupMembershipReactHookForm from './Components/GroupMembershipReactHookForm';
import {stepFields} from './Components/GroupMembershipStepFields';
import {steps} from './Components/GroupMembershipSteps';
import TextField from '@/Components/TextField';
import TextareaField from "@/Components/TextareaField";
import CheckboxField from "@/Components/CheckboxField";
import SectionHeader from "@/Components/SectionHeader";

import {
    Controller
} from "react-hook-form";

import {
    FieldGroup
} from "@/Components/ui/field";
import { Button } from "@/Components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/Components/ui/card";

import {
    Check,
    ChevronLeft,
    ChevronRight,
    FileCheck2,
    UserRound,
    Users,
    Fingerprint,
    BookOpen,
    MapPin,
    Shield,
    Heart,
    Handshake,
    Crown,
    AlertCircle,
    UserPlus,
    Sparkles,
    BadgeCheck,
    Building2,
    Building,
    UsersRound,
    ClipboardCheck,
    Phone,
    Mail,
    Calendar,
} from "lucide-react";


export default function Create() {
    const inertiaForm = UseGroupMembershipInertiaForm();
    const form = UseGroupMembershipReactHookForm();
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = async () => {

        const fields = stepFields[currentStep];

        const isValid =
            fields.length === 0
                ? true
                : await form.trigger(fields);

        if (!isValid) {
            setTimeout(() => {
                const firstError = document.querySelector('[aria-invalid="true"]');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    firstError.focus?.();
                }
            }, 100);
            return;
        }

        setCurrentStep((current) => Math.min(current + 1, steps.length));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    /*
     Previous Step
    */

    const previousStep = () => {

        setCurrentStep((current) => Math.max(current - 1, 1));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    /*
     Go to step
    
    */

    const goToStep = (stepNumber) => {
        if (stepNumber < currentStep) {
            setCurrentStep(stepNumber);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };


    /*
     Submit
    
    */

     const submitApplication = (values) => {
        // Remove official-use-only fields before posting (public form)
        const {
            cross_checked_comments,
            entrance_fee_paid_on,
            entrance_fee_amount,
            receipt_number,
            completed_by,
            completed_date,
            date_of_admission,
            member_identification_number,
            approved_disapproved_by,
            branch_manager,
            official_signature,
            official_date,
            ...publicValues
        } = values;

        inertiaForm
            .transform(() => publicValues)
            .post(route("group-memberships.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    inertiaForm.reset();
                    setCurrentStep(1);
                },
                onError: (errors) => {
                    alert("Error:", errors);
                },
            });
    };


    return (
        <>
            <NavBar />

            <div className="
                relative
                min-h-screen
                overflow-hidden
                bg-gradient-to-b
                from-gray-50
                via-white
                to-green-50/20
                px-4
                py-8
                font-questrial
                sm:px-6
                lg:px-8
            ">

                {/* background */}
                <div className="
                    pointer-events-none
                    absolute
                    -left-40
                    -top-40
                    h-96
                    w-96
                    rounded-full
                    bg-green-200/20
                    blur-3xl
                " />
                <div className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-80
                    h-96
                    w-96
                    rounded-full
                    bg-orange-200/15
                    blur-3xl
                " />
                <div className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-green-100/20
                    blur-3xl
                " />

                <div className="
                    relative
                    mx-auto
                    w-full
                    max-w-6xl
                ">

                    {/* 
                        PAGE HEADER
                   */}

                    <div className="mb-8 text-center">

                        <h1 className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-green-900
                            sm:text-4xl
                            lg:text-5xl
                        ">
                            <span className="inline-flex items-center gap-3">
                                Group Registration
                            </span>
                        </h1>

                        <p className="
                            mx-auto
                            mt-3
                            max-w-2xl
                            text-sm
                            leading-7
                            text-gray-500
                            sm:text-base
                        ">
                            Complete the application below to register your
                            group or company as a member of Finance Cooperative Limited.
                        </p>

                        <div className="
                            mt-4
                            inline-flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-6
                            rounded-xl
                            border
                            border-green-100
                            bg-gradient-to-r
                            from-green-50/50
                            to-white
                            px-6
                            py-3
                            shadow-sm
                        ">
                            <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <BadgeCheck className="size-4 text-green-600" />
                                Trusted Partner
                            </span>
                            <span className="hidden sm:block w-px h-5 bg-green-200" />
                            <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <Users className="size-4 text-green-600" />
                                Group Benefits
                            </span>
                            <span className="hidden sm:block w-px h-5 bg-green-200" />
                            <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <Heart className="size-4 text-green-600" />
                                Community Focused
                            </span>
                        </div>
                    </div>

                    {/*
                        PROGRESS STEPPER
                     */}

                    <div className="
                        mb-8
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-md
                        sm:p-7
                    ">
                        <div className="flex items-start justify-between">
                            {steps.map((step, index) => {
                                const isActive = currentStep === step.number;
                                const isCompleted = currentStep > step.number;
                                const Icon = step.icon;

                                return (
                                    <div key={step.number} className="flex flex-1 items-start">
                                        <div className="flex w-full flex-col items-center">
                                            <button
                                                type="button"
                                                disabled={step.number >= currentStep}
                                                onClick={() => goToStep(step.number)}
                                                className={`
                                                    relative
                                                    flex
                                                    h-12
                                                    w-12
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border-2
                                                    font-bold
                                                    transition-all
                                                    duration-300

                                                    ${isActive
                                                        ? `
                                                            border-green-700
                                                            bg-gradient-to-br
                                                            from-green-700
                                                            to-green-900
                                                            text-white
                                                            shadow-lg
                                                            shadow-green-900/25
                                                            ring-4
                                                            ring-green-100
                                                            scale-110
                                                        `
                                                        : ""
                                                    }

                                                    ${isCompleted
                                                        ? `
                                                            cursor-pointer
                                                            border-green-400
                                                            bg-green-100
                                                            text-green-700
                                                            hover:bg-green-200
                                                        `
                                                        : ""
                                                    }

                                                    ${!isActive && !isCompleted
                                                        ? `
                                                            border-gray-200
                                                            bg-gray-100
                                                            text-gray-400
                                                        `
                                                        : ""
                                                    }
                                                `}
                                            >
                                                {isCompleted ? (
                                                    <Check className="size-6 sm:size-7" />
                                                ) : (
                                                    <Icon className="size-6 sm:size-7" />
                                                )}

                                                {isActive && (
                                                    <span className="
                                                        absolute
                                                        -bottom-2.5
                                                        left-1/2
                                                        h-1.5
                                                        w-10
                                                        -translate-x-1/2
                                                        rounded-full
                                                        bg-gradient-to-r
                                                        from-orange-400
                                                        to-orange-600
                                                        sm:w-12
                                                    " />
                                                )}
                                            </button>

                                            <div className="mt-4 text-center">
                                                <p className={`
                                                    text-xs
                                                    font-bold
                                                    sm:text-sm
                                                    ${isActive
                                                        ? "text-green-900"
                                                        : isCompleted
                                                            ? "text-green-700"
                                                            : "text-gray-400"
                                                    }
                                                `}>
                                                    {step.title}
                                                </p>
                                            </div>
                                        </div>

                                        {index < steps.length - 1 && (
                                            <div className="
                                                mt-7
                                                hidden
                                                h-[2px]
                                                flex-1
                                                bg-gray-200
                                                sm:block
                                            ">
                                                <div
                                                    className={`
                                                        h-full
                                                        transition-all
                                                        duration-500
                                                        ${currentStep > step.number
                                                            ? "w-full bg-green-600"
                                                            : "w-0"
                                                        }
                                                    `}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/*
                        CURRENT STEP INDICATOR
                    */}

                    <div className="
                        mb-6
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-green-100
                        bg-gradient-to-r
                        from-green-50
                        to-white
                        px-5
                        py-3.5
                        shadow-sm
                    ">
                        <div className="flex items-center gap-3">
                            <div className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-green-700
                                to-green-900
                                text-sm
                                font-bold
                                text-white
                                shadow-md
                            ">
                                {currentStep}
                            </div>

                            <div>
                                <p className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-green-600
                                ">
                                    Current Stage
                                </p>
                                <p className="font-bold text-green-900">
                                    {steps.find(s => s.number === currentStep)?.title}
                                </p>
                            </div>
                        </div>

                        <div className="
                            hidden
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-green-600
                            sm:flex
                        ">
                            <span>Group membership application</span>
                            <Shield className="size-4 text-green-500" />
                        </div>
                    </div>

                    {/*
                        FORM
                    */}

                    <form
                        onSubmit={form.handleSubmit(submitApplication)}
                        noValidate
                    >

                        {/*
                            STEP 1 — GROUP DETAILS
                        */}

                        {currentStep === 1 && (
                            <Card className="
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
                                        icon={Building2}
                                        title="Group Details"
                                        description="
                                            Enter your group or company details
                                            as required on the membership
                                            application form.
                                        "
                                    />
                                </CardHeader>

                                <CardContent className="
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <FieldGroup className="
                                        grid
                                        gap-6
                                        md:grid-cols-2
                                    ">
                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="group_name"
                                                label="Group Name"
                                                placeholder="Enter group/company name"
                                            />
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="number_of_members_male"
                                            label="No. of Members - Male"
                                            type="number"
                                            placeholder="Enter number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="number_of_members_female"
                                            label="No. of Members - Female"
                                            type="number"
                                            placeholder="Enter number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="number_of_members_total"
                                            label="Total Members"
                                            type="number"
                                            placeholder="Enter total"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="date_of_registration"
                                            label="Date of Registration"
                                            type="date"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="registration_number"
                                            label="Registration No."
                                            placeholder="Enter registration number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="registered_under"
                                            label="Registered Under"
                                            placeholder="Enter registration authority"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="business_type"
                                            label="Group/Company Actual Type of Business"
                                            placeholder="Enter business type"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="income_source"
                                            label="Income Source"
                                            placeholder="Enter income source"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="place_of_operation"
                                            label="Place of Operation / Centre"
                                            placeholder="Enter place of operation"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="trading_area"
                                            label="Trading Area"
                                            placeholder="Enter trading area"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 2 — REPRESENTATIVES
                        */}

                        {currentStep === 2 && (
                            <Card className="
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
                                        icon={Users}
                                        title="Contact Person / Group Representatives"
                                        description="
                                            Provide contact person details and
                                            group representatives information.
                                        "
                                    />
                                </CardHeader>

                                <CardContent className="
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <FieldGroup className="
                                        grid
                                        gap-6
                                        md:grid-cols-2
                                    ">
                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="group_mailing_address"
                                                label="Group/Company Mailing Address"
                                                placeholder="Enter mailing address"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="group_physical_address"
                                                label="Group/Company Physical Address"
                                                placeholder="Enter physical address"
                                            />
                                        </div>

                                        {/* Representative 1 */}
                                        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                            <h3 className="mb-4 text-md font-bold text-green-800 flex items-center gap-2">
                                                <UserPlus className="size-4" />
                                                Representative 1
                                            </h3>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep1_full_name"
                                            label="Full Name"
                                            placeholder="Enter full name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep1_id_number"
                                            label="ID No."
                                            placeholder="Enter ID number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep1_position"
                                            label="Position"
                                            placeholder="Enter position"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep1_telephone"
                                            label="Telephone"
                                            placeholder="Enter telephone"
                                        />

                                        {/* Representative 2 */}
                                        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                            <h3 className="mb-4 text-md font-bold text-green-800 flex items-center gap-2">
                                                <UserPlus className="size-4" />
                                                Representative 2
                                            </h3>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep2_full_name"
                                            label="Full Name"
                                            placeholder="Enter full name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep2_id_number"
                                            label="ID No."
                                            placeholder="Enter ID number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep2_position"
                                            label="Position"
                                            placeholder="Enter position"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep2_telephone"
                                            label="Telephone"
                                            placeholder="Enter telephone"
                                        />

                                        {/* Representative 3 */}
                                        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                            <h3 className="mb-4 text-md font-bold text-green-800 flex items-center gap-2">
                                                <UserPlus className="size-4" />
                                                Representative 3
                                            </h3>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep3_full_name"
                                            label="Full Name"
                                            placeholder="Enter full name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep3_id_number"
                                            label="ID No."
                                            placeholder="Enter ID number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep3_position"
                                            label="Position"
                                            placeholder="Enter position"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="rep3_telephone"
                                            label="Telephone"
                                            placeholder="Enter telephone"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 3 — RECOMMENDATION
                        */}

                        {currentStep === 3 && (
                            <Card className="
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
                                        title="Recommendation"
                                        description="
                                            Provide recommendation details and
                                            signatures from group leaders.
                                        "
                                    />
                                </CardHeader>

                                <CardContent className="
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <FieldGroup className="
                                        grid
                                        gap-6
                                        md:grid-cols-2
                                    ">
                                        <div className="md:col-span-2">
                                            <div className="
                                                rounded-xl
                                                border-2
                                                border-green-200
                                                bg-gradient-to-r
                                                from-green-50/80
                                                to-white
                                                p-5
                                                sm:p-6
                                            ">
                                                <div className="mb-4 flex items-center gap-3">
                                                    <div className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-gradient-to-br
                                                        from-green-700
                                                        to-green-900
                                                        text-white
                                                        shadow-sm
                                                    ">
                                                        <BadgeCheck className="size-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-green-900">
                                                            Recommendation Statement
                                                        </h3>
                                                        <p className="text-xs text-green-600">
                                                            Please read carefully
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="
                                                    text-sm
                                                    leading-7
                                                    text-gray-700
                                                ">
                                                    We Leaders of the Mobile Banking Centre have cross-checked
                                                    the dealings of the Club's individual members and so we
                                                    hereby recommend them to open an Account with Fincoop.
                                                </p>
                                            </div>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="recommendation_centre_name"
                                            label="Mobile Banking Centre Name"
                                            placeholder="Enter centre name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="recommendation_date"
                                            label="Signed Date"
                                            type="date"
                                        />

                                        {/* Leader 1 */}
                                        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                            <h3 className="mb-4 text-md font-bold text-green-800 flex items-center gap-2">
                                                <Crown className="size-4" />
                                                Leader 1
                                            </h3>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader1_name"
                                            label="Name"
                                            placeholder="Enter name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader1_signature"
                                            label="Signature"
                                            placeholder="Enter signature"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader1_position"
                                            label="Position"
                                            placeholder="Enter position"
                                        />

                                        {/* Leader 2 */}
                                        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                            <h3 className="mb-4 text-md font-bold text-green-800 flex items-center gap-2">
                                                <Crown className="size-4" />
                                                Leader 2
                                            </h3>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader2_name"
                                            label="Name"
                                            placeholder="Enter name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader2_signature"
                                            label="Signature"
                                            placeholder="Enter signature"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader2_position"
                                            label="Position"
                                            placeholder="Enter position"
                                        />

                                        {/* Leader 3 */}
                                        <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                            <h3 className="mb-4 text-md font-bold text-green-800 flex items-center gap-2">
                                                <Crown className="size-4" />
                                                Leader 3
                                            </h3>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader3_name"
                                            label="Name"
                                            placeholder="Enter name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader3_signature"
                                            label="Signature"
                                            placeholder="Enter signature"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="leader3_position"
                                            label="Position"
                                            placeholder="Enter position"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 4 — DECLARATION & OFFICIAL USE
                        */}

                        {currentStep === 4 && (
                            <Card className="
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
                                        title="Declaration & Official Use"
                                        description="
                                            Confirm the declaration, provide
                                            signatures, and official use section.
                                        "
                                    />
                                </CardHeader>

                                <CardContent className="
                                    space-y-8
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <FieldGroup className="gap-6">
                                        <div className="
                                            rounded-xl
                                            border-2
                                            border-green-200
                                            bg-gradient-to-r
                                            from-green-50/80
                                            to-white
                                            p-5
                                            sm:p-6
                                        ">
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-gradient-to-br
                                                    from-green-700
                                                    to-green-900
                                                    text-white
                                                    shadow-sm
                                                ">
                                                    <Handshake className="size-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-green-900">
                                                        Declaration
                                                    </h3>
                                                    <p className="text-xs text-green-600">
                                                        Please read carefully
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="
                                                text-sm
                                                leading-7
                                                text-gray-700
                                            ">
                                                I (We) the proprietor (members) declare that the above
                                                information is accurate and true to the best of our
                                                knowledge. I (We) understand that I (we) may be
                                                prosecuted by the Finance Cooperative Limited for
                                                wilfully supplying inaccurate information.
                                            </p>
                                        </div>

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="declaration_accepted"
                                            label="I (We) declare that the information provided above is accurate and true."
                                        />

                                        <div className="
                                            grid
                                            gap-6
                                            md:grid-cols-3
                                        ">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="chairperson_signature"
                                                label="Chairperson Signature"
                                                placeholder="Enter signature"
                                            />

                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="secretary_signature"
                                                label="Secretary Signature"
                                                placeholder="Enter signature"
                                            />

                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="treasurer_signature"
                                                label="Treasurer Signature"
                                                placeholder="Enter signature"
                                            />
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="application_date"
                                            label="Date of Application"
                                            type="date"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/* 
                            NAVIGATION
                        */}

                        <div className="
                            mt-8
                            flex
                            flex-col-reverse
                            gap-3
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={currentStep === 1}
                                onClick={previousStep}
                                className="
                                    h-12
                                    rounded-xl
                                    border-gray-300
                                    bg-white
                                    px-6
                                    font-semibold
                                    text-gray-600
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:border-green-700
                                    hover:bg-green-50
                                    hover:text-green-800
                                "
                            >
                                <ChevronLeft className="mr-2 size-5" />
                                Previous
                            </Button>

                            <div className="order-first text-center sm:order-none">
                                <span className="text-sm font-semibold text-gray-400">
                                    Step{" "}
                                    <span className="font-bold text-green-800">
                                        {currentStep}
                                    </span>
                                    {" "}of{" "}
                                    {steps.length}
                                </span>
                            </div>

                            {currentStep < steps.length ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
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
                                    "
                                >
                                    Continue
                                    <ChevronRight className="ml-2 size-5" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={inertiaForm.processing}
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
                                    {inertiaForm.processing
                                        ? "Submitting..."
                                        : "Submit Group Membership"
                                    }
                                    {!inertiaForm.processing && (
                                        <UsersRound className="ml-2 size-5" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>

                    <div className="
                        mt-8
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        text-center
                        sm:flex-row
                    ">
                        <Shield className="size-4 text-green-500" />
                        <p className="text-xs leading-6 text-gray-400">
                            Your group information is submitted securely and will be used for membership verification purposes.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}