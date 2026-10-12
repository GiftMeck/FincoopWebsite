import { useState } from "react";
import { usePage, Link, useForm, router } from "@inertiajs/react";
import {
    Upload,
    Download,
    Search,
    Trash2,
    FileSpreadsheet,
    ShieldCheck,
    Database,
} from "lucide-react";

export default function Index() {
    const { accounts, filters, stats, flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search ?? "");
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
        mode: "append",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("accounts.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const doSearch = (e) => {
        e.preventDefault();
        router.get(
            route("accounts.index"),
            { search },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const doDelete = (id) => {
        if (!confirm("Delete this account record?")) return;
        router.delete(route("accounts.destroy", id), { preserveScroll: true });
    };

    return (
        <div className="space-y-6">
            {flash?.success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    {flash.error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard icon={Database} label="Total Accounts" value={stats?.total ?? 0} />
                <StatCard icon={ShieldCheck} label="Active Accounts" value={stats?.active ?? 0} />
                <StatCard icon={FileSpreadsheet} label="Members" value={stats?.members ?? 0} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-green-900/10 bg-white p-5 shadow-sm">
                        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-green-900">
                            <Upload className="size-5 text-green-700" />
                            Upload Accounts
                        </h2>
                        <p className="mb-4 text-xs text-green-900/60">
                            Import member data from an Excel (.xlsx) or CSV file. The
                            <span className="font-semibold"> "Base No" </span>
                            column is used as the account number for loan &amp; KYC
                            validation.
                        </p>

                        <a
                            href={route("accounts.template")}
                            className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-green-700 hover:text-green-900"
                        >
                            <Download className="size-4" />
                            Download CSV template
                        </a>

                        <form onSubmit={submit} className="space-y-3">
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-green-900">
                                    Spreadsheet file
                                </label>
                                <input
                                    type="file"
                                    accept=".csv,.txt,.xlsx"
                                    onChange={(e) => setData("file", e.target.files[0])}
                                    className="block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-green-700 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-green-800"
                                />
                                {errors.file && (
                                    <p className="mt-1 text-xs font-medium text-red-600">
                                        {errors.file}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-semibold text-green-900">
                                    Import mode
                                </label>
                                <select
                                    value={data.mode}
                                    onChange={(e) => setData("mode", e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-green-700 focus:ring-1 focus:ring-green-700"
                                >
                                    <option value="append">Append / update existing</option>
                                    <option value="replace">Replace all existing data</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={processing || !data.file}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    "Uploading…"
                                ) : (
                                    <>
                                        <Upload className="size-4" />
                                        Upload &amp; Import
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-green-900/10 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-lg font-bold text-green-900">
                                Imported Accounts
                            </h2>
                            <form onSubmit={doSearch} className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-green-900/40" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search accounts…"
                                        className="h-9 rounded-lg border border-gray-200 pl-8 pr-3 text-sm focus:border-green-700 focus:ring-1 focus:ring-green-700"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-800"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-green-900/70">
                                        <th className="border-b p-3">Base No</th>
                                        <th className="border-b p-3">Full Name</th>
                                        <th className="border-b p-3">Branch</th>
                                        <th className="border-b p-3">Mobile</th>
                                        <th className="border-b p-3">Membership</th>
                                        <th className="border-b p-3">Status</th>
                                        <th className="border-b p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.data.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-green-900/50">
                                                No accounts imported yet. Upload a
                                                spreadsheet to get started.
                                            </td>
                                        </tr>
                                    )}
                                    {accounts.data.map((account) => (
                                        <tr
                                            key={account.id}
                                            className="border-b border-slate-100 hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-semibold text-green-900">
                                                {account.account_number}
                                            </td>
                                            <td className="p-3">{account.full_name}</td>
                                            <td className="p-3">{account.branch}</td>
                                            <td className="p-3">{account.mobile}</td>
                                            <td className="p-3">
                                                <StatusPill value={account.membership_status} />
                                            </td>
                                            <td className="p-3">
                                                <StatusPill value={account.account_status} />
                                            </td>
                                            <td className="p-3 text-right">
                                                <button
                                                    onClick={() => doDelete(account.id)}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1">
                            {accounts?.links?.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? "#"}
                                    preserveScroll
                                    preserveState
                                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                                        link.active
                                            ? "bg-green-700 text-white"
                                            : "bg-white text-green-900 hover:bg-green-100"
                                    } ${!link.url ? "pointer-events-none opacity-40" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-green-900/10 bg-white p-4 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <Icon className="size-5" />
            </span>
            <div>
                <p className="text-xs font-medium uppercase tracking-wider text-green-900/50">
                    {label}
                </p>
                <p className="text-xl font-bold text-green-900">{value}</p>
            </div>
        </div>
    );
}

function StatusPill({ value }) {
    if (!value) return <span className="text-green-900/30">—</span>;
    const v = String(value).toLowerCase();
    const tone =
        v === "active" || v === "member" || v === "verified"
            ? "bg-green-100 text-green-800"
            : v === "inactive" || v === "closed" || v === "suspended"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700";
    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${tone}`}>
            {value}
        </span>
    );
}

