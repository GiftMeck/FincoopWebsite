import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";

import {
    Controller
} from "react-hook-form";
import UseMembershipReactHookForm from './Components/membershipReactHookForm';
import UseMembershipInertiaForm from './Components/membershipInertiaForm';
import { steps } from './Components/membershipSteps';
import { stepFields } from './Components/membershipStepFields';
import TextField from '@/Components/TextField';
import TextareaField from "@/Components/TextareaField";
import SelectField from "@/Components/SelectField";
import CheckboxField from "@/Components/CheckboxField";
import SectionHeader from "@/Components/SectionHeader";
import {
    FieldGroup
} from "@/Components/ui/field";

import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import {
    Check,
    ChevronLeft,
    ChevronRight,
    FileCheck2,
    UserRound,
    WalletCards,
    BriefcaseBusiness,
    Landmark,
    ClipboardCheck,
    AlertCircle,
    ShieldCheck,
    Sparkles,
    CircleCheck,
    User,
    Building2,
    CreditCard,
    Calculator,
    FileText,
    Users,
    Handshake,
    BadgeCheck,
    Clock,
    PiggyBank,
    TrendingUp,
    DollarSign,
    Receipt,
    Calendar,
    Fingerprint,
    PenTool,
    Star,
    Heart,
    Crown,
    Mail,
    Phone,
    MapPin,
    Award,
} from "lucide-react";


export default function Create() {
    const form = UseMembershipReactHookForm();
    const inertiaForm = UseMembershipInertiaForm();
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = async () => {

        const fields =
            stepFields[
                currentStep
            ];

        const isValid =
            fields.length === 0
                ? true
                : await form.trigger(
                    fields
                );

        if (!isValid) {
            // Scroll to first error
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

        setCurrentStep(
            (current) =>
                Math.min(
                    current + 1,
                    steps.length
                )
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    /*
    Previous Step
    */

    const previousStep = () => {

        setCurrentStep(
            (current) =>
                Math.max(
                    current - 1,
                    1
                )
        );

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

        inertiaForm.transform(() => values);

        inertiaForm.post(
            route("memberships.store"),
            {
                preserveScroll: true,

                onSuccess: () => {
                    form.reset();
                    inertiaForm.reset();
                    setCurrentStep(1);
                },
            }
        );

    };

    const currentStepData = steps[currentStep - 1];


    return (
        <>
            <NavBar />

            <div className="
                relative
                min-h-screen
                overflow-hidden
                bg-gray-50
                px-4
                py-8
                font-questrial
                sm:px-6
                lg:px-8
            ">

                {/* Decorative background */}
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
                    bg-emerald-200/15
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
                        <div className="
                            mb-4
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-green-800/20
                            bg-green-50
                            px-5
                            py-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-green-800
                        ">
                            INDIVIDUAL MEMBERSHIP
                        </div>

                        <h1 className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-green-900
                            sm:text-4xl
                            lg:text-5xl
                        ">
                            <span className="inline-flex items-center gap-3">
                                Join FINCOOP
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
                            Complete the application below to become a member
                            of Finance Cooperative Limited.
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
                            bg-green-50/50
                            px-6
                            py-3
                        ">
                            <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <BadgeCheck className="size-4 text-green-600" />
                                Trusted
                            </span>
                            <span className="hidden sm:block w-px h-5 bg-green-200" />
                            <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <Sparkles className="size-4 text-green-600" />
                                Benefits
                            </span>
                            <span className="hidden sm:block w-px h-5 bg-green-200" />
                            <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <Heart className="size-4 text-green-600" />
                                Community
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
                        p-4
                        shadow-md
                        sm:p-6
                    ">
                        <div className="flex items-start justify-between">
                            {steps.map((step, index) => {
                                const stepNumber = index + 1;
                                const isActive = currentStep === stepNumber;
                                const isCompleted = currentStep > stepNumber;

                                // Map step titles to icons
                                const stepIcons = {
                                    "Personal": UserRound,
                                    "Contact & Employment": Building2,
                                    "Monthly Deduction": PiggyBank,
                                    "Beneficiaries & Referee": Users,
                                    "Declaration": ClipboardCheck,
                                };
                                const Icon = stepIcons[step] || UserRound;

                                return (
                                    <div key={step} className="flex flex-1 items-start">
                                        <div className="flex w-full flex-col items-center">
                                            <button
                                                type="button"
                                                disabled={stepNumber >= currentStep}
                                                onClick={() => goToStep(stepNumber)}
                                                className={`
                                                    relative
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border-2
                                                    font-bold
                                                    transition-all
                                                    duration-300
                                                    sm:h-14
                                                    sm:w-14

                                                    ${isActive
                                                        ? `
                                                            border-green-800
                                                            bg-green-800
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
                                                            border-green-700
                                                            bg-green-100
                                                            text-green-800
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
                                                    <Check className="size-5 sm:size-6" />
                                                ) : (
                                                    <Icon className="size-5 sm:size-6" />
                                                )}

                                                {isActive && (
                                                    <span className="
                                                        absolute
                                                        -bottom-2
                                                        left-1/2
                                                        h-1
                                                        w-8
                                                        -translate-x-1/2
                                                        rounded-full
                                                        bg-orange-500
                                                        sm:w-10
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
                                                            ? "text-green-800"
                                                            : "text-gray-400"
                                                    }
                                                `}>
                                                    {step}
                                                </p>
                                            </div>
                                        </div>

                                        {index < steps.length - 1 && (
                                            <div className="
                                                mt-6
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
                                                        ${currentStep > stepNumber
                                                            ? "w-full bg-green-700"
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
                        gap-3
                        rounded-xl
                        border
                        border-green-100
                        bg-green-50
                        px-4
                        py-3
                        text-green-900
                        shadow-sm
                    ">
                        <div className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-green-800
                            text-white
                        ">
                            {currentStep}
                        </div>

                        <div>
                            <p className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-green-700
                            ">
                                Current Stage
                            </p>
                            <p className="font-bold">
                                {currentStepData}
                            </p>
                        </div>
                    </div>

                    {/*
                        FORM
                   */}

                    <form
                        onSubmit={
                            form.handleSubmit(
                                submitApplication
                            )
                        }
                        noValidate
                    >

                        {/*
                            STEP 1 — PERSONAL DETAILS
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
                                        icon={UserRound}
                                        title="Personal Details"
                                        description="
                                            Enter your personal information
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
                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="title"
                                            label="Title"
                                            placeholder="Select title"
                                            options={[
                                                { value: "mr", label: "Mr" },
                                                { value: "mrs", label: "Mrs" },
                                                { value: "miss", label: "Miss" },
                                                { value: "ms", label: "Ms" },
                                                { value: "dr", label: "Dr" },
                                            ]}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="surname"
                                            label="Surname"
                                            placeholder="Enter surname"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="first_name"
                                            label="First Name"
                                            placeholder="Enter first name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="additional_name"
                                            label="Additional Name"
                                            placeholder="Enter additional name if applicable"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="date_of_birth"
                                            label="Date of Birth"
                                            type="date"
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="gender"
                                            label="Gender"
                                            placeholder="Select gender"
                                            options={[
                                                { value: "male", label: "Male" },
                                                { value: "female", label: "Female" },
                                            ]}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="nationality"
                                            label="Nationality"
                                            placeholder="Enter nationality"
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="marital_status"
                                            label="Status"
                                            placeholder="Select marital status"
                                            options={[
                                                { value: "married", label: "Married" },
                                                { value: "divorced", label: "Divorced" },
                                                { value: "single", label: "Single" },
                                                { value: "widow", label: "Widow" },
                                                { value: "widower", label: "Widower" },
                                            ]}
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="id_type"
                                            label="Type of ID"
                                            placeholder="Select ID type"
                                            options={[
                                                { value: "national_id", label: "National ID" },
                                                { value: "passport", label: "Passport" },
                                                { value: "drivers_license", label: "Driver's License" },
                                            ]}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="id_number"
                                            label="ID Number"
                                            placeholder="Enter ID number"
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
                                            name="occupation"
                                            label="Occupation"
                                            placeholder="Enter occupation"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="qualification"
                                            label="Qualification"
                                            placeholder="Enter qualification"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="number_of_dependants"
                                            label="Number of Dependants"
                                            type="number"
                                            placeholder="Enter number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="village"
                                            label="Village"
                                            placeholder="Enter village"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="traditional_authority"
                                            label="Traditional Authority"
                                            placeholder="Enter traditional authority"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="district"
                                            label="District"
                                            placeholder="Enter district"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 2 — CONTACT & EMPLOYMENT
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
                                        icon={Building2}
                                        title="Contact & Employment"
                                        description="
                                            Provide your address, contact,
                                            and employer information.
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
                                            <TextareaField
                                                Controller={Controller}
                                                form={form}
                                                name="physical_address"
                                                label="Physical Address"
                                                placeholder="Enter physical address"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <TextareaField
                                                Controller={Controller}
                                                form={form}
                                                name="mailing_address"
                                                label="Mailing Address"
                                                placeholder="Enter mailing address"
                                            />
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="telephone"
                                            label="Telephone"
                                            type="tel"
                                            placeholder="Enter telephone number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="cell_phone"
                                            label="Cell Phone"
                                            type="tel"
                                            placeholder="Enter cell phone number"
                                        />

                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="email"
                                                label="Email"
                                                type="email"
                                                placeholder="Enter email address"
                                            />
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employer_name"
                                            label="Name of Employer"
                                            placeholder="Enter employer name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employer_address"
                                            label="Address of Employer"
                                            placeholder="Enter employer address"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employer_telephone"
                                            label="Telephone of Employer"
                                            type="tel"
                                            placeholder="Enter employer telephone"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employer_fax_number"
                                            label="Fax Number"
                                            placeholder="Enter employer fax number"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 3 — MONTHLY DEDUCTION
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
                                        icon={PiggyBank}
                                        title="Monthly Deduction"
                                        description="
                                            Set the monthly deductions you
                                            would like to make. The supplied
                                            form states that this can be changed
                                            at any time based on member preference.
                                        "
                                    />
                                </CardHeader>

                                <CardContent className="
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <div className="
                                        mb-6
                                        rounded-xl
                                        border
                                        border-blue-100
                                        bg-blue-50
                                        p-4
                                        text-sm
                                        text-blue-800
                                    ">
                                        <div className="flex items-start gap-3">
                                            <Clock className="size-5 text-blue-600 shrink-0 mt-0.5" />
                                            <p>This can be changed at any time based on member preferences.</p>
                                        </div>
                                    </div>

                                    <FieldGroup className="
                                        grid
                                        gap-6
                                        md:grid-cols-3
                                    ">
                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employment_number"
                                            label="Employment Number"
                                            placeholder="Enter employment number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="monthly_shares"
                                            label="Monthly Shares"
                                            type="number"
                                            placeholder="Enter amount"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="monthly_savings_ps"
                                            label="Monthly SV/PS"
                                            type="number"
                                            placeholder="Enter amount"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 4 — BENEFICIARIES & REFEREE
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
                                        icon={Users}
                                        title="Beneficiary / Nominee & Referee"
                                        description="
                                            Provide beneficiary/nominee details
                                            and the referee information requested
                                            on the membership form.
                                        "
                                    />
                                </CardHeader>

                                <CardContent className="
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <div className="
                                        mb-6
                                        rounded-xl
                                        border
                                        border-green-100
                                        bg-green-50
                                        p-4
                                        text-sm
                                        text-green-800
                                    ">
                                        <div className="flex items-start gap-3">
                                            <Heart className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <p>Please provide beneficiary/nominee details as required on the membership form.</p>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <div className="min-w-[760px]">
                                            <div className="
                                                mb-3
                                                grid
                                                grid-cols-[1.3fr_1fr_1.4fr]
                                                gap-3
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500
                                            ">
                                                <span>Full Name</span>
                                                <span>Relationship</span>
                                                <span>Date of Birth & % Age</span>
                                            </div>

                                            {[1, 2, 3].map((number) => (
                                                <div
                                                    key={number}
                                                    className="
                                                        mb-4
                                                        grid
                                                        grid-cols-[1.3fr_1fr_1.4fr]
                                                        gap-3
                                                    "
                                                >
                                                    <TextField
                                                        Controller={Controller}
                                                        form={form}
                                                        name={`beneficiary_${number}_name`}
                                                        label={`Beneficiary ${number}`}
                                                        placeholder="Full name"
                                                    />

                                                    <TextField
                                                        Controller={Controller}
                                                        form={form}
                                                        name={`beneficiary_${number}_relationship`}
                                                        label="Relationship"
                                                        placeholder="Relationship"
                                                    />

                                                    <TextField
                                                        Controller={Controller}
                                                        form={form}
                                                        name={`beneficiary_${number}_birth_date_percentage`}
                                                        label="Date / %"
                                                        placeholder="Date of birth and percentage"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="
                                        mt-8
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-5
                                        sm:p-6
                                    ">
                                        <h3 className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-2
                                            text-lg
                                            font-bold
                                            text-green-900
                                        ">
                                            <Users className="size-5 text-green-600" />
                                            Referee
                                        </h3>

                                        <FieldGroup className="
                                            grid
                                            gap-6
                                            md:grid-cols-2
                                        ">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="referee_name"
                                                label="Name"
                                                placeholder="Enter referee name"
                                            />

                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="referee_occupation"
                                                label="Occupation"
                                                placeholder="Enter referee occupation"
                                            />

                                            <div className="md:col-span-2">
                                                <TextareaField
                                                    Controller={Controller}
                                                    form={form}
                                                    name="referee_address"
                                                    label="Address"
                                                    placeholder="Enter referee address"
                                                />
                                            </div>

                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="referee_phone_number"
                                                label="Phone Number"
                                                type="tel"
                                                placeholder="Enter referee phone number"
                                            />
                                        </FieldGroup>
                                    </div>
                                </CardContent>
                            </Card>
                        )}


                        {/*
                            STEP 5 — DECLARATION & OFFICIAL USE
                        */}

                        {currentStep === 5 && (
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
                                        title="Declaration"
                                        description="
                                            Confirm the declaration, provide
                                            your signature and application date.
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
                                            bg-green-50/50
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
                                                    bg-green-800
                                                    text-white
                                                    shadow-sm
                                                ">
                                                    <BadgeCheck className="size-5" />
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
                                                I declare that the above
                                                information is accurate and
                                                true to the best of my
                                                knowledge. I understand that
                                                I may be prosecuted by
                                                Finance Cooperative Limited
                                                for wilfully supplying
                                                inaccurate information.
                                            </p>
                                        </div>

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="declaration_accepted"
                                            label="I confirm that the information provided above is accurate and true."
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
                                        bg-green-800
                                        px-7
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-green-900/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:bg-green-900
                                        hover:shadow-xl
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
                                        bg-green-800
                                        px-7
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-green-900/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:bg-green-900
                                        hover:shadow-xl
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {inertiaForm.processing
                                        ? "Submitting..."
                                        : "Join FINCOOP"
                                    }
                                    {!inertiaForm.processing && (
                                        <Handshake className="ml-2 size-5" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>

                    {/*
                        TRUST MESSAGE
                    */}

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
                        <ShieldCheck className="size-4 text-green-500" />
                        <p className="text-xs leading-6 text-gray-400">
                            Your information is submitted securely and will be used for membership verification purposes.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}