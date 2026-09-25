import { tabs } from "@/Pages/Dashboard";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Popup from "@/Components/Popup";

export default function NavBar({ scrolled, ActionSource }) {
    const { filteredTabs, auth } = usePage().props;
    const user = auth?.user;
    return (
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
                        ? `
                            bg-white/95
                            backdrop-blur-xl
                            border-b
                            border-green-900/10
                            shadow-lg
                            shadow-green-950/5
                        `
                        : `
                            bg-transparent
                            backdrop-blur-sm
                        `
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
                    justify-center
                    gap-6
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

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

                            <h1
                                className={`
                                    text-lg
                                    font-black
                                    tracking-wide
                                    transition-colors
                                    duration-300
                                    text-white
                                `}
                            >
                                FINCOOP
                            </h1>

                            <p
                                className={`
                                    text-[10px]
                                    font-medium
                                    tracking-[0.2em]
                                    transition-colors
                                    duration-300

                                    ${
                                        scrolled
                                            ? "text-green-700"
                                            : "text-white/70"
                                    }
                                `}
                            >
                                LIMITED
                            </p>

                        </div>

                    </Link>

                </div>

                <div
                    className="
                        flex
                        flex-1
                        justify-end
                    "
                >

                    <ul
                        className="
                            flex
                            items-center
                            justify-end
                            gap-1
                            sm:gap-2
                            lg:gap-3
                        "
                    >

                        {filteredTabs?.map((tab) => {

                            const href = ActionSource
                                ? route(
                                    `${tab?.publicRoute}.index`,
                                    { ActionSource }
                                )
                                : user
                                    ? route(`${tab?.key}.index`)
                                    : route(
                                        `${tab?.publicRoute}.index`,
                                        { ActionSource }
                                    );

                            return (

                                <li key={tab.key}>

                                    <Link
                                        href={href}
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

                                                    ?

                                                    `
                                                        text-green-950
                                                        hover:bg-green-50
                                                        hover:text-green-700
                                                    `

                                                    :

                                                    `
                                                        text-white
                                                        bg-green-950/20
                                                        border
                                                        border-green-800/30
                                                        backdrop-blur-md
                                                        hover:bg-green-800/70
                                                        hover:border-green-400/40
                                                        hover:text-orange-300
                                                        shadow-md
                                                        hover:shadow-lg
                                                    `
                                            }

                                            hover:-translate-y-[1px]
                                        `}
                                    >

                                        {tab.label}

                                        <span
                                            className={`
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

                                                ${
                                                    scrolled
                                                        ? "bg-green-700"
                                                        : "bg-orange-500"
                                                }
                                            `}
                                        />

                                    </Link>

                                </li>

                            );

                        })}

                    </ul>

                </div>

            </div>
            <Popup />
        </nav>
    );
}