import AboutDashboard from './about/AboutDashboard';
import ContactDashboard from './contact/ContactDashboard';
import BranchesDashboard from './branches/BranchesDashboard';
import ServicesDashboard from './services/ServicesDashboard';
import CustomersDashboard from './customers/CustomersDashboard';
import FaqDashboard from './faq/FaqDashboard';
import GalleryDashboard from './gallery/GalleryDashboard';
import PartnersDashboard from './partners/PartnersDashboard';
import RolesDashboard from './roles/RolesDashboard';
import ServiceCategoriesDashboard from './serviceCategories/ServiceCategoriesDashboard';
import StaffDashboard from './staff/StaffDashboard';
import TestimonialsDashboard from './testimonials/TestimonialsDashboard';
import FinancialBenefitsDashboard from './financialBenefits/financialBenefitsDashboard';
import VertsDashboard from './verts/VertsDashboard';
import DocumentsDashboard from './Documents/DocumentsDashboard';
import Membership from './Membership/Index';
import GroupMembership from './GroupMembership/Index';
import KYC from './KYC/Index';
import LoanApplications from './Loans/Index';
import MobileBankingApplications from './MobileBanking/Index';
import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import FinancialBenefits from './financialBenefits/Index';
export const tabs = [
        {
            key: 'serviceCategories',
            label: 'SERVICE CATEGORIES',
            prop: 'serviceCategories'
        },
        {
            key: 'services',
            label: 'SERVICES',
            prop: 'services'
        },
        {
            key: 'documents',
            label: 'DOCUMENTS',
            prop: 'documents'
        },
        {
            key: 'projects',
            label: 'PROJECTS',
            prop: 'projects'
        },
        {
            key: 'about',
            label: 'ABOUT',
            prop: 'about'
        },
        {
            key: 'staff',
            label: 'STAFF',
            prop: 'staff'
        },
        {
            key: 'roles',
            label: 'ROLES',
            prop: 'roles'
        },
        {
            key: 'customers',
            label: 'CUSTOMERS',
            prop: 'customers'
        },
        {
            key: 'gallery',
            label: 'GALLERY',
            prop: 'gallery'
        },
        {
            key: 'faqs',
            label: 'FAQs',
            prop: 'faqs'
        },
        {
            key: 'contacts',
            label: 'CONTACTS',
            prop: 'contacts'
        },
        {
            key: 'partners',
            label: 'PARTNERS',
            prop: 'partners'
        },
        {
            key: 'testimonials',
            label: 'TESTIMONIALS',
            prop: 'testimonials'
        },
        {
            key: 'branches',
            label: 'BRANCHES',
            prop: 'branches'
        },
        {
            key: 'financialBenefits',
            label: 'FINANCIAL BENEFITS',
            prop: 'financialBenefits'
        },
        {
            key: 'verts',
            label: 'ADVERTS',
            prop: 'verts'
        },
        {
            key: 'membershipApplications',
            label: 'MEMBERSHIP APPLICATIONS',
            prop: 'membershipApplications'
        },
        {
            key: 'KYC',
            label: 'KYC',
            prop: 'kYC'
        },
        {
            key: 'groupMembershipApplications',
            label: 'GROUP MEMBERSHIP APPLICATIONS',
            prop: 'groupMembershipApplications'
        },
        {
            key: 'loanApplications',
            label: 'LOAN APPLICATIONS',
            prop: 'loanApplications'
        },
        {
            key: 'mobileBankingApplications',
            label: 'MOBILE BANKING APPLICATIONS',
            prop: 'mobileBankingApplications'
        }
    ]; 
export default function Dashboard() {
    const serverActiveTab = usePage().props.activeTab;
    const [activeTab, setActiveTab] = useState(serverActiveTab ||'SERVICE CATEGORIES');
    function handleTabClick(tab) {
        setActiveTab(tab.label);
    }
    const useref = useRef(null);
    useEffect(() => {
        if (useref.current) {
            useref.current.scrollIntoView({ behavior: 'smooth' });
        }
    })
    return (
        <AuthenticatedLayout
            header={
                <nav className="flex justify-center items-center space-x-2">
                    <div className='grid grid-cols-12 gap-2'>
                        {tabs.map((tab)=>{
                            return (
                                <button
                                    type="button"
                                    key = {tab.key}
                                    className={`p-2 text-xs rounded-md ${
                                        activeTab === tab.label ? 'bg-green-800 text-white' : 'bg-gray-200'
                                    }`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>
                </nav>
                }
            >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {activeTab === 'SERVICE CATEGORIES' && <ServiceCategoriesDashboard/>}
                            {activeTab === 'SERVICES' && <ServicesDashboard />}
                            {activeTab === 'BRANCHES' && <BranchesDashboard 
                                branches={usePage().props?.branches} />}
                            {activeTab === 'ABOUT' && <AboutDashboard />}
                            {activeTab === 'STAFF' && <StaffDashboard />}
                            {activeTab === 'GALLERY' && <GalleryDashboard
                                galleries={usePage().props?.galleries}
                                users={usePage().props?.users}
                                branches={usePage().props?.branches}
                                services={usePage().props?.services}
                                partners={usePage().props?.partners} />}
                            {activeTab === 'FAQs' && <FaqDashboard 
                                faqs={usePage().props?.faqs}
                                users={usePage().props?.users}
                                customers={usePage().props?.customers} />}
                            {activeTab === 'CONTACTS' && <ContactDashboard
                                contacts={usePage().props?.contacts} 
                                branches={usePage().props?.branches}
                                partners={usePage().props?.partners} />}
                            {activeTab === 'PARTNERS' && <PartnersDashboard partners={usePage().props?.partners} />}
                            {activeTab === 'TESTIMONIALS' && <TestimonialsDashboard 
                                testimonials={usePage().props?.testimonials}
                                customers={usePage().props?.customers}
                                partners={usePage().props?.partners} />}
                            {activeTab === 'BRANCHES' && <BranchesDashboard branches={usePage().props?.branches} />}
                            {activeTab === 'ROLES' && <RolesDashboard roles={usePage().props?.roles} />}
                            {activeTab === 'CUSTOMERS' && <CustomersDashboard customers={usePage().props?.customers} />}
                            {activeTab === 'FINANCIAL BENEFITS' && <FinancialBenefitsDashboard 
                                financialBenefits={usePage().props?.financialBenefits}
                                serviceCategories={usePage().props?.serviceCategories} />}
                            {activeTab === 'ADVERTS' && <VertsDashboard verts={usePage().props?.verts} />}
                            {activeTab === 'DOCUMENTS' && <DocumentsDashboard />}
                            {activeTab === 'MEMBERSHIP APPLICATIONS' && <Membership />}
                            {activeTab === 'KYC' && <KYC />}
                            {activeTab === 'GROUP MEMBERSHIP APPLICATIONS' && <GroupMembership />}
                            {activeTab === 'LOAN APPLICATIONS' && <LoanApplications />}
                            {activeTab === 'MOBILE BANKING APPLICATIONS' && <MobileBankingApplications />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
