import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import UseMobileBankingReactHookForm from "./Components/MobileBankingReactHookForm";
import UseMobileBankingInertiaForm from './Components/MobileBankingInertiaForm';
import {stepFields} from './Components/MobileBankingStepFields';
import {steps} from './Components/MobileBankingSteps';
import TextField from '@/Components/TextField';
import TextareaField from "@/Components/TextareaField";
import SelectField from "@/Components/SelectField";
import CheckboxField from "@/Components/CheckboxField";
import SectionHeader from "@/Components/SectionHeader";

import { useState } from "react";

import {
    Controller
} from "react-hook-form";

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
    Smartphone,
    Users,
    Landmark,
    ClipboardCheck,
    AlertCircle,
    ShieldCheck,
    Sparkles,
    CircleCheck,
    Wallet,
    Clock,
    BadgeCheck,
    Fingerprint,
    Calendar,
    Phone,
    Mail,
    MapPin,
    User,
    Building2,
    CreditCard,
    UserPlus,
    Handshake,
} from "lucide-react";

export default function Create() {
    const form = UseMobileBankingReactHookForm();
    const inertiaForm = UseMobileBankingInertiaForm();
    const [currentStep, setCurrentStep] = useState(1);

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
    Go To Previous Completed Step
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
            route("mobile-banking-applications.store"),
            {
                preserveScroll: true,

                onSuccess: () => {
                    form.reset();
                    inertiaForm.reset();
                    setCurrentStep(1);
                },
                onError: (errors) => {
                    alert("Error:", errors);
                },
            }
        );

    };

    /*
    Current Step
    */

    const currentStepData = steps.find(
        (step) => step.number === currentStep
    );

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
                    bg-blue-200/20
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
                            MOBILE BANKING
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
                                Mobile Banking Application
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
                            Complete the FinMobile Banking Application / Amendment
                            Form to access your FINCOOP mobile banking services.
                        </p>

                        {/* Trust indicators */}

                        <div className="
                            mt-4
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-3
                        ">
                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white
                                px-4
                                py-1.5
                                text-xs
                                font-semibold
                                text-green-700
                                shadow-sm
                                border
                                border-green-100
                            ">
                                <ShieldCheck className="size-4 text-green-600" />
                                Secure Registration
                            </div>

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white
                                px-4
                                py-1.5
                                text-xs
                                font-semibold
                                text-green-700
                                shadow-sm
                                border
                                border-green-100
                            ">
                                <Smartphone className="size-4 text-green-600" />
                                24/7 Access
                            </div>

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white
                                px-4
                                py-1.5
                                text-xs
                                font-semibold
                                text-green-700
                                shadow-sm
                                border
                                border-green-100
                            ">
                                <BadgeCheck className="size-4 text-green-600" />
                                FinMobile Services
                            </div>
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
                                                        bg-blue-500
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
                                                        ${currentStep > step.number
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
                        CURRENT STAGE
                    */}

                    <div className="
                        mb-6
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-blue-100
                        bg-blue-50
                        px-4
                        py-3
                        text-blue-900
                        shadow-sm
                    ">
                        <div className="flex items-center gap-3">
                            <div className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-green-800
                                text-sm
                                font-bold
                                text-white
                            ">
                                {currentStepData?.number}
                            </div>

                            <div>
                                <p className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-blue-700
                                ">
                                    Current Stage
                                </p>
                                <p className="font-bold">
                                    {currentStepData?.title}
                                </p>
                            </div>
                        </div>

                        <div className="
                            hidden
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-blue-600
                            sm:flex
                        ">
                            <span>
                                Complete all applicable fields
                            </span>
                            <CircleCheck className="size-4 text-green-500" />
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
                            STEP 1 - Customer Details
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
                                        title="Section A: Customer Details"
                                        description="Complete the customer details required for the FinMobile Banking application or amendment."
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
                                            <ClipboardCheck className="size-5 text-blue-600 shrink-0 mt-0.5" />
                                            <p><strong>Request type:</strong> select the appropriate request.</p>
                                        </div>
                                    </div>

                                    <FieldGroup className="
                                        grid
                                        gap-6
                                        md:grid-cols-2
                                    ">
                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="request_type"
                                            label="Request Type"
                                            placeholder="Select request type"
                                            required={true}
                                            options={[
                                                { value: "new", label: "New" },
                                                { value: "amend", label: "Amend" },
                                                { value: "close", label: "Close" },
                                                { value: "pin_reset", label: "PIN Reset" },
                                            ]}
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="title"
                                            label="Title"
                                            placeholder="Select title"
                                            required={true}
                                            options={[
                                                { value: "mr", label: "Mr" },
                                                { value: "mrs", label: "Mrs" },
                                                { value: "miss", label: "Miss" },
                                                { value: "ms", label: "Ms" },
                                            ]}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="first_name"
                                            label="First Name"
                                            placeholder="Enter first name"
                                            required={true}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="surname"
                                            label="Surname"
                                            placeholder="Enter surname"
                                            required={true}
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="id_type"
                                            label="ID Type"
                                            placeholder="Select ID type"
                                            required={true}
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
                                            required={true}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="cell_phone"
                                            label="Cell"
                                            type="tel"
                                            placeholder="+265"
                                            required={true}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="sacc_number_employment"
                                            label="SACCO Number / Employment"
                                            placeholder="Enter SACCO number or employment"
                                            required={true}
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="email"
                                            label="Email"
                                            type="email"
                                            placeholder="Enter email address"
                                        />

                                        <div className="md:col-span-2">
                                            <TextareaField
                                                Controller={Controller}
                                                form={form}
                                                name="postal_address"
                                                label="Postal Address"
                                                placeholder="Enter postal address"
                                            />
                                        </div>
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                        )}

                       

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
                                    from-blue-50
                                    to-white
                                    px-6
                                    py-6
                                    sm:px-8
                                ">
                                    <SectionHeader
                                        icon={Smartphone}
                                        title="Section B: Linked Mobile Phone"
                                        description="Add or remove the mobile phone numbers linked to the member's FinMobile Banking service."
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
                                            <Smartphone className="size-5 text-blue-600 shrink-0 mt-0.5" />
                                            <p>Please add/remove the following mobile phone numbers accordingly.</p>
                                        </div>
                                    </div>

                                    <div className="
                                        mb-6
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
                                            <div className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-green-100
                                                text-green-600
                                            ">
                                                <Phone className="size-4" />
                                            </div>
                                            Linked Mobile Numbers
                                        </h3>

                                        <FieldGroup className="
                                            grid
                                            gap-6
                                            md:grid-cols-2
                                        ">
                                            <CheckboxField
                                                Controller={Controller}
                                                form={form}
                                                name="add_mobile_number"
                                                label="Add"
                                            />

                                            <CheckboxField
                                                Controller={Controller}
                                                form={form}
                                                name="remove_mobile_number"
                                                label="Remove"
                                            />

                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="mobile_1_number"
                                                label="Cell"
                                                type="tel"
                                                placeholder="Enter mobile number"
                                                required={true}
                                            />

                                            <SelectField
                                                Controller={Controller}
                                                form={form}
                                                name="mobile_1_sms_notification"
                                                label="SMS Notification"
                                                placeholder="Yes / No"
                                                options={[
                                                    { value: "yes", label: "Yes" },
                                                    { value: "no", label: "No" },
                                                ]}
                                            />
                                        </FieldGroup>
                                    </div>

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
                                            <div className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-green-100
                                                text-green-600
                                            ">
                                                <Phone className="size-4" />
                                            </div>
                                            Second Mobile Number
                                        </h3>

                                        <FieldGroup className="
                                            grid
                                            gap-6
                                            md:grid-cols-2
                                        ">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="mobile_2_number"
                                                label="Cell"
                                                type="tel"
                                                placeholder="Enter mobile number"
                                            />

                                            <SelectField
                                                Controller={Controller}
                                                form={form}
                                                name="mobile_2_sms_notification"
                                                label="SMS Notification"
                                                placeholder="Yes / No"
                                                options={[
                                                    { value: "yes", label: "Yes" },
                                                    { value: "no", label: "No" },
                                                ]}
                                            />
                                        </FieldGroup>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        

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
                                        icon={Wallet}
                                        title="Section C: Services Applied Accounts"
                                        description="Tick the preferred FinMobile Banking features and services."
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
                                            <BadgeCheck className="size-5 text-green-600 shrink-0 mt-0.5" />
                                            <p>I would like to access the following features / services <em>(please tick preferred service below)</em>.</p>
                                        </div>
                                    </div>

                                    <FieldGroup className="
                                        grid
                                        gap-4
                                        md:grid-cols-2
                                    ">
                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="balance_savings"
                                            label="Balance enquiry all savings products"
                                        />

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="balance_loans"
                                            label="Balance enquiry all loan products"
                                        />

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="balance_other"
                                            label="Balance enquiry other products (specify)"
                                        />

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="funds_transfer"
                                            label="Funds transfer"
                                        />

                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="balance_other_specify"
                                                label="Other Product (Specify)"
                                                placeholder="Specify other product"
                                            />
                                        </div>
                                    </FieldGroup>

                                    <div className="mt-8 border-t border-gray-100 pt-8">
                                        <h3 className="
                                            mb-5
                                            flex
                                            items-center
                                            gap-2
                                            text-lg
                                            font-bold
                                            text-green-900
                                        ">
                                            <div className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-green-100
                                                text-green-600
                                            ">
                                                <ShieldCheck className="size-4" />
                                            </div>
                                            Summary of Terms of Use for Service
                                        </h3>

                                        <div className="
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            p-5
                                            text-sm
                                            leading-6
                                            text-gray-600
                                            sm:p-6
                                        ">
                                            <ol className="list-decimal space-y-2 pl-5">
                                                <li>Funds can be transferred from demand deposits only.</li>
                                                <li>Use of the service has the following charges: Balance enquiry: MWK 0.00 per session; Mini Statement: MWK 150.00 per session; Funds Transfer: MWK 200.00 per transaction.</li>
                                                <li>The institution will not be held liable for transfer to wrong accounts.</li>
                                                <li>The institution will not be held liable for unauthorised access to your account out of your negligence.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}


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
                                        title="Section E: Declaration"
                                        description="Confirm the terms of use and complete the application."
                                    />
                                </CardHeader>

                                <CardContent className="
                                    space-y-6
                                    px-6
                                    py-8
                                    sm:px-8
                                    lg:px-10
                                ">
                                    <div className="
                                        rounded-xl
                                        border
                                        border-orange-200
                                        bg-orange-50/50
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
                                                rounded-full
                                                bg-orange-500
                                                text-white
                                                shadow-md
                                            ">
                                                <FileCheck2 className="size-5" />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-green-900">
                                                    Declaration
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    Final confirmation
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mb-5 text-sm leading-6 text-gray-600">
                                            I acknowledge that I have read and understood the above terms of use for the product and by executing this document; I express my consent and willingness to abide by those conditions.
                                        </p>

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="declaration_accepted"
                                            label="I acknowledge and agree to the above terms and conditions."
                                        />

                                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="signature"
                                                label="Signature"
                                                placeholder="Enter signature / full name"
                                                required={true}
                                            />

                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="declaration_date"
                                                label="Date"
                                                type="date"
                                                placeholder="Select date"
                                                required={true}
                                            />
                                        </div>
                                    </div>
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

                            {/* Counter */}

                            <div className="order-first text-center sm:order-none">
                                <span className="text-sm font-semibold text-gray-400">
                                    Step{" "}
                                    <span className="font-bold text-green-800">
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
                                        : "Submit Application"
                                    }
                                    {!inertiaForm.processing && (
                                        <Smartphone className="ml-2 size-5" />
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
                            Your information is submitted securely and will be used for FinMobile Banking application processing.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

