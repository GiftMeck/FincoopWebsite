import {
    Check,
    ChevronLeft,
    ChevronRight,
    FileCheck2,
    UserRound,
    Users,
    Fingerprint,
    BookOpen,
    MapPin,
    Shield,
    Heart,
    Handshake,
    Crown,
    AlertCircle,
    UserPlus,
    Sparkles,
    BadgeCheck,
    Building2,
} from "lucide-react";
export default function SectionHeader({
    icon: Icon,
    title,
    description,
}) {

    return (

        <div className="
            mb-8
            flex
            items-start
            gap-4
        ">

            <div className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-green-800
                text-white
                shadow-md
            ">

                <Icon className="size-6" />

            </div>


            <div>

                <h2 className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-green-900
                    sm:text-3xl
                ">

                    {title}

                </h2>


                <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-gray-500
                    sm:text-base
                ">

                    {description}

                </p>

            </div>

        </div>

    );

}

