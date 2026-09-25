   import {
       useForm as useInertiaForm
   } from "@inertiajs/react";
   export default function UseKYCInertiaForm() {
       return useInertiaForm({
        member_sacco_number: "",
        member_phone_number: "",
        id_type: "",
        id_number: "",
        surname: "",
        first_names: "",
        date_of_birth: "",
        gender: "",
        physical_address: "",
        mailing_address: "",
        home_address: "",
        village: "",
        traditional_authority: "",
        district: "",
        email: "",
        referee_name: "",
        referee_occupation: "",
        referee_address: "",
        referee_phone: "",
        declaration_accepted: false,
        cross_checked_comments: "",
        completed_by: "",
        date_completed: "",
        date_membership_update: "",
        member_identification_number: "",
        approved_by: "",
        branch_manager_name: "",
        approval_date: "",
        approval_status: "",
    });
   }