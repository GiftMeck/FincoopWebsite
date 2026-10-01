import NavBar from "@/Layouts/NavBar";
import { usePage, Link } from "@inertiajs/react";
export default function Index({branches, onEdit}) {
    return (
        <>
            <div className="h-full bg-gray-100 shadow-md w-full flex flex-col border p-4">
                <h1 className="text-xl text-center font-semibold mb-4">FINCOOP Branches</h1>
                {branches && branches.map((branch) =>(
                    <div key={branch.branch_id}
                        className="flex justify-between bg-white p-4 border-2 border-gray-300 rounded-lg"
                    >
                        <div>
                            <span>{branch.branch_name}</span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onEdit(branch)}
                            >
                                <span className="text-white mx-2 bg-blue-500 rounded-lg p-2">Edit</span>
                            </button>
                            <button
                                
                            >
                                <span className="text-white mx-2 bg-red-500 rounded-lg p-2">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
