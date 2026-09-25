import { z } from "zod";
const optionalNumber = z.preprocess(
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
);

export const loanSchema = z.object({
    account_number: z
        .string()
        .optional(),

    employment_number: z
        .string()
        .optional(),

    id_type: z
        .string()
        .min(
            1,
            "Please select an ID type"
        ),

    id_number: z
        .string()
        .min(
            1,
            "ID number is required"
        ),

    surname: z
        .string()
        .min(
            2,
            "Surname must contain at least 2 characters"
        ),

    first_names: z
        .string()
        .min(
            2,
            "First names are required"
        ),

    title: z
        .string()
        .optional(),

    age: optionalNumber,

    gender: z
        .string()
        .min(
            1,
            "Please select gender"
        ),

    physical_address: z
        .string()
        .optional(),

    mailing_address: z
        .string()
        .optional(),

    home_address: z
        .string()
        .optional(),

    village: z
        .string()
        .optional(),

    traditional_authority: z
        .string()
        .optional(),

    district: z
        .string()
        .optional(),

    email: z
        .string()
        .email(
            "Please enter a valid email address"
        )
        .or(
            z.literal("")
        ),

    phone_number: z
        .string()
        .min(
            8,
            "Please enter a valid phone number"
        ),


    /*
    Loan Information
    */

    loanapplication_type: z
        .string()
        .min(
            1,
            "Please select a loan type"
        ),

    loanapplication_amount: z
        .preprocess(
            (value) => Number(value),

            z
                .number()
                .min(
                    1,
                    "Loan amount must be greater than zero"
                )
        ),

    loanapplication_amount_in_words: z
        .string()
        .optional(),

    loanapplication_purpose: z
        .string()
        .min(
            10,
            "Please provide more details about the loan purpose"
        ),

    repayment_period: z
        .preprocess(
            (value) => Number(value),

            z
                .number()
                .min(
                    1,
                    "Repayment period is required"
                )
        ),

    employer_name: z
        .string()
        .optional(),

    job_title: z
        .string()
        .optional(),

    employment_verified: z
        .boolean(),

    employment_period: z
        .string()
        .optional(),

    employer_address: z
        .string()
        .optional(),

    employer_phone: z
        .string()
        .optional(),

    gross_income: optionalNumber,

    gross_income_verified: z
        .boolean(),

    net_income: optionalNumber,

    net_income_verified: z
        .boolean(),


    /*
    Business
    */

    years_in_business: optionalNumber,

    business_type: z
        .string()
        .optional(),

    trading_area: z
        .string()
        .optional(),

    business_name: z
        .string()
        .optional(),


    /*
    Financial Information
    */

    shares_balance: optionalNumber,

    savings_balance: optionalNumber,

    fixed_deposit_balance: optionalNumber,

    existing_loanapplications_balance: optionalNumber,


    /*
    Declaration
    */

    declaration_accepted: z
        .boolean()
        .refine(
            (value) => value === true,
            {
                message:
                    "You must accept the declaration",
            }
        ),

});
