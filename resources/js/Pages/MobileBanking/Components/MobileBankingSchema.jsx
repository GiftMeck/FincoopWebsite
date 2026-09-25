import {z} from "zod";
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

const optionalString = z.preprocess(
    (value) => {
        if (
            value === "" ||
            value === null ||
            value === undefined
        ) {
            return undefined;
        }
        return String(value);
    },
    z.string().optional()
);


export const mobileBankingSchema = z.object({

    /*
    Request & Customer Details
    */

    request_type: z
        .string()
        .min(1, "Please select a request type"),

    title: z
        .string()
        .min(1, "Please select a title"),

    first_name: z
        .string()
        .min(2, "First name is required"),

    surname: z
        .string()
        .min(2, "Surname is required"),

    id_type: z
        .string()
        .min(1, "Please select an ID type"),

    id_number: z
        .string()
        .min(1, "ID number is required"),

    cell_phone: z
        .string()
        .min(8, "Please enter a valid cell number"),

    sacc_number_employment: z
        .string()
        .min(1, "SACCO number / Employment is required"),

    email: z
        .string()
        .email("Please enter a valid email address")
        .or(z.literal("")),

    postal_address: z
        .string()
        .optional(),

    /*
    Linked Mobile Phone
    */

    add_mobile_number: z.boolean(),
    remove_mobile_number: z.boolean(),

    mobile_1_number: z
        .string()
        .min(8, "Please enter a valid mobile number"),

    mobile_1_sms_notification: z
        .string()
        .optional(),

    mobile_2_number: z
        .string()
        .optional(),

    mobile_2_sms_notification: z
        .string()
        .optional(),

    /*
    Services
    */

    balance_savings: z.boolean(),
    balance_loans: z.boolean(),
    balance_other: z.boolean(),
    balance_other_specify: z.string().optional(),
    funds_transfer: z.boolean(),

    /*
    Declaration
    */

    declaration_accepted: z
        .boolean()
        .refine(
            (value) => value === true,
            {
                message: "You must accept the declaration",
            }
        ),

    signature: z
        .string()
        .min(1, "Signature is required"),

    declaration_date: z
        .string()
        .min(1, "Date is required"),

    /*
    Office Use Only
    */

    member_customer_number: z.string().optional(),
    received_by: z.string().optional(),
    received_date: z.string().optional(),
    approved_by: z.string().optional(),
    approved_date: z.string().optional(),
    processed_by: z.string().optional(),
    processed_date: z.string().optional(),
});