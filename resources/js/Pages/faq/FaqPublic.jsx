import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import { usePage, Link } from "@inertiajs/react";
import { useState, useMemo } from "react";

export default function FaqPublic() {
    const faqs = usePage().props.faqs ?? [];

    const [selectedFaqId, setSelectedFaqId] = useState(faqs[0]?.faq_id ?? null);
    const [hoveredFaqId, setHoveredFaqId] = useState(null);

    const displayedFaq = useMemo(() => {
        const id = hoveredFaqId ?? selectedFaqId;
        return faqs.find((f) => f.faq_id === id) ?? faqs[0] ?? null;
    }, [faqs, hoveredFaqId, selectedFaqId]);

    const selectedIndex = faqs.findIndex(
        (f) => f.faq_id === (displayedFaq?.faq_id ?? null)
    );

    const previousFaq = selectedIndex > 0 ? faqs[selectedIndex - 1] : null;
    const nextFaq =
        selectedIndex >= 0 && selectedIndex < faqs.length - 1
            ? faqs[selectedIndex + 1]
            : null;

    if (!faqs.length) {
        return (
            <>
                <NavBar />
                <section className="bg-gray-100 min-h-[60vh] flex items-center justify-center">
                    <p className="text-gray-500">No FAQs available yet.</p>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <NavBar />

            <section className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <header className="mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-green-800">
                            Frequently Asked Questions
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
                            Here are some of the most frequently asked questions about our services.
                        </p>
                        <div className="mt-3 w-24 h-1 bg-orange-500/70 rounded-full" />

                        <div className="mt-6 inline-block rounded-full border border-green-800/20 bg-green-900/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
                            Directing Towards Financial Freedom
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <div className="lg:col-span-6 order-2 lg:order-1">
                            <ul className="space-y-2">
                                {faqs.map((faq, idx) => {
                                    const isActive =
                                        faq.faq_id === displayedFaq.faq_id;

                                    return (
                                        <li key={faq.faq_id}>
                                            <button
                                                type="button"
                                                onMouseEnter={() =>
                                                    setHoveredFaqId(faq.faq_id)
                                                }
                                                onMouseLeave={() =>
                                                    setHoveredFaqId(null)
                                                }
                                                onClick={() =>
                                                    setSelectedFaqId(faq.faq_id)
                                                }
                                                className={`w-full text-left rounded-xl px-4 py-3 transition-colors duration-200 ${
                                                    isActive
                                                        ? "bg-green-900/10 text-green-900"
                                                        : "text-gray-600 hover:bg-green-900/5 hover:text-green-800"
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="shrink-0 text-xs font-bold text-green-700 pt-1 w-6">
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="text-sm sm:text-base font-semibold leading-snug">
                                                        {faq.faq_question}
                                                    </span>
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="flex items-center justify-between mt-6 px-1">
                                <button
                                    type="button"
                                    disabled={!previousFaq}
                                    onClick={() =>
                                        previousFaq &&
                                        setSelectedFaqId(previousFaq.faq_id)
                                    }
                                    className={`text-sm font-medium transition-colors ${
                                        previousFaq
                                            ? "text-gray-600 hover:text-green-800"
                                            : "text-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    ← Previous
                                </button>

                                <span className="text-xs sm:text-sm text-gray-400 tabular-nums">
                                    {selectedIndex + 1} / {faqs.length}
                                </span>

                                <button
                                    type="button"
                                    disabled={!nextFaq}
                                    onClick={() =>
                                        nextFaq &&
                                        setSelectedFaqId(nextFaq.faq_id)
                                    }
                                    className={`text-sm font-medium transition-colors ${
                                        nextFaq
                                            ? "text-gray-600 hover:text-green-800"
                                            : "text-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <div className="rounded-2xl bg-white shadow-md overflow-hidden">
                                {displayedFaq.demo_photo && (
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={`/storage/${displayedFaq.demo_photo}`}
                                            alt={displayedFaq.faq_question}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-5 sm:p-6">
                                    <h2 className="text-base sm:text-lg font-bold text-green-900 leading-snug">
                                        {displayedFaq.faq_question}
                                    </h2>
                                    <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                                        {displayedFaq.faq_answer}
                                    </p>

                                    <Link
                                        href={route(
                                            "faqs.public.show",
                                            displayedFaq.faq_id
                                        )}
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors"
                                    >
                                        Read full answer
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}