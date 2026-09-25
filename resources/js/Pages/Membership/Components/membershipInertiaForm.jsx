import {
    useForm as useInertiaForm,
} from "@inertiajs/react";
export default function UseMembershipInertiaForm() {
    return useInertiaForm({
            title: "",
            surname: "",
            first_name: "",
            additional_name: "",

            date_of_birth: "",
            gender: "",
            nationality: "",
            marital_status: "",

            id_type: "",
            id_number: "",

            income_source: "",
            occupation: "",
            qualification: "",
            number_of_dependants: "",

            village: "",
            traditional_authority: "",
            district: "",

            physical_address: "",
            mailing_address: "",

            telephone: "",
            cell_phone: "",
            email: "",

            employer_name: "",
            employer_address: "",
            employer_telephone: "",
            employer_fax_number: "",

            employment_number: "",
            monthly_shares: "",
            monthly_savings_ps: "",

            beneficiary_1_name: "",
            beneficiary_1_relationship: "",
            beneficiary_1_birth_date_percentage: "",

            beneficiary_2_name: "",
            beneficiary_2_relationship: "",
            beneficiary_2_birth_date_percentage: "",

            beneficiary_3_name: "",
            beneficiary_3_relationship: "",
            beneficiary_3_birth_date_percentage: "",

            referee_name: "",
            referee_occupation: "",
            referee_address: "",
            referee_phone_number: "",

            declaration_accepted: false,
            applicant_signature: "",
            thumb_print: "",
            application_date: "",

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