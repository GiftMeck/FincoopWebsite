import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { router } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Search,
    X,
    CornerDownLeft,
    Loader2,
    Briefcase,
    LayoutGrid,
    HelpCircle,
    Info,
    Image,
    Handshake,
    MessageSquareQuote,
    MapPin,
    PiggyBank,
    Megaphone,
    FileText,
    FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon shown for each content group in the results list.
const GROUP_ICONS = {
    Services: Briefcase,
    "Service Categories": LayoutGrid,
    FAQs: HelpCircle,
    About: Info,
    Gallery: Image,
    Partners: Handshake,
    Testimonials: MessageSquareQuote,
    Branches: MapPin,
    "Financial Benefits": PiggyBank,
    Promotions: Megaphone,
    Documents: FileText,
    Projects: FolderKanban,
};

function GroupIcon({ label, className }) {
    const Icon = GROUP_ICONS[label] || Search;
    return <Icon className={className} />;
}

function EmptyHint({ title, subtitle }) {
    return (
        <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-50 text-green-700">
                <Search className="size-5" />
            </div>
            <p className="text-sm font-semibold text-green-950">{title}</p>
            {subtitle ? (
                <p className="mx-auto mt-1 max-w-sm text-xs text-green-900/60">{subtitle}</p>
            ) : null}
        </div>
    );
}

/**
 * Global site search rendered as a command-palette style modal.
 *
 * A small trigger button opens the palette (also via Cmd/Ctrl+K). As the
 * user types, results are fetched from the JSON `/search` endpoint with a
 * short debounce, grouped by content type, and navigable with the keyboard.
 */
export default function GlobalSearch({ scrolled = false }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [groups, setGroups] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);
    const abortRef = useRef(null);

    // Flatten grouped results into a single list for keyboard navigation.
    const flat = useMemo(
        () => groups.flatMap((g) => g.items.map((item) => ({ ...item, group: g.label }))),
        [groups]
    );

    const closeSearch = useCallback(() => {
        setOpen(false);
        setQuery("");
        setGroups([]);
        setTotal(0);
        setActive(0);
    }, []);

    // Cmd/Ctrl + K toggles the palette from anywhere on the page.
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Focus the input and lock body scroll while the palette is open.
    useEffect(() => {
        if (!open) return undefined;
        const t = setTimeout(() => inputRef.current?.focus(), 60);
        document.body.style.overflow = "hidden";
        return () => {
            clearTimeout(t);
            document.body.style.overflow = "";
        };
    }, [open]);

    // Debounced fetch of search results.
    useEffect(() => {
        if (!open) return undefined;

        if (query.trim().length < 2) {
            setGroups([]);
            setTotal(0);
            setLoading(false);
            return undefined;
        }

        setLoading(true);
        const handle = setTimeout(async () => {
            try {
                abortRef.current?.abort();
                const controller = new AbortController();
                abortRef.current = controller;

                const res = await fetch(`/search?q=${encodeURIComponent(query)}`, {
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`Search failed (${res.status})`);

                const data = await res.json();
                setGroups(data.groups || []);
                setTotal(data.total || 0);
                setActive(0);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setGroups([]);
                    setTotal(0);
                }
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => clearTimeout(handle);
    }, [query, open]);

    // Keep the active result within the visible scroll area.
    useEffect(() => {
        const el = document.getElementById(`search-result-${active}`);
        el?.scrollIntoView({ block: "nearest" });
    }, [active]);

    const go = (url) => {
        if (!url) return;
        closeSearch();
        router.visit(url);
    };

    const onInputKeyDown = (e) => {
        if (e.key === "Escape") {
            closeSearch();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (flat.length ? Math.min(a + 1, flat.length - 1) : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const item = flat[active];
            if (item) go(item.url);
        }
    };
    return (
        <>
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open search"
                className={cn(
                    "group inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-md transition-all duration-300",
                    scrolled
                        ? "bg-green-800 text-white hover:bg-green-900"
                        : "bg-green-950/30 text-white border border-green-800/30 backdrop-blur-md hover:bg-green-800/70 hover:border-green-400/40"
                )}
            >
                <Search className="size-5" />
            </button>

            {/* Modal palette */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[10vh] pb-8 sm:pt-[15vh]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={closeSearch}
                        />

                        {/* Panel */}
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Search the site"
                            initial={{ opacity: 0, scale: 0.98, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-green-900/10 bg-white shadow-2xl"
                        >
                            {/* Search input row */}
                            <div className="flex items-center gap-3 border-b border-green-900/10 px-4 py-3">
                                <Search className="size-5 shrink-0 text-green-700" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={onInputKeyDown}
                                    placeholder="Search services, FAQs, branches, documents…"
                                    className="w-full bg-transparent text-sm text-green-950 outline-none placeholder:text-green-900/40"
                                />
                                {loading ? (
                                    <Loader2 className="size-4 shrink-0 animate-spin text-green-700" />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={closeSearch}
                                        aria-label="Close search"
                                        className="shrink-0 rounded-md p-1 text-green-900/60 transition hover:bg-green-50 hover:text-green-800"
                                    >
                                        <X className="size-4" />
                                    </button>
                                )}
                            </div>
                            {/* Body */}
                            <div className="max-h-[55vh] overflow-y-auto">
                                {query.trim().length < 2 ? (
                                    <EmptyHint
                                        title="Start typing to search"
                                        subtitle="Look for services, categories, FAQs, gallery, partners, branches, documents and more."
                                    />
                                ) : loading && flat.length === 0 ? (
                                    <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-green-900/60">
                                        <Loader2 className="size-4 animate-spin" />
                                        Searching…
                                    </div>
                                ) : flat.length === 0 ? (
                                    <EmptyHint
                                        title={`No results for “${query}”`}
                                        subtitle="Try a different keyword."
                                    />
                                ) : (
                                    <div className="py-2">
                                        {groups.map((group) => (
                                            <div key={group.label} className="px-2 py-1">
                                                <div className="flex items-center gap-2 px-2 py-1.5 text-[11px] font-bold uppercase tracking-widest text-green-800/70">
                                                    <GroupIcon label={group.label} className="size-3.5" />
                                                    {group.label}
                                                </div>
                                                <ul>
                                                    {group.items.map((item) => {
                                                        const index = flat.findIndex(
                                                            (f) =>
                                                                f.url === item.url &&
                                                                f.title === item.title
                                                        );
                                                        const isActive = index === active;
                                                        return (
                                                            <li key={`${group.label}-${item.url}-${item.title}`}>
                                                                <button
                                                                    id={`search-result-${index}`}
                                                                    type="button"
                                                                    onMouseEnter={() => setActive(index)}
                                                                    onClick={() => go(item.url)}
                                                                    className={cn(
                                                                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                                                                        isActive
                                                                            ? "bg-green-50"
                                                                            : "hover:bg-green-50/60"
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={cn(
                                                                            "flex size-9 shrink-0 items-center justify-center rounded-lg",
                                                                            isActive
                                                                                ? "bg-green-700 text-white"
                                                                                : "bg-green-100 text-green-800"
                                                                        )}
                                                                    >
                                                                        <GroupIcon label={group.label} className="size-4" />
                                                                    </span>
                                                                    <span className="min-w-0 flex-1">
                                                                        <span className="block truncate text-sm font-semibold text-green-950">
                                                                            {item.title}
                                                                        </span>
                                                                        {item.description ? (
                                                                            <span className="block truncate text-xs text-green-900/60">
                                                                                {item.description}
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                    {isActive ? (
                                                                        <CornerDownLeft className="size-4 shrink-0 text-green-700" />
                                                                    ) : null}
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between gap-3 border-t border-green-900/10 bg-green-50/40 px-4 py-2.5 text-[11px] text-green-900/60">
                                <span className="flex items-center gap-1.5">
                                    <kbd className="rounded border border-green-900/15 bg-white px-1.5 py-0.5 font-sans">↑</kbd>
                                    <kbd className="rounded border border-green-900/15 bg-white px-1.5 py-0.5 font-sans">↓</kbd>
                                    to navigate
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="rounded border border-green-900/15 bg-white px-1.5 py-0.5 font-sans">Enter</kbd>
                                    to open
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="rounded border border-green-900/15 bg-white px-1.5 py-0.5 font-sans">Esc</kbd>
                                    to close
                                </span>
                                {total > 0 ? (
                                    <span className="hidden font-semibold text-green-800 sm:inline">
                                        {total} result{total === 1 ? "" : "s"}
                                    </span>
                                ) : null}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}




