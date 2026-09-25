import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Optional helpers
|--------------------------------------------------------------------------
*/
const optionalNumber = z.preprocess(
    (value) => {
        if (value === "" || value === null || value === undefined) {
            return undefined;
        }
        return Number(value);
    },
    z.number().min(0).optional()
);
const groupMembershipCheckSchema = z.object({
    cross_checked_comments: z.string().optional(),
    entrance_fee_paid_on: z.string().optional(),
    entrance_fee_amount: optionalNumber,
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
export default function UseGroupMembershipCheckReactHookForm() {
    return useForm({
        resolver: zodResolver(groupMembershipCheckSchema),
        mode: "onChange",
        defaultValues: {
            cross_checked_comments: "",
            entrance_fee_paid_on: "",
            entrance_fee_amount: "",
            receipt_number: "",
            completed_by: "",
            completed_date: "",
            date_of_admission: "",
            member_identification_number: "",
            approved_disapproved_by: "",
            branch_manager: "",
            official_signature: "",
            official_date: "",
        },
    });
}