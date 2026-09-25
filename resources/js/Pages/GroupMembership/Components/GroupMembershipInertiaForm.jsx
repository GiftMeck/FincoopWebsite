import {
    useForm as useInertiaForm,
} from "@inertiajs/react";

export default function UseGroupMembershipInertiaForm(props) {
    return useInertiaForm({
        group_name: "",
        number_of_members_male: "",
        number_of_members_female: "",
        number_of_members_total: "",
        date_of_registration: "",
        registration_number: "",
        registered_under: "",
        business_type: "",
        income_source: "",
        place_of_operation: "",
        trading_area: "",

        rep1_full_name: "",
        rep1_id_number: "",
        rep1_position: "",
        rep1_telephone: "",

        rep2_full_name: "",
        rep2_id_number: "",
        rep2_position: "",
        rep2_telephone: "",

        rep3_full_name: "",
        rep3_id_number: "",
        rep3_position: "",
        rep3_telephone: "",

        group_mailing_address: "",
        group_physical_address: "",

        recommendation_centre_name: "",
        recommendation_date: "",

        leader1_name: "",
        leader1_signature: "",
        leader1_position: "",

        leader2_name: "",
        leader2_signature: "",
        leader2_position: "",

        leader3_name: "",
        leader3_signature: "",
        leader3_position: "",

        declaration_accepted: false,
        chairperson_signature: "",
        secretary_signature: "",
        treasurer_signature: "",
        application_date: "",

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