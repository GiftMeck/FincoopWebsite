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

export const membershipSchema = z.object({
    /*
    Personal Details
    */
    member_sacco_number: z
        .string()
        .optional(),

    member_phone_number: z
        .string()
        .min(8, "Please enter a valid phone number"),

    id_type: z
        .string()
        .min(1, "Please select an ID type"),

    id_number: z
        .string()
        .min(1, "ID number is required"),

    surname: z
        .string()
        .min(2, "Surname must contain at least 2 characters"),

    first_names: z
        .string()
        .min(2, "First names are required"),

    date_of_birth: z
        .string()
        .optional(),

    gender: z
        .string()
        .min(1, "Please select gender"),

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
        .email("Please enter a valid email address")
        .or(z.literal("")),

    /*
    Referees
    */
    referee_name: z
        .string()
        .optional(),

    referee_occupation: z
        .string()
        .optional(),

    referee_address: z
        .string()
        .optional(),

    referee_phone: z
        .string()
        .optional(),

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

    /*
    Official Use Only
    */
    cross_checked_comments: z
        .string()
        .optional(),

    completed_by: z
        .string()
        .optional(),

    date_completed: z
        .string()
        .optional(),

    date_membership_update: z
        .string()
        .optional(),

    member_identification_number: z
        .string()
        .optional(),

    approved_by: z
        .string()
        .optional(),

    branch_manager_name: z
        .string()
        .optional(),

    approval_date: z
        .string()
        .optional(),

    approval_status: z
        .string()
        .optional(),
});