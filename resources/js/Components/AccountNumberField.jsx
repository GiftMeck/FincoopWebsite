import { useEffect, useRef, useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Account-number input with live verification against /accounts/verify.
 *
 * Registers itself with react-hook-form and, when the number does not
 * exist, sets a form error so form.trigger() / handleSubmit() reject it.
 *
 * Usage:
 *   <AccountNumberField form={form} name="account_number" label="Account No." />
 */
export default function AccountNumberField({
    form,
    name,
    label = "Account No.",
    placeholder = "Enter account number",
    onVerified,
    blockActiveLoan = false,
}) {
    const [status, setStatus] = useState("idle"); // idle | checking | valid | invalid
    const [message, setMessage] = useState("");
    const [account, setAccount] = useState(null);
    const debounceRef = useRef(null);
    const abortRef = useRef(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            abortRef.current?.abort();
        };
    }, []);

    const verify = useCallback(
        async (value) => {
            const trimmed = (value ?? "").trim();

            if (trimmed.length < 2) {
                setStatus("idle");
                setMessage("");
                setAccount(null);
                onVerified?.(false);
                form.clearErrors?.(name);
                return false;
            }

            setStatus("checking");
            setMessage("");

            try {
                abortRef.current?.abort();
                const controller = new AbortController();
                abortRef.current = controller;

                const res = await fetch(
                    `/accounts/verify?account_number=${encodeURIComponent(trimmed)}`,
                    {
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        signal: controller.signal,
                    }
                );

                // 404 = account does not exist
                if (res.status === 404) {
                    setStatus("invalid");
                    setMessage("This account number does not exist in our records.");
                    setAccount(null);
                    onVerified?.(false);
                    form.setError(name, {
                        type: "manual",
                        message: "This account number does not exist in our records.",
                    });
                    return false;
                }

                if (!res.ok) throw new Error("Verification failed");

                const data = await res.json();

                if (data.exists) {
                    // Loan form only: block if an active loan already exists.
                    if (blockActiveLoan && data.has_active_loan) {
                        setStatus("invalid");
                        setMessage("This account already has a loan application in progress.");
                        setAccount(null);
                        onVerified?.(false);
                        form.setError(name, {
                            type: "manual",
                            message: "This account already has a loan application in progress.",
                        });
                        return false;
                    }

                    setStatus("valid");
                    setMessage("Account verified.");
                    setAccount(data.account);
                    onVerified?.(true);
                    form.clearErrors(name);
                    return true;
                }

                setStatus("invalid");
                setMessage("This account number does not exist in our records.");
                setAccount(null);
                onVerified?.(false);
                form.setError(name, {
                    type: "manual",
                    message: "This account number does not exist in our records.",
                });
                return false;
            } catch (err) {
                if (err.name !== "AbortError") {
                    setStatus("idle");
                    setMessage("");
                    onVerified?.(false);
                }
                return false;
            }
        },
        [form, name, onVerified]
    );

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => {
                const handleChange = (value) => {
                    field.onChange(value);
                    setStatus("idle");
                    setMessage("");
                    setAccount(null);
                    onVerified?.(false);
                    // Clear any prior verification error while the user edits
                    form.clearErrors?.(name);

                    if (debounceRef.current) clearTimeout(debounceRef.current);
                    debounceRef.current = setTimeout(() => verify(value), 500);
                };

                return (
                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                        <FieldLabel
                            htmlFor={name}
                            className={cn(
                                "text-sm font-semibold",
                                fieldState.invalid ? "text-red-600" : "text-green-900"
                            )}
                        >
                            {label}
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                {...field}
                                id={name}
                                value={field.value ?? ""}
                                placeholder={placeholder}
                                aria-invalid={fieldState.invalid}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={() => {
                                    field.onBlur();
                                    verify(field.value);
                                }}
                                className={cn(
                                    "h-11 rounded-xl border bg-white shadow-sm transition-all duration-200 pr-10",
                                    fieldState.invalid
                                        ? "border-red-500 bg-red-50/30 text-red-900 placeholder:text-red-300 focus-visible:ring-red-500"
                                        : status === "valid"
                                        ? "border-green-600 focus-visible:border-green-700 focus-visible:ring-2 focus-visible:ring-green-700/20"
                                        : status === "invalid"
                                        ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20"
                                        : "border-gray-200 focus-visible:border-green-700 focus-visible:ring-2 focus-visible:ring-green-700/20"
                                )}
                            />

                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                {status === "checking" ? (
                                    <Loader2 className="size-4 animate-spin text-green-700" />
                                ) : status === "valid" ? (
                                    <CheckCircle2 className="size-5 text-green-600" />
                                ) : status === "invalid" ? (
                                    <AlertCircle className="size-5 text-red-500" />
                                ) : null}
                            </span>
                        </div>

                        {fieldState.invalid && fieldState.error ? (
                            <div className="flex items-start gap-2 text-sm font-medium text-red-600">
                                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                                <FieldError errors={[fieldState.error]} />
                            </div>
                        ) : status === "valid" && account ? (
                            <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800">
                                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-green-600" />
                                <div>
                                    <p className="font-semibold">
                                        Verified: {account.full_name || account.account_number}
                                    </p>
                                    {account.membership_status || account.account_status ? (
                                        <p className="text-green-700/80">
                                            {[account.membership_status, account.account_status]
                                                .filter(Boolean)
                                                .join(" • ")}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ) : status === "invalid" && message ? (
                            <div className="flex items-start gap-2 text-sm font-medium text-red-600">
                                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                                <span>{message}</span>
                            </div>
                        ) : null}
                    </Field>
                );
            }}
        />
    );
}