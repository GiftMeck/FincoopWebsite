import { useForm as useInertiaForm } from "@inertiajs/react";

export default function useLoanInertiaForm() {
    return useInertiaForm({
        account_number: "",
        employment_number: "",
        id_type: "",
        id_number: "",
        surname: "",
        first_names: "",
        title: "",
        age: "",
        gender: "",
        physical_address: "",
        mailing_address: "",
        home_address: "",
        village: "",
        traditional_authority: "",
        district: "",
        email: "",
        phone_number: "",

        loanapplication_type: "",
        loanapplication_amount: "",
        loanapplication_amount_in_words: "",
        loanapplication_purpose: "",
        repayment_period: "",

        employer_name: "",
        job_title: "",
        employment_verified: false,
        employment_period: "",
        employer_address: "",
        employer_phone: "",
        gross_income: "",
        gross_income_verified: false,
        net_income: "",
        net_income_verified: false,

        years_in_business: "",
        business_type: "",
        trading_area: "",
        business_name: "",

        shares_balance: "",
        savings_balance: "",
        fixed_deposit_balance: "",
        existing_loanapplications_balance: "",

        declaration_accepted: false,
    });
}