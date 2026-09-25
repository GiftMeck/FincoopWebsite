import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import UsekycReactHookForm from "./Components/kycReactHookForm";
import UseKYCInertiaForm from "./Components/kycInertiaForm";
import { stepFields } from "./Components/kycStepFields";
import { steps } from "./Components/kycSteps";
import TextField from '@/Components/TextField';
import TextareaField from "@/Components/TextareaField";
import SelectField from "@/Components/SelectField";
import CheckboxField from "@/Components/CheckboxField";
import SectionHeader from "@/Components/SectionHeader";
import {
    Controller
} from "react-hook-form";


import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/Components/ui/field";

import {
    Input,
} from "@/Components/ui/input";

import {
    Textarea,
} from "@/Components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

import {
    Checkbox,
} from "@/Components/ui/checkbox";

import {
    Button,
} from "@/Components/ui/button";

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
} from "lucide-react";

export default function Create() {
    const [currentStep, setCurrentStep] = useState(1);

    const inertiaForm = UseKYCInertiaForm();
    const form = UsekycReactHookForm();

    const nextStep = async () => {
        const fields = stepFields[currentStep];
        const isValid = await form.trigger(fields);

        if (isValid) {
            setCurrentStep((current) => Math.min(current + 1, 4));
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
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
        }
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
    Go directly to completed step
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
            route("kyc.store"),
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

    /*
    Current Step Information
    */

    const currentStepData = steps.find(
        (step) => step.number === currentStep
    );

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
                <div className="
                    mx-auto
                    w-full
                    max-w-6xl
                ">
                    {/*
                        PAGE HEADER - Membership
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
                               FINCOOP KYC
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

                        {/* Membership benefits banner*/}
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
                        PROGRESS STEPPER - Membership
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
                                const isActive = currentStep === step.number;
                                const isCompleted = currentStep > step.number;
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.number}
                                        className="flex flex-1 items-start"
                                    >
                                        <div className="flex w-full flex-col items-center">

                                            <button
                                                type="button"
                                                disabled={step.number >= currentStep}
                                                onClick={() => goToStep(step.number)}
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
                                                            border-green-300
                                                            bg-green-100
                                                            text-green-700
                                                            hover:bg-green-200
                                                            cursor-pointer
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
                                                        h-1.5
                                                        w-8
                                                        -translate-x-1/2
                                                        rounded-full
                                                        bg-green-600
                                                        sm:w-10
                                                        animate-pulse
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

                                                <p className="
                                                    mt-1
                                                    hidden
                                                    text-xs
                                                    text-gray-400
                                                    sm:block
                                                ">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Connector - dotted (different from loan page) */}

                                        {index < steps.length - 1 && (
                                            <div className="
                                                mt-6
                                                hidden
                                                h-[2px]
                                                flex-1
                                                bg-gray-200
                                                sm:block
                                                relative
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
                        CURRENT STEP INDICATOR - Membership 
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
                            rounded-lg
                            bg-gradient-to-br
                            from-green-700
                            to-green-900
                            text-white
                            font-bold
                        ">
                            {currentStepData?.number}
                        </div>

                        <div>
                            <p className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-green-700
                            ">
                                Step {currentStep}
                            </p>

                            <p className="font-bold">
                                {currentStepData?.title}
                            </p>
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
                            STEP 1 - Personal
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
                                        title="Personal Information"
                                        description="
                                            Tell us about yourself and provide
                                            your identification details.
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
                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="member_sacco_number"
                                            label="Member Sacco Number"
                                            placeholder="Enter Sacco number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="member_phone_number"
                                            label="Member Phone Number"
                                            type="tel"
                                            placeholder="Enter phone number"
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="id_type"
                                            label="Type of ID"
                                            placeholder="Select ID type"
                                            options={[
                                                {
                                                    value: "national_id",
                                                    label: "National ID",
                                                },
                                                {
                                                    value: "passport",
                                                    label: "Passport",
                                                },
                                                {
                                                    value: "drivers_license",
                                                    label: "Driver's License",
                                                },
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
                                            name="surname"
                                            label="Surname"
                                            placeholder="Enter surname"
                                        />
                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="first_names"
                                            label="First Names"
                                            placeholder="Enter first names"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="date_of_birth"
                                            label="Date of Birth"
                                            type="date"
                                            placeholder="Select date of birth"
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="gender"
                                            label="Gender"
                                            placeholder="Select gender"
                                            options={[
                                                {
                                                    value: "male",
                                                    label: "Male",
                                                },
                                                {
                                                    value: "female",
                                                    label: "Female",
                                                },
                                            ]}
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}

                        {/*
                            STEP 2 - Address
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
                                        title="Address Details"
                                        description="
                                            Provide your contact and physical
                                            address information.
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
                                                name="physical_address"
                                                label="Physical Address"
                                                placeholder="Enter physical address"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <TextField
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
                                            name="home_address"
                                            label="Home Address"
                                            placeholder="Enter home address"
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

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="email"
                                            label="Email"
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}

                        {/*
                            STEP 3 - Referees
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
                                        icon={Users}
                                        title="Referees"
                                        description="
                                            Provide details of your referees
                                            for your membership application.
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
                                            <Users className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <p>Please provide at least one referee who can vouch for your character and financial responsibility.</p>
                                        </div>
                                    </div>

                                    <FieldGroup className="
                                        grid
                                        gap-6
                                        md:grid-cols-2
                                    ">
                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="referee_name"
                                            label="Referee Name"
                                            placeholder="Enter referee name"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="referee_occupation"
                                            label="Occupation"
                                            placeholder="Enter referee occupation"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="referee_address"
                                            label="Address"
                                            placeholder="Enter referee address"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="referee_phone"
                                            label="Phone Number"
                                            type="tel"
                                            placeholder="Enter referee phone"
                                        />
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}

                        {/*
                            STEP 4 - Review
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
                                        icon={Shield}
                                        title="Review & Declaration"
                                        description="
                                            Carefully review your information
                                            before submitting your application.
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
                                    {/* Applicant Summary */}

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
                                            <UserRound className="size-5 text-green-700" />
                                            Applicant Details
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    Name
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("first_names")} {form.watch("surname")}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    ID Number
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("id_number")}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    Phone
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("member_phone_number")}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    District
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("district")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Referee Summary */}

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
                                            <Users className="size-5 text-green-700" />
                                            Referee Details
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    Name
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("referee_name") || "Not provided"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    Occupation
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("referee_occupation") || "Not provided"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                ">
                                                    Phone
                                                </p>
                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {form.watch("referee_phone") || "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Declaration */}

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
                                                    Final confirmation
                                                </p>
                                            </div>
                                        </div>

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="declaration_accepted"
                                            label="
                                                I declare that the above information is accurate
                                                and true to the best of my knowledge. I understand
                                                that I may be prosecuted by the Finance Cooperative
                                                Limited for willfully supplying inaccurate information.
                                            "
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/*
                            NAVIGATION - Membership
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
                            {/* Previous */}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={previousStep}
                                disabled={currentStep === 1}
                                className="
                                    h-12
                                    rounded-xl
                                    border-gray-300
                                    px-6
                                    font-semibold
                                    text-gray-600
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

                            {/* Step counter */}

                            <div className="order-first text-center sm:order-none">
                                <span className="text-sm font-semibold text-gray-400">
                                    Step{" "}
                                    <span className="text-green-800">
                                        {currentStep}
                                    </span>
                                    {" "}of{" "}
                                    4
                                </span>
                            </div>

                            {/* Next / Submit */}

                            {currentStep < 4 ? (
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
                        FOOTER TRUST MESSAGE
                    */}

                    <div className="mt-8 text-center">
                        <p className="text-xs leading-6 text-gray-400">
                            <span className="inline-flex items-center gap-1.5">
                                <Shield className="size-3 text-green-500" />
                                Your information is submitted securely and will be used for membership verification purposes.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}