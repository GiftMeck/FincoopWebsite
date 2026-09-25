import { useForm } from "@inertiajs/react";

export default function UseGroupMembershipCheckInertiaForm() {
    return useForm({
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
    });
}