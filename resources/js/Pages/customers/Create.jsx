import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useForm as useReactHookForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import { Button } from "@/Components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Create({containerStyles='', subContainerStyles=''}) {
    const customerSchema = z.object({
        customer_name: z.string().min(3, 'Too short').regex(/^[a-zA-Z\s]+$/, {
            message: 'Not allowed'
        }).refine(values=>!/<script|<?php|SELECT|DROP/i.test(values), {message: 'Suspecious content detected'}),
        customer_email: z.email({
            message: 'Not allowed'
        }).max(255, 'Not allowed'),
        customer_phone: z.string().min(8, "Please enter a valid phone number"),
        customer_message: z.string().min(3, 'Too short').regex(/^[a-zA-Z\s]+$/, {
            message: 'Not allowed'
        }).refine(values=>!/<script|<?php|SELECT|DROP/i.test(values), {message: 'Suspecious content detected'})

    })
    const customerReactHookForm = useReactHookForm({
        resolver: zodResolver(customerSchema),
        mode: 'onChange'
    })
    const inertiaForm = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_message: '',
    });
    const [processing, setProcessing] = useState(false);
    const submitApplication = (values) => {
            setProcessing(true);
    
            inertiaForm.transform(() => {
                return{
                ...values
                }
            });
    
            inertiaForm.post(
                route("customers.store"),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        customerReactHookForm.reset();
                        inertiaForm.reset();
                    },
                    onError: (errors) => {
                        alert('Error:', errors);
                    },
                    onFinish: () => setProcessing(false),
                }
            );
        };
    const [Error, setError] = useState(null);

    return (
        <div className={containerStyles}>
            <div className={subContainerStyles}>
                <form onSubmit={customerReactHookForm.handleSubmit(submitApplication)} className="text-gray-600 pt-4">
                    <div 
                        className="mb-4 flex flex-col bg-gradient-to-br
                    ">
                        <TextField
                            Controller={Controller}
                            form={customerReactHookForm}
                            name="customer_name"
                            label="Full Name"
                            placeholder="Enter full name"
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <TextField
                            Controller={Controller}
                            form={customerReactHookForm}
                            name="customer_email"
                            label="Email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <TextField
                            Controller={Controller}
                            form={customerReactHookForm}
                            name="customer_phone"
                            label="Phone Number"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <TextareaField
                            Controller={Controller}
                            form={customerReactHookForm}
                            name="customer_message"
                            label="Message"
                            placeholder="Enter your message"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={processing || inertiaForm.processing}
                        className="
                            h-12
                            rounded-xl
                            bg-gradient-to-r
                            from-green-800
                            to-green-900
                            px-7
                            font-bold
                            text-white
                            shadow-lg
                            shadow-green-900/20
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-xl
                            hover:shadow-green-900/30
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {processing || inertiaForm.processing
                            ? "Processing..."
                            : "Send"
                        }
                        {!processing && !inertiaForm.processing && (
                            <CheckCircle2 className="ml-2 size-5" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
} 