import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Popup() {
    const { flash } = usePage().props;

    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setMessage({
                type: "success",
                text: flash.success,
            });
        } else if (flash?.error) {
            setMessage({
                type: "error",
                text: flash.error,
            });
        }
    }, [flash]);

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage(null);
        }, 10000);

        return () => clearTimeout(timer);
    }, [message]);

    if (!message) {
        return null;
    }

    return (
        <div className="fixed right-5 top-5 z-[9999] w-[calc(100%-2.5rem)] max-w-md">
            <div
                className={`
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    p-4
                    shadow-2xl
                    backdrop-blur-md

                    ${
                        message.type === "success"
                            ? "border-green-300 bg-green-50/95 text-green-900"
                            : "border-red-300 bg-red-50/95 text-red-900"
                    }
                `}
            >
                {message.type === "success" ? (
                    <CheckCircle
                        size={24}
                        className="mt-0.5 shrink-0 text-green-600"
                    />
                ) : (
                    <XCircle
                        size={24}
                        className="mt-0.5 shrink-0 text-red-600"
                    />
                )}

                <div className="flex-1">
                    <h3 className="font-bold">
                        {message.type === "success"
                            ? "Success"
                            : "Error"}
                    </h3>

                    <p className="mt-1 text-sm">
                        {message.text}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setMessage(null)}
                    className="rounded-full p-1 transition hover:bg-black/10"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
