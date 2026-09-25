import {
    Field,
    FieldError,
    FieldLabel,
} from "@/Components/ui/field";

import {
    Textarea,
} from "@/Components/ui/textarea";
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

export default function TextareaField({
    Controller,
    form,
    name,
    label,
    placeholder,
}) {

    return (

        <Controller
            name={name}
            control={form.control}

            render={({
                field,
                fieldState,
            }) => (

                <Field
                    data-invalid={
                        fieldState.invalid
                    }

                    className="space-y-2"
                >

                    <FieldLabel
                        htmlFor={name}
                        className={`
                            text-sm
                            font-semibold
                            ${
                                fieldState.invalid
                                    ? "text-red-600"
                                    : "text-green-900"
                            }
                        `}
                    >
                        {label}
                    </FieldLabel>


                    <Textarea
                        {...field}

                        id={name}

                        placeholder={placeholder}

                        aria-invalid={
                            fieldState.invalid
                        }

                        value={
                            field.value ?? ""
                        }

                        className={`
                            min-h-[130px]
                            rounded-xl
                            border
                            bg-white
                            shadow-sm
                            transition-all
                            duration-200
                            resize-none

                            ${
                                fieldState.invalid
                                    ? `
                                        border-red-500
                                        bg-red-50/30
                                        focus-visible:ring-red-500
                                    `
                                    : `
                                        border-gray-200
                                        focus-visible:border-green-700
                                        focus-visible:ring-2
                                        focus-visible:ring-green-700/20
                                    `
                            }
                        `}
                    />


                    {fieldState.invalid && (

                        <div className="
                            flex
                            items-start
                            gap-2
                            text-sm
                            font-medium
                            text-red-600
                        ">

                            <AlertCircle
                                className="
                                    mt-0.5
                                    size-4
                                    shrink-0
                                "
                            />

                            <FieldError
                                errors={[
                                    fieldState.error,
                                ]}
                            />

                        </div>

                    )}

                </Field>

            )}
        />

    );

}

