import Index from './Index';
import { usePage } from '@inertiajs/react';
export default function CustomersDashboard() {
    const {customers} = usePage().props;
    const containerStyles = "p-6 flex justify-center items-center";
    const subContainerStyles = "bg-gray-100 rounded shadow-md p-8 flex flex-col w-full max-w-md";
    return(
        <div className="container">
            <div className="row bg-white">
                <div className="grid grid-cols-1 gap-4">
                    <Index customers={customers} />
                </div>
            </div>
        </div>
    )
}