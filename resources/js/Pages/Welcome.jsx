import { BadgeDollarSign } from "lucide-react";
import { HandCoins } from "lucide-react";
import { PiggyBank } from "lucide-react";
import { Smartphone } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { User } from "lucide-react";
import { Briefcase, ChevronDown, ArrowRight, Shield, Star, Users, Clock, Award, Heart, Handshake, Crown, Sparkles, CircleCheck, Building2, FileCheck2, WalletCards, ShieldCheck, Landmark, ClipboardCheck, UserRound, Mail, Phone, MapPin, IdCard } from "lucide-react";
import Create from "./customers/Create";
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaArrowDown, FaArrowRight, FaArrowUp } from 'react-icons/fa';
import NavBar from '@/Layouts/NavBar';
import Footer from '@/Layouts/Footer';

export default function Welcome({ serviceCategories }) {
    const { flash } = usePage().props;
    const faqs = usePage().props.faqs ?? [];
    const financialBenefits = usePage().props.financialBenefits ?? [];
    const vertsData = usePage().props.verts ?? [];
    const feedback = usePage().props.feedback ?? [];
    const financialBenefitsIcons = [
        <BadgeDollarSign className="size-20 text-green-700" />,
        <HandCoins className="size-20 text-green-700" />,
        <ShieldCheck className="size-20 text-green-700" />,
        <Smartphone className="size-20 text-green-700" />,
        <BadgeCheck className="size-20 text-green-700" />,
        <TrendingUp className="size-20 text-green-700" />
    ];
    
    const serviceCategoriesData = serviceCategories ?? [];
    const [currentServiceCategory, setCurrentServiceCategory] = useState(0);
    const [currentVertData, setCurrentVertData] = useState(0);
    const [currentFaq, setCurrentFaq] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleScroll = () => {
        const isScrolled = window.scrollY > 20;
        setScrolled(isScrolled);
        setShowScrollTop(window.scrollY > 500);
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (hovered) return;
        const interval = setInterval(() => {
            setCurrentServiceCategory(prev =>
                (prev + 1) % serviceCategories.length
            );
        }, 10000);
        return () => clearInterval(interval);
    }, [hovered, serviceCategories.length]);

    useEffect(() => {
        if (hovered) return;
        const interval = setInterval(() => {
            setCurrentVertData(prev =>
                (prev + 1) % vertsData.length
            );
        }, 10000);
        return () => clearInterval(interval);
    }, [hovered, vertsData.length]);

    useEffect(() => {
        if (hovered) return;
        const interval = setInterval(() => {
            setCurrentFaq(prev =>
                (prev + 1) % faqs.length
            );
        }, 10000);
        return () => clearInterval(interval);
    }, [hovered, faqs.length]);

    const serviceCategory = serviceCategoriesData[currentServiceCategory];
    const vert = vertsData[currentVertData];

    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (categoryId) => {
        setOpenCategory(
            openCategory === categoryId
                ? null
                : categoryId
        );
    };

    return (
        <>
            <Head title="Welcome | FINCOOP" />
            
            <NavBar
                ActionSource="Public"
            />
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
                <div className="">
                    <div className="relative min-h-[550px] sm:min-h-[600px] lg:min-h-[650px]">
                        <AnimatePresence mode="sync">
                            {vert && (
                                <motion.div
                                    key={vert.advert_id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl"
                                >
                                    <div className="relative order-1 h-[320px] sm:h-[420px] md:h-[500px] lg:h-full overflow-hidden">
                                        <img
                                            src={`storage/${vert.advert_image}`}
                                            alt={vert.advert_title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 text-center text-white">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8 }}
                                                className="mb-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
                                            >
                                                Stay Updated
                                            </motion.div>
                                            <motion.h2
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                                            >
                                                {vert.advert_title}
                                            </motion.h2>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "80px" }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                                className="my-4 h-1 rounded-full bg-orange-500"
                                            />
                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.6 }}
                                                className="max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-200"
                                            >
                                                {vert.advert_description}
                                            </motion.p>
                                        </div>
                                    </div>
                                    <div className="
                                        flex
                                        items-center
                                        justify-center
                                        order-2
                                        bg-gradient-to-br
                                        from-green-900
                                        to-green-950
                                        px-6
                                        py-12
                                        sm:px-8
                                        sm:py-14
                                        md:px-12
                                        md:py-16
                                        lg:px-16
                                        lg:py-20
                                        text-white
                                    ">
                                        <div className="max-w-xl text-center flex flex-col items-center">
                                            <h2 className="
                                                text-3xl
                                                sm:text-4xl
                                                md:text-5xl
                                                font-bold
                                                leading-tight
                                                rounded-2xl
                                                border
                                                border-green-700/60
                                                bg-green-800/40
                                                backdrop-blur-sm
                                                p-6
                                                sm:p-8
                                                shadow-lg
                                                transition-all
                                                duration-300
                                                hover:-translate-y-2
                                                hover:shadow-2xl
                                            ">
                                                Apply For Membership
                                            </h2>
                                            <p className="mt-4 text-green-300">
                                                Start your journey towards financial freedom
                                            </p>
                                            <Link
                                                href={route('memberships.create')}
                                                className="
                                                    mt-6
                                                    rounded-xl
                                                    border-2
                                                    border-orange-500
                                                    bg-orange-500/10
                                                    px-8
                                                    py-4
                                                    text-lg
                                                    font-bold
                                                    text-white
                                                    backdrop-blur-sm
                                                    shadow-lg
                                                    transition-all
                                                    duration-300
                                                    hover:-translate-y-2
                                                    hover:bg-orange-500/20
                                                    hover:shadow-2xl
                                                    hover:border-orange-400
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                "
                                            >
                                                Apply Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 -mt-8 relative z-10">
                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-xl
                        border
                        border-green-100
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-2xl
                        hover:border-green-300
                    ">
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-green-800
                                text-white
                                shadow-lg
                            ">
                                <UserRound className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-green-900">Join FINCOOP</h3>
                                <p className="text-sm text-gray-500">Become a member today</p>
                            </div>
                        </div>
                        <Link
                            href={route('memberships.create')}
                            className="
                                mt-4
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-green-800
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-green-900
                                hover:shadow-lg
                            "
                        >
                            Register Now
                        </Link>
                    </div>
                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-xl
                        border
                        border-green-100
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-2xl
                        hover:border-green-300
                    ">
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-green-800
                                text-white
                                shadow-lg
                                p-3
                            ">
                                <Users className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-green-900">Group Registration</h3>
                                <p className="text-sm text-gray-500">Join FINCOOP as a group, VLSA, SME</p>
                            </div>
                        </div>
                        <Link
                            href={route('group-memberships.create')}
                            className="
                                mt-4
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-green-800
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-green-900
                                hover:shadow-lg
                            "
                        >
                            Register Now
                        </Link>
                    </div>
                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-xl
                        border
                        border-green-100
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-2xl
                        hover:border-green-300
                    ">
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-green-800
                                text-white
                                shadow-lg
                                p-3
                            ">
                                <IdCard className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-green-900">Update KYC</h3>
                                <p className="text-sm text-gray-500">Update your Membership Identification Information</p>
                            </div>
                        </div>
                        <Link
                            href={route('kyc.create')}
                            className="
                                mt-4
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-green-800
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-green-900
                                hover:shadow-lg
                            "
                        >
                            Update Now
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-xl
                        border
                        border-green-100
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-2xl
                        hover:border-green-300
                    ">
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-green-800
                                text-white
                                shadow-lg
                            ">
                                <Smartphone className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-green-900">Mobile Banking</h3>
                                <p className="text-sm text-gray-500">Apply for mobile banking services</p>
                            </div>
                        </div>
                        <Link
                            href={route('mobile-banking-applications.create')}
                            className="
                                mt-4
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-green-800
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-green-900
                                hover:shadow-lg
                            "
                        >
                            Register
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-green-100
                            bg-gradient-to-br
                            from-green-50
                            to-white
                            p-8
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-2
                            hover:shadow-2xl
                            sm:p-10
                        ">
                            <div className="flex flex-col items-center text-center">
                                <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
                                    Apply for a Loan
                                </h2>
                                <div className="my-4 h-1 w-20 rounded-full bg-orange-500"></div>
                                <p className="max-w-md text-gray-500">
                                    Get the financial support you need with our simple
                                    and transparent loan application process.
                                </p>
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                    <Link
                                        href={route('loanapplications.create')}
                                        className="
                                            rounded-xl
                                            bg-green-800
                                            px-6
                                            py-3
                                            font-bold
                                            text-white
                                            shadow-lg
                                            shadow-green-900/20
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:bg-green-900
                                            hover:shadow-xl
                                        "
                                    >
                                        Apply Now
                                    </Link>
                                    <Link
                                        href={route('loanapplications.readmore')}
                                        className="
                                            rounded-xl
                                            border-2
                                            border-green-200
                                            bg-white
                                            px-6
                                            py-3
                                            font-bold
                                            text-green-700
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-green-400
                                            hover:bg-green-50
                                        "
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={route('faqs.public.index')}
                            className="
                                relative
                                min-h-[300px]
                                overflow-hidden
                                rounded-3xl
                                shadow-2xl
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:shadow-3xl
                                cursor-pointer
                                group
                            "
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {faqs[currentFaq] && (
                                <motion.img
                                    key={faqs[currentFaq].faq_id}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    src={`/storage/${faqs[currentFaq].demo_photo}`}
                                    alt={faqs[currentFaq].demo_photo}
                                    className="h-[400px] w-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-green-800 backdrop-blur-sm">
                                    <FileCheck2 className="size-4" />
                                    Frequently Asked Questions
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="mt-16">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
                            Overview Of Our Services And Products
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 rounded-2xl overflow-hidden">
                                {serviceCategoriesData?.slice(0, 6).map((category) => (
                                    <div
                                        key={category.category_id}
                                        className="
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-xl
                                            aspect-square
                                            cursor-pointer
                                        "
                                    >
                                        <img
                                            src={category.category_image ? `/storage/${category.category_image}` : ""}
                                            alt={category.category_name}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-500
                                                group-hover:scale-110
                                            "
                                        />
                                        <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/40">
                                            <span className="
                                                flex
                                                h-full
                                                w-full
                                                shrink-0
                                                items-start
                                                justify-start
                                                rounded-full
                                                text-6xl
                                                font-bold
                                                stroke-green-800
                                                text-green-800/40
                                            ">
                                                {String(serviceCategoriesData.indexOf(category) + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                            <p className="text-xs font-semibold text-white truncate">
                                                {category.category_name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-6 shadow-sm border border-gray-100">
                                <p className="text-sm leading-7 text-gray-600 sm:text-base">
                                    <span className="font-bold text-green-800">FINCOOP</span> offers a comprehensive range
                                    of financial services designed to meet your needs. From loans and savings to
                                    mobile banking and investment solutions, we are committed to your financial growth.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-3">
                                {serviceCategoriesData?.map((category) => {
                                    const isOpen = openCategory === category.category_id;
                                    return (
                                        <div
                                            key={category.category_id}
                                            className="
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                shadow-sm
                                                transition-all
                                                duration-300
                                                hover:shadow-md
                                            "
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleCategory(category.category_id)}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                    p-5
                                                    text-left
                                                    transition-colors
                                                    duration-300
                                                    hover:bg-green-50
                                                "
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-green-800
                                                        text-sm
                                                        font-bold
                                                        text-white
                                                    ">
                                                        {String(serviceCategoriesData.indexOf(category) + 1).padStart(2, "0")}
                                                    </span>
                                                    <h3 className="text-lg font-bold text-green-800 sm:text-xl">
                                                        {category.category_name}
                                                    </h3>
                                                </div>
                                                <ChevronDown
                                                    className={`
                                                        shrink-0
                                                        text-orange-500
                                                        transition-transform
                                                        duration-300
                                                        ${isOpen ? "rotate-180" : ""}
                                                    `}
                                                />
                                            </button>

                                            <div
                                                className={`
                                                    grid
                                                    transition-all
                                                    duration-300
                                                    ease-in-out
                                                    ${isOpen
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
                                                    }
                                                `}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="
                                                        border-t
                                                        border-gray-100
                                                        bg-gray-50
                                                        px-5
                                                        pb-5
                                                        pt-4
                                                        pl-[4.5rem]
                                                    ">
                                                        <p className="text-sm leading-7 text-gray-600 sm:text-base">
                                                            {category.category_description}
                                                        </p>
                                                        <Link
                                                            href={route('serviceCategories.public.show', category.category_id)}
                                                            className="
                                                                mt-3
                                                                inline-flex
                                                                items-center
                                                                gap-1
                                                                text-sm
                                                                font-semibold
                                                                text-green-700
                                                                transition-colors
                                                                hover:text-green-900
                                                            "
                                                        >
                                                            Learn More
                                                            <ArrowRight className="size-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Link
                                    href={route("services.public.index")}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-3
                                        rounded-full
                                        border
                                        border-green-800
                                        bg-green-800
                                        px-6
                                        py-3
                                        text-sm
                                        font-bold
                                        text-white
                                        shadow-md
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:bg-green-900
                                        hover:shadow-lg
                                        sm:text-base
                                    "
                                >
                                    View All Services
                                    <FaArrowRight className="text-orange-400" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
                            Why We Stand Out ?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {financialBenefits?.map((financialBenefit, index) => (
                            <div
                                key={financialBenefit.benefit_id}
                                className="
                                    group
                                    flex
                                    flex-col
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-green-100
                                    bg-white
                                    shadow-md
                                    transition-all
                                    duration-500
                                    hover:-translate-y-2
                                    hover:border-green-300
                                    hover:shadow-2xl
                                "
                            >
                                <div className="
                                    flex
                                    items-center
                                    justify-center
                                    bg-gradient-to-br
                                    from-green-800
                                    to-green-900
                                    p-8
                                    text-white
                                ">
                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white
                                        text-green-800
                                        shadow-lg
                                        transition-transform
                                        duration-500
                                        group-hover:scale-110
                                        group-hover:rotate-6
                                    ">
                                        {financialBenefitsIcons[index] ?? financialBenefitsIcons[0]}
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <h3 className="text-xl font-bold text-green-800 transition-colors duration-300 group-hover:text-green-700">
                                        {financialBenefit.benefit_name}
                                    </h3>
                                    <div className="
                                        mt-3
                                        h-1
                                        w-16
                                        rounded-full
                                        bg-orange-500
                                        transition-all
                                        duration-500
                                        group-hover:w-24
                                    " />
                                    <p className="mt-4 text-sm sm:text-base leading-7 text-gray-600">
                                        {financialBenefit.benefit_description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col justify-end" id="feedback-form">
                            {showMessage && (
                                <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700 shadow-lg">
                                    {flash.success}
                                </div>
                            )}

                            <div className="mb-4">
                                <h2 className="mt-2 text-3xl font-bold text-green-900 sm:text-4xl">
                                    What People Say About Us
                                </h2>
                                <div className="mt-2 h-1 w-20 rounded-full bg-orange-500"></div>
                            </div>

                            <div className="space-y-4">
                                {feedback && feedback.data.map((feed) => (
                                    <div
                                        key={feed.customer_id}
                                        className="
                                            rounded-xl
                                            border
                                            border-gray-100
                                            bg-white
                                            p-5
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:shadow-md
                                        "
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-green-100
                                                text-green-700
                                            ">
                                                <User className="size-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-green-900">
                                                    {feed.customer_name}
                                                </h4>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    "{feed.customer_message}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                {feedback && feedback.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? "#"}
                                        preserveScroll
                                        preserveState
                                        className={`
                                            px-4
                                            py-2
                                            rounded-lg
                                            border
                                            text-sm
                                            font-semibold
                                            transition-all
                                            duration-300
                                            ${link.active
                                                ? "bg-green-800 text-white border-green-800"
                                                : "bg-white text-green-900 border-gray-200 hover:bg-green-50 hover:border-green-300"
                                            }
                                            ${!link.url ? "pointer-events-none opacity-40" : ""}
                                        `}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="
                                rounded-2xl
                                border
                                border-green-100
                                bg-gradient-to-br
                                from-green-50
                                to-white
                                p-6
                                shadow-lg
                                sm:p-8
                            ">
                                <div className="mb-6 text-center">
                                    <h3 className="text-2xl font-bold text-green-900">
                                        Your Voice Matters
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Help us serve you better
                                    </p>
                                </div>
                                <Create />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 rounded-3xl bg-gradient-to-r from-green-900 to-green-950 p-8 shadow-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-800/60 text-white">
                                <Shield className="size-6" />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-green-300">Secure Banking</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-800/60 text-white">
                                <Clock className="size-6" />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-green-300">24/7 Access</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-800/60 text-white">
                                <Users className="size-6" />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-green-300">Community Focused</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-800/60 text-white">
                                <Award className="size-6" />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-green-300">Trusted Partner</p>
                        </div>
                    </div>
                </div>
            </section>
            <button
                onClick={scrollToTop}
                className={`
                    fixed
                    bottom-8
                    right-8
                    z-50
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-green-800
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-green-900
                    hover:shadow-xl
                    ${showScrollTop
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0 pointer-events-none"
                    }
                `}
            >
                <FaArrowUp className="text-lg" />
            </button>

            <Footer />
        </>
    );
}