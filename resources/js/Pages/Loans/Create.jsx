import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import { Controller } from "react-hook-form";
import useLoanInertiaForm from './Components/inertiaForm';
import useLoanReactHookForm from './Components/reactHookForm';
import { steps } from './Components/loanSteps';
import { stepFields } from './Components/stepFields';
import TextField from '@/Components/TextField';
import TextareaField from "@/Components/TextareaField";
import SelectField from "@/Components/SelectField";
import CheckboxField from "@/Components/CheckboxField";
import SectionHeader from "@/Components/SectionHeader";

import {
    FieldGroup,
} from "@/Components/ui/field";
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
    WalletCards,
    BriefcaseBusiness,
    Landmark,
    ClipboardCheck,
    AlertCircle,
    Users,
    Building2,
} from "lucide-react";

export default function Create() {
    const inertiaForm = useLoanInertiaForm();
    const form = useLoanReactHookForm();
    const [currentStep, setCurrentStep] = useState(1);

    /*
    Next Step
    */

    const nextStep = async () => {

        const fields =
            stepFields[
                currentStep
            ];


        const isValid =
            await form.trigger(
                fields
            );


        if (isValid) {

            setCurrentStep(
                (current) =>
                    Math.min(
                        current + 1,
                        5
                    )
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        } else {

            /*
            Scroll to the first invalid field
            */

            setTimeout(() => {

                const firstError =
                    document.querySelector(
                        '[aria-invalid="true"]'
                    );

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
    Go directly to completed step
    */

    const goToStep = (stepNumber) => {

        if (
            stepNumber < currentStep
        ) {

            setCurrentStep(
                stepNumber
            );

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
            route("loanapplications.store"),
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

    const currentStepData =
        steps.find(
            (step) =>
                step.number === currentStep
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
                    PAGE HEADER
                    */}

                    <div className="
                        mb-8
                        text-center
                    ">
                        <h1 className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-green-900
                            sm:text-4xl
                            lg:text-5xl
                        ">
                            Individual Loan Application
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

                            Complete the application below to
                            apply for an individual loan with FINCOOP.

                        </p>

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

                        <div className="
                        flex
                        items-start
                        justify-between
                    ">

                            {steps.map(
                                (step, index) => {

                                    const isActive =
                                        currentStep ===
                                        step.number;

                                    const isCompleted =
                                        currentStep >
                                        step.number;

                                    const Icon =
                                        step.icon;

                                    return (

                                        <div
                                            key={
                                                step.number
                                            }

                                            className="
                                            flex
                                            flex-1
                                            items-start
                                        "
                                        >

                                            <div className="
                                            flex
                                            w-full
                                            flex-col
                                            items-center
                                        ">

                                                {/* Circle */}

                                                <button
                                                    type="button"

                                                    disabled={
                                                        step.number >=
                                                        currentStep
                                                    }

                                                    onClick={() =>
                                                        goToStep(
                                                            step.number
                                                        )
                                                    }

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

                                                    ${
                                                        isActive
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

                                                    ${
                                                        isCompleted
                                                            ? `
                                                                border-green-700
                                                                bg-green-100
                                                                text-green-800
                                                                hover:bg-green-200
                                                                cursor-pointer
                                                            `
                                                            : ""
                                                    }

                                                    ${
                                                        !isActive &&
                                                        !isCompleted
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

                                                        <Check
                                                            className="
                                                            size-5
                                                            sm:size-6
                                                        "
                                                        />

                                                    ) : (

                                                        <Icon
                                                            className="
                                                            size-5
                                                            sm:size-6
                                                        "
                                                        />

                                                    )}


                                                    {/* Active orange indicator */}

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


                                                {/* Text */}

                                                <div className="
                                                mt-4
                                                text-center
                                            ">

                                                    <p className={`
                                                    text-xs
                                                    font-bold
                                                    sm:text-sm

                                                    ${
                                                        isActive
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

                                                    {
                                                        step.description
                                                    }

                                                </p>

                                                </div>

                                            </div>


                                            {/* Connector */}

                                            {index <
                                                steps.length - 1 && (

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

                                                        ${
                                                            currentStep >
                                                            step.number
                                                                ? `
                                                                    w-full
                                                                    bg-green-700
                                                                `
                                                                : "w-0"
                                                        }
                                                    `}
                                                    />

                                                </div>

                                            )}

                                        </div>

                                    );

                                }
                            )}

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

                            {
                                currentStepData?.number
                            }

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

                            <p className="
                            font-bold
                        ">

                                {
                                    currentStepData?.title
                                }

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
                        STEP 1 - Personal Information
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
                                        title="A. Personal Information"
                                        description="
                                        Provide your personal details and identification information.
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
                                            name="account_number"
                                            label="Account No."
                                            placeholder="Enter account number"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employment_number"
                                            label="Employment Number"
                                            placeholder="Enter employment number"
                                        />

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="id_type"
                                            label="ID Type"
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
                                            label="ID No."
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
                                            name="title"
                                            label="Title"
                                            placeholder="Mr, Mrs, Ms, Dr"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="age"
                                            label="Age"
                                            type="number"
                                            placeholder="Enter age"
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
                                            label="T/A"
                                            placeholder="Enter Traditional Authority"
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

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="phone_number"
                                            label="Phone No."
                                            type="tel"
                                            placeholder="Enter phone number"
                                        />

                                    </FieldGroup>

                                </CardContent>

                            </Card>

                        )}


                        {/*
                        STEP 2 - Loan Information
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
                                        icon={WalletCards}
                                        title="B. Type of Loan & C. Loan Information"
                                        description="
                                        Tell us about the type of loan you need and the loan details.
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

                                        {/* B. Type of Loan */}

                                        <SelectField
                                            Controller={Controller}
                                            form={form}
                                            name="loanapplication_type"
                                            label="Type of Loan"
                                            placeholder="Select loan type"
                                            options={[
                                                {
                                                    value: "personal",
                                                    label: "Personal",
                                                },
                                                {
                                                    value: "business",
                                                    label: "Business",
                                                },
                                                {
                                                    value: "agricultural",
                                                    label: "Agricultural",
                                                },
                                                {
                                                    value: "emergency",
                                                    label: "Emergency",
                                                },
                                            ]}
                                        />

                                        {/* C. Loan Information */}

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="loanapplication_amount"
                                            label="Loan Amount (K)"
                                            type="number"
                                            placeholder="Enter loan amount"
                                        />

                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="loanapplication_amount_in_words"
                                                label="Loan Amount in Words"
                                                placeholder="Write amount in words"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <TextareaField
                                                Controller={Controller}
                                                form={form}
                                                name="loanapplication_purpose"
                                                label="Purpose of Loan (Give full details)"
                                                placeholder="Explain what the loan will be used for"
                                            />
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="repayment_period"
                                            label="Repayment Period (Months)"
                                            type="number"
                                            placeholder="Enter number of months"
                                        />

                                    </FieldGroup>

                                </CardContent>

                            </Card>

                        )}


                        {/*
                        STEP 3 - Employment & Business
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
                                        icon={BriefcaseBusiness}
                                        title="D. Employment & E. Business Information"
                                        description="
                                        Provide your employment, occupation, and business details.
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

                                        {/* D. Employment Information */}

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
                                            name="job_title"
                                            label="Professional (Job Title)"
                                            placeholder="Enter job title"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employment_period"
                                            label="Period of Employment / Business"
                                            placeholder="Example: 5 years"
                                        />

                                        <div className="md:col-span-2">
                                            <TextField
                                                Controller={Controller}
                                                form={form}
                                                name="employer_address"
                                                label="Employer's Address"
                                                placeholder="Enter employer address"
                                            />
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="employer_phone"
                                            label="Employer Phone No."
                                            placeholder="Enter employer phone"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="gross_income"
                                            label="Gross Salary/Income"
                                            type="number"
                                            placeholder="Enter gross income"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="net_income"
                                            label="Net Income"
                                            type="number"
                                            placeholder="Enter net income"
                                        />

                                        <div className="md:col-span-2 mt-2 border-t border-gray-100 pt-6">

                                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-900">
                                                <span className="h-2 w-2 rounded-full bg-orange-500" />
                                                Verification
                                            </h3>

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

                                        {/* E. Business Information */}

                                        <div className="md:col-span-2 mt-4 border-t border-gray-100 pt-6">
                                            <h3 className="mb-1 text-xl font-bold text-green-900">
                                                E. Business Information
                                            </h3>
                                            <p className="mb-5 text-sm text-gray-500">
                                                If applicable, provide details about your business activities.
                                            </p>
                                        </div>

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="years_in_business"
                                            label="No. of years in business"
                                            type="number"
                                            placeholder="Enter number of years"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="business_type"
                                            label="Type / Nature of Business"
                                            placeholder="Enter business type"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="trading_area"
                                            label="Trading Area"
                                            placeholder="Enter trading area"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="business_name"
                                            label="Name of Business"
                                            placeholder="Enter business name"
                                        />

                                    </FieldGroup>

                                </CardContent>

                            </Card>

                        )}


                        {/*
                        STEP 4 - Financial Information
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
                                        icon={Landmark}
                                        title="F. Financial Information"
                                        description="
                                        Provide your current FINCOOP balances.
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
                                ">

                                        <p className="text-sm leading-6 text-green-800">
                                            <strong>Financial information:</strong> Please provide accurate balances.
                                            These details will be used during the loan assessment process.
                                        </p>

                                    </div>

                                    <FieldGroup className="
                                    grid
                                    gap-6
                                    md:grid-cols-2
                                ">

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="shares_balance"
                                            label="Shares Balance (K)"
                                            type="number"
                                            placeholder="Enter shares balance"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="savings_balance"
                                            label="Savings Balance (K)"
                                            type="number"
                                            placeholder="Enter savings balance"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="fixed_deposit_balance"
                                            label="Fixed Deposit Balance (K)"
                                            type="number"
                                            placeholder="Enter fixed deposit balance"
                                        />

                                        <TextField
                                            Controller={Controller}
                                            form={form}
                                            name="existing_loanapplications_balance"
                                            label="Existing Loans Balance (K)"
                                            type="number"
                                            placeholder="Enter existing loans balance"
                                        />

                                    </FieldGroup>

                                </CardContent>

                            </Card>

                        )}


                        {/*
                        STEP 5 - Review & Declaration
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
                                        title="Review & Declaration"
                                        description="
                                        Review your application and sign the declaration.
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

                                            <UserRound
                                                className="
                                                size-5
                                                text-green-700
                                            "
                                            />

                                            Applicant

                                        </h3>


                                        <div className="
                                        grid
                                        gap-4
                                        md:grid-cols-2
                                        ">

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

                                                    {
                                                        form.watch(
                                                            "first_names"
                                                        )
                                                    }{" "}

                                                    {
                                                        form.watch(
                                                            "surname"
                                                        )
                                                    }

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

                                                    {
                                                        form.watch(
                                                            "phone_number"
                                                        )
                                                    }

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

                                                    {
                                                        form.watch(
                                                            "id_number"
                                                        )
                                                    }

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

                                                    Loan Amount

                                                </p>

                                                <p className="
                                                mt-1
                                                font-semibold
                                                text-gray-800
                                                ">

                                                    K {
                                                        form.watch(
                                                            "loanapplication_amount"
                                                        )
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Declaration */}

                                    <div className="
                                    rounded-xl
                                    border
                                    border-orange-200
                                    bg-orange-50/50
                                    p-5
                                    sm:p-6
                                    ">

                                        <div className="
                                        mb-4
                                        flex
                                        items-center
                                        gap-3
                                        ">

                                            <div className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-orange-500
                                            text-white
                                            ">

                                                <FileCheck2
                                                    className="size-5"
                                                />

                                            </div>


                                            <div>

                                                <h3 className="
                                                font-bold
                                                text-green-900
                                                ">

                                                    Declaration

                                                </h3>

                                                <p className="
                                                text-xs
                                                text-gray-500
                                                ">

                                                    Final confirmation

                                                </p>

                                            </div>

                                        </div>

                                        <p className="mb-4 text-sm text-gray-600">
                                            I hereby declare that the information I have given above is accurate
                                            and true to the best of my knowledge. I further declare that I have
                                            read the contents of this form and that I will abide to the terms
                                            and conditions of the Loan hereby granted to me.
                                        </p>

                                        <CheckboxField
                                            Controller={Controller}
                                            form={form}
                                            name="declaration_accepted"
                                            label="
                                            I declare that the information provided in this loan application
                                            is true and correct.
                                            "
                                            />

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

                                onClick={
                                    previousStep
                                }

                                disabled={
                                    currentStep === 1
                                }

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

                                <ChevronLeft
                                    className="
                                    mr-2
                                    size-5
                                "
                                />

                                Previous

                            </Button>


                            {/* Step counter */}

                            <div className="
                            order-first
                            text-center
                            sm:order-none
                        ">

                                <span className="
                                text-sm
                                font-semibold
                                text-gray-400
                            ">

                                    Step{" "}

                                    <span className="
                                    text-green-800
                                ">

                                        {currentStep}

                                    </span>

                                    {" "}of{" "}

                                    5

                                </span>

                            </div>


                            {/* Next / Submit */}

                            {currentStep < 5 ? (

                                <Button
                                    type="button"

                                    onClick={
                                        nextStep
                                    }

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

                                    <ChevronRight
                                        className="
                                        ml-2
                                        size-5
                                    "
                                    />

                                </Button>

                            ) : (

                                <Button
                                    type="submit"

                                    disabled={
                                        inertiaForm.processing
                                    }

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

                                        <Check
                                            className="
                                            ml-2
                                            size-5
                                        "
                                        />

                                    )}

                                </Button>

                            )}

                        </div>

                    </form>


                    {/*
                    FOOTER TRUST MESSAGE
                    */}

                    <div className="
                    mt-8
                    text-center
                ">

                        <p className="
                        text-xs
                        leading-6
                        text-gray-400
                    ">

                            Your information is submitted securely
                            and will be used for loan assessment purposes.

                        </p>

                    </div>

                </div>

            </div>
            <Footer />
        </>
    );

}