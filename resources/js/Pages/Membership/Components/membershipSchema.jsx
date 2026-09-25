import {z} from "zod";
export const membershipSchema = z.object({

    /*
    Personal Details
    */

    title: z.string().min(
        1,
        "Please select a title"
    ),

    surname: z.string().min(
        2,
        "Surname is required"
    ),

    first_name: z.string().min(
        2,
        "First name is required"
    ),

    additional_name: z.string().optional(),

    date_of_birth: z.string().min(
        1,
        "Date of birth is required"
    ),

    gender: z.string().min(
        1,
        "Please select gender"
    ),

    nationality: z.string().min(
        1,
        "Nationality is required"
    ),

    marital_status: z.string().min(
        1,
        "Please select marital status"
    ),

    id_type: z.string().min(
        1,
        "Please select an ID type"
    ),

    id_number: z.string().min(
        1,
        "ID number is required"
    ),

    income_source: z.string().optional(),

    occupation: z.string().optional(),

    qualification: z.string().optional(),

    number_of_dependants: z.preprocess(
        (value) => {
            if (
                value === "" ||
                value === null ||
                value === undefined
            ) {
                return undefined;
            }

            return Number(value);
        },
        z.number().int().min(0).optional()
    ),

    /*
    Address / Contact
    */

    village: z.string().optional(),

    traditional_authority: z.string().optional(),

    district: z.string().optional(),

    physical_address: z.string().optional(),

    mailing_address: z.string().optional(),

    telephone: z.string().optional(),

    cell_phone: z.string().min(
        8,
        "Please enter a valid cell phone number"
    ),

    email: z
        .string()
        .email("Please enter a valid email address")
        .or(z.literal("")),

    /*
    Employment
    */

    employer_name: z.string().optional(),

    employer_address: z.string().optional(),

    employer_telephone: z.string().optional(),

    employer_fax_number: z.string().optional(),

    /*
    Monthly Deduction
    */

    employment_number: z.string().optional(),

    monthly_shares: z.preprocess(
        (value) => {
            if (
                value === "" ||
                value === null ||
                value === undefined
            ) {
                return undefined;
            }

            return Number(value);
        },
        z.number().min(0).optional()
    ),

    monthly_savings_ps: z.preprocess(
        (value) => {
            if (
                value === "" ||
                value === null ||
                value === undefined
            ) {
                return undefined;
            }

            return Number(value);
        },
        z.number().min(0).optional()
    ),

    /*
    Beneficiaries / Nominees
    */

    beneficiary_1_name: z.string().optional(),
    beneficiary_1_relationship: z.string().optional(),
    beneficiary_1_birth_date_percentage: z.string().optional(),

    beneficiary_2_name: z.string().optional(),
    beneficiary_2_relationship: z.string().optional(),
    beneficiary_2_birth_date_percentage: z.string().optional(),

    beneficiary_3_name: z.string().optional(),
    beneficiary_3_relationship: z.string().optional(),
    beneficiary_3_birth_date_percentage: z.string().optional(),

    /*
    Referees
    */

    referee_name: z.string().optional(),

    referee_occupation: z.string().optional(),

    referee_address: z.string().optional(),

    referee_phone_number: z.string().optional(),

    /*
    Declaration
    */

    declaration_accepted: z.boolean().refine(
        (value) => value === true,
        {
            message:
                "You must accept the declaration.",
        }
    ),

    applicant_signature: z.string().min(
        2,
        "Applicant signature is required"
    ),

    thumb_print: z.string().optional(),

    application_date: z.string().min(
        1,
        "Application date is required"
    ),

    /*
    Official Use Only
    */

    entrance_fee_paid_on: z.string().optional(),

    entrance_fee_amount: z.preprocess(
        (value) => {
            if (
                value === "" ||
                value === null ||
                value === undefined
            ) {
                return undefined;
            }

            return Number(value);
        },
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