import NavBar from "@/Layouts/NavBar";
import Footer from "@/Layouts/Footer";
import Create from "./Create";
import { usePage, Link } from "@inertiajs/react";
export default function CustomersPublic({customers=[]}) {
    return(
        <>
            <NavBar />
            <div className="container bg-gray-100 p-4">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white rounded-3xl">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-6 flex flex-col p-8 items-start justify-center">
                            <div className="p-8">
                                <span className="mb-4 inline-block tracking-widest rounded-full text-green-900 bg-green-900/10 px-4 py-2 text-xl font-semibold backdrop-blur-md">
                                    Register With Fincoop
                                </span>
                                <p className="text-gray-500">
                                    FINCOOP is a digital financial services platform that provides a range of financial products and services to customers. Our platform is designed to make it easy for customers to manage their finances and access the financial services they need.
                                </p>
                                <div className="w-[100px] h-[4px] bg-orange-500/70 mt-4 rounded-s-full"></div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <Create />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}