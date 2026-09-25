import {usePage, useForm, Link} from '@inertiajs/react';
import { useState, useEffect } from 'react';
export default function Edit({faq, onUpdate}) {
    const users = usePage().props.users;
    const customers = usePage().props.customers;
      const {
            data,
            setData,
            post,
            processing,
            errors,
        } = useForm({
            faq_question: '',
            faq_answer: '',
            question_owner_id: null,
            answer_owner_id: null,
            demo_photo: null,
            _method: "PUT",
        });
    
        useEffect(() => {
            if (faq) {
                setData({
                    faq_question: faq.faq_question,
                    faq_answer: faq.faq_answer,
                    question_owner_id: faq.question_owner_id,
                    answer_owner_id: faq.answer_owner_id,
                    demo_photo: faq.demo_photo,
                    _method: "PUT",
                });
            }
        }, [faq]);
    
        const submit = (e) => {
            e.preventDefault();
    
            if (!faq) {
                return;
            }
    
            post(route("faqs.update", faq.faq_id), {
                forceFormData: true,
                onSuccess: (page) => {
                    onUpdate(page.props.faqs);
                }
            });
        };
    
        if (!faq) {
            return (
                <div className="bg-gray-100 rounded shadow-md p-8">
                    <h1 className="text-xl font-semibold mb-4">
                        Edit Frequently Asked Questions
                    </h1>
    
                    <p className="text-gray-500">
                        Select a Frequently Asked Question from the list to edit it.
                    </p>
                </div>
            );
        }
    return(
        <div className="bg-gray-100 rounded shadow-md p-8">
            <div className="text-xl mb-6">
                <h1 className="text-xl text-center font-semibold mb-4">Create Frequently Asked Questions</h1>
                <form onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <label>Question</label>
                        <textarea
                            type="text"
                            value={data.faq_question}
                            onChange={(e) => setData('faq_question', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.faq_question && <div>{errors.faq_question}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Answer</label>
                        <textarea
                            value={data.faq_answer}
                            onChange={(e) => setData('faq_answer', e.target.value)}
                            className="border rounded p-2"
                        />
                        {errors.faq_answer && <div>{errors.faq_answer}</div>}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Question Owner</label>

                        <select
                            onChange={(e) => setData('question_owner_id', e.target.value)}
                        >
                            <option value="">Select Question Owner</option>

                            {customers && (customers.data.map((customer) => (
                                <option key={customer.customer_id} value={customer.customer_id}>
                                    {customer.customer_name}
                                </option>
                            )))}
                        </select>

                        {errors.customer_id && (
                            <div className="text-red-500">
                                {errors.customer.customer_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Question Responder</label>

                        <select
                            onChange={(e) => setData('answer_owner_id', e.target.value)}
                        >
                            <option value="">Select Question Responder</option>

                            {users && (users.data.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            )))}
                        </select>

                        {errors.answer_owner_id && (
                            <div className="text-red-500">
                                {errors.answer_owner_id}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label>Demo Photo</label>
                        <input
                            type="file"
                            onChange={(e) => setData('demo_photo', e.target.files[0])}
                        />
                        {errors.demo_photo && <div>{errors.demo_photo}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            w-full
                            bg-green-700
                            hover:bg-green-800
                            text-white
                            rounded
                            p-2
                        "
                    >
                        {processing
                            ? "Updating..."
                            : "Update Service"}
                    </button>
                </form>
            </div>
        </div>
    )
}