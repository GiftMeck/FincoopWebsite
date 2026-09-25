import {
    Field,
    FieldError,
    FieldLabel,
} from "@/Components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
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

export default function SelectField({
    Controller,
    form,
    name,
    label,
    placeholder,
    options,
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

                    className="space-y-2 relative"
                >

                    <FieldLabel
                        className={`
                            text-sm
                            font-semibold
                            ${fieldState.invalid
                                ? "text-red-600"
                                : "text-green-900"
                            }
                        `}
                    >
                        {label}
                    </FieldLabel>


                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >

                        <SelectTrigger
                            aria-invalid={
                                fieldState.invalid
                            }

                            className={`
                                h-11
                                rounded-xl
                                bg-white
                                shadow-sm
                                transition-all
                                w-full

                                ${fieldState.invalid
                                    ? `
                                        border-red-500
                                        bg-red-50/30
                                        focus:ring-red-500
                                    `
                                    : `
                                        border-gray-200
                                        focus:border-green-700
                                        focus:ring-green-700/20
                                    `
                                }
                            `}
                        >

                            <SelectValue
                                placeholder={
                                    placeholder
                                }
                            />

                        </SelectTrigger>


                        <SelectContent
                            className="
                                z-50
                                bg-white
                                border
                                border-gray-200
                                rounded-xl
                                shadow-lg
                                max-h-[300px]
                                overflow-y-auto
                                min-w-[200px]
                                relative
                            "
                            position="popper"
                            sideOffset={5}
                            align="start"
                        >

                            {options.map(
                                (option) => (

                                    <SelectItem
                                        key={
                                            option.value
                                        }

                                        value={
                                            option.value
                                        }

                                        className="
                                            cursor-pointer
                                            hover:bg-green-50
                                            py-2.5
                                            px-4
                                            transition-colors
                                            duration-150
                                            focus:bg-green-50
                                            data-[highlighted]:bg-green-50
                                        "
                                    >

                                        {
                                            option.label
                                        }

                                    </SelectItem>

                                )
                            )}

                        </SelectContent>

                    </Select>


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