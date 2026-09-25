import { z } from "zod";
export const groupMembershipSchema = z.object({

    /*
    Group Details
    */

    group_name: z.string().min(
        2,
        "Group name is required"
    ),

    number_of_members_male: z.preprocess(
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

    number_of_members_female: z.preprocess(
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

    number_of_members_total: z.preprocess(
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

    date_of_registration: z.string().optional(),

    registration_number: z.string().optional(),

    registered_under: z.string().optional(),

    business_type: z.string().optional(),

    income_source: z.string().optional(),

    place_of_operation: z.string().optional(),

    trading_area: z.string().optional(),

    /*
    Contact Person / Group Representatives
    */

    // Representative 1
    rep1_full_name: z.string().optional(),
    rep1_id_number: z.string().optional(),
    rep1_position: z.string().optional(),
    rep1_telephone: z.string().optional(),

    // Representative 2
    rep2_full_name: z.string().optional(),
    rep2_id_number: z.string().optional(),
    rep2_position: z.string().optional(),
    rep2_telephone: z.string().optional(),

    // Representative 3
    rep3_full_name: z.string().optional(),
    rep3_id_number: z.string().optional(),
    rep3_position: z.string().optional(),
    rep3_telephone: z.string().optional(),

    /*
    Group Address
    */

    group_mailing_address: z.string().optional(),

    group_physical_address: z.string().optional(),

    /*
    Recommendation
    */

    recommendation_centre_name: z.string().optional(),

    recommendation_date: z.string().optional(),

    // Leader 1
    leader1_name: z.string().optional(),
    leader1_signature: z.string().optional(),
    leader1_position: z.string().optional(),

    // Leader 2
    leader2_name: z.string().optional(),
    leader2_signature: z.string().optional(),
    leader2_position: z.string().optional(),

    // Leader 3
    leader3_name: z.string().optional(),
    leader3_signature: z.string().optional(),
    leader3_position: z.string().optional(),

    /*
    Declaration
    */

    declaration_accepted: z.boolean().refine(
        (value) => value === true,
        {
            message: "You must accept the declaration.",
        }
    ),

    chairperson_signature: z.string().min(
        2,
        "Chairperson signature is required"
    ),

    secretary_signature: z.string().min(
        2,
        "Secretary signature is required"
    ),

    treasurer_signature: z.string().min(
        2,
        "Treasurer signature is required"
    ),

    application_date: z.string().min(
        1,
        "Application date is required"
    ),

    /*
    Official Use Only
    */

    cross_checked_comments: z.string().optional(),

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