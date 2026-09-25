import { useForm, usePage, Link } from "@inertiajs/react";
export default function Create() {
    const users = usePage().props.users;
    const customers = usePage().props.customers;
    const { data, setData, post, processing, errors } = useForm({
        faq_question: '',
        faq_answer: '',
        question_owner_id: null,
        answer_owner_id: null,
        demo_photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('faqs.store', {ActionSource: false}));
    };

    return (
        <div className="h-full w-full bg-gray-100 border p-4 flex justify-center shadow-md items-center">
            <div className="rounded px-4 flex flex-col w-full max-w-md">
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
                    <button className="bg-green-700 text-white rounded p-2" type="submit" disabled={processing}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}