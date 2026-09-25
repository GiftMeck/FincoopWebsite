import {
    Field,
    FieldError,
    FieldLabel,
} from "@/Components/ui/field";
import {
    Checkbox,
} from "@/Components/ui/checkbox";
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

export default function CheckboxField({
    Controller,
    form,
    name,
    label,
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
                    orientation="horizontal"

                    data-invalid={
                        fieldState.invalid
                    }

                    className={`
                        rounded-xl
                        border
                        p-4
                        transition-all
                        duration-200

                        ${
                            fieldState.invalid
                                ? `
                                    border-red-300
                                    bg-red-50
                                `
                                : `
                                    border-gray-200
                                    bg-gray-50
                                    hover:border-green-200
                                    hover:bg-green-50/50
                                `
                        }
                    `}
                >

                    <Checkbox
                        id={name}

                        checked={
                            field.value
                        }

                        onCheckedChange={
                            field.onChange
                        }

                        aria-invalid={
                            fieldState.invalid
                        }

                        className="
                            data-[state=checked]:border-green-800
                            data-[state=checked]:bg-green-800
                        "
                    />


                    <FieldLabel
                        htmlFor={name}

                        className={`
                            cursor-pointer
                            text-sm
                            leading-6

                            ${
                                fieldState.invalid
                                    ? "text-red-700"
                                    : "text-gray-600"
                            }
                        `}
                    >

                        {label}

                    </FieldLabel>


                    {fieldState.invalid && (

                        <div className="
                            ml-2
                            flex
                            items-center
                            text-red-600
                        ">

                            <AlertCircle
                                className="size-4"
                            />

                        </div>

                    )}

                </Field>

            )}
        />

    );

}