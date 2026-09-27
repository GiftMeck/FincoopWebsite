import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Popup from "@/Components/Popup";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function NavBar({ scrolled, ActionSource }) {
    const { filteredTabs, auth } = usePage().props;
    const user = auth?.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const buildHref = (tab) => {
        if (ActionSource) {
            return route(`${tab?.publicRoute}.index`, { ActionSource });
        }
        if (user) {
            return route(`${tab?.key}.index`);
        }
        return route(`${tab?.publicRoute}.index`, { ActionSource });
    };

    return (
        <>
            <nav
                className={`
                    sticky
                    top-0
                    z-50
                    w-full
                    transition-all
                    border-b border-green-900/20
                    ${
                        scrolled
                            ? "bg-white/95 backdrop-blur-xl border-b border-green-900/10 shadow-lg shadow-green-950/5"
                            : "bg-transparent backdrop-blur-sm"
                    }
                `}
            >
                <div
                    className="
                        mx-auto
                        flex
                        min-h-[80px]
                        max-w-7xl
                        items-center
                        justify-between
                        gap-6
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >
                    {/* LOGO */}
                    <div className="flex shrink-0 justify-center">
                        <Link
                            href="/"
                            className="
                                group
                                flex
                                items-center
                                transition-transform
                                duration-300
                                hover:scale-105
                            "
                            onClick={() => setMobileOpen(false)}
                        >
                            <ApplicationLogo
                                className="
                                    h-12
                                    w-12
                                    sm:h-14
                                    sm:w-14
                                    lg:h-16
                                    lg:w-16
                                "
                            />

                            <div className="ml-3 hidden sm:block">
                                <h1 className="
                                    text-lg
                                    font-black
                                    tracking-wide
                                    transition-colors
                                    duration-300
                                    text-white
                                ">
                                    FINCOOP
                                </h1>
                                <p className={`
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    transition-colors
                                    duration-300
                                    ${scrolled ? "text-green-700" : "text-white/70"}
                                `}>
                                    LIMITED
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex flex-1 justify-end">
                        <ul className="
                            flex
                            items-center
                            justify-end
                            gap-1
                            sm:gap-2
                            lg:gap-3
                        ">
                            {filteredTabs?.map((tab) => (
                                <li key={tab.key}>
                                    <Link
                                        href={buildHref(tab)}
                                        className={`
                                            group
                                            relative
                                            flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            px-3
                                            py-2
                                            sm:px-4
                                            sm:py-2.5
                                            text-xs
                                            sm:text-sm
                                            font-semibold
                                            tracking-wide
                                            transition-all
                                            duration-300
                                            ${
                                                scrolled
                                                    ? "text-green-950 hover:bg-green-50 hover:text-green-700"
                                                    : "text-white bg-green-950/20 border border-green-800/30 backdrop-blur-md hover:bg-green-800/70 hover:border-green-400/40 hover:text-orange-300 shadow-md hover:shadow-lg"
                                            }
                                            hover:-translate-y-[1px]
                                        `}
                                    >
                                        {tab.label}
                                        <span className={`
                                            absolute
                                            bottom-1
                                            left-1/2
                                            h-[2px]
                                            w-0
                                            -translate-x-1/2
                                            rounded-full
                                            transition-all
                                            duration-300
                                            group-hover:w-1/2
                                            ${scrolled ? "bg-green-700" : "bg-orange-500"}
                                        `} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        className={`
                            md:hidden
                            inline-flex
                            items-center
                            justify-center
                            h-11
                            w-11
                            rounded-xl
                            transition-all
                            duration-300
                            shadow-md
                            ${
                                scrolled
                                    ? "bg-green-800 text-white hover:bg-green-900"
                                    : "bg-green-950/30 text-white border border-green-800/30 backdrop-blur-md hover:bg-green-800/70 hover:border-green-400/40"
                            }
                        `}
                    >
                        {mobileOpen ? (
                            <X className="size-6" />
                        ) : (
                            <Menu className="size-6" />
                        )}
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileOpen(false)}
                            className="
                                md:hidden
                                fixed
                                inset-0
                                z-[90]
                                bg-black/50
                                backdrop-blur-sm
                            "
                        />

                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "tween",
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className="
                                md:hidden
                                fixed
                                top-0
                                right-0
                                bottom-0
                                z-[100]
                                w-[80%]
                                max-w-sm
                                bg-white
                                shadow-2xl
                                border-l
                                border-green-900/10
                                overflow-y-auto
                            "
                        >
                            {/* Drawer header with close button */}
                            <div className="
                                flex
                                items-center
                                justify-between
                                px-4
                                py-4
                                border-b
                                border-green-900/10
                            ">
                                <span className="
                                    text-sm
                                    font-bold
                                    tracking-widest
                                    uppercase
                                    text-green-900
                                ">
                                    Menu
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close menu"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        h-9
                                        w-9
                                        rounded-lg
                                        bg-green-50
                                        text-green-800
                                        hover:bg-green-100
                                        transition-colors
                                        duration-200
                                    "
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            {/* Links */}
                            <ul className="
                                flex
                                flex-col
                                gap-2
                                p-4
                            ">
                                {filteredTabs?.map((tab) => (
                                    <li key={tab.key}>
                                        <Link
                                            href={buildHref(tab)}
                                            onClick={() => setMobileOpen(false)}
                                            className="
                                                group
                                                flex
                                                items-center
                                                justify-between
                                                rounded-xl
                                                border
                                                border-green-100
                                                bg-green-50/50
                                                px-4
                                                py-3.5
                                                text-sm
                                                font-semibold
                                                tracking-wide
                                                text-green-900
                                                transition-all
                                                duration-300
                                                hover:border-green-300
                                                hover:bg-green-100
                                                hover:text-green-700
                                            "
                                        >
                                            <span>{tab.label}</span>
                                            <span className="
                                                h-1.5
                                                w-1.5
                                                rounded-full
                                                bg-orange-500
                                                transition-transform
                                                duration-300
                                                group-hover:scale-150
                                            " />
                                        </Link>
                                    </li>
                                ))}

                                {user && (
                                    <li className="mt-2 pt-4 border-t border-green-100">
                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            mb-3
                                            px-2
                                        ">
                                            <div className="
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-green-800
                                                text-white
                                                font-bold
                                            ">
                                                {user.name?.charAt(0)?.toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500">
                                                    Signed in as
                                                </p>
                                                <p className="text-sm font-semibold text-green-900 truncate">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            onClick={() => setMobileOpen(false)}
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                justify-center
                                                rounded-xl
                                                border
                                                border-red-200
                                                bg-red-50/50
                                                px-4
                                                py-3
                                                text-sm
                                                font-semibold
                                                text-red-700
                                                transition-all
                                                duration-300
                                                hover:border-red-300
                                                hover:bg-red-100
                                            "
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Popup />
        </>
    );
}