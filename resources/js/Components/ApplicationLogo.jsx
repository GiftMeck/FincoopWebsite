export default function ApplicationLogo(props) {
    return (
        <div className="flex flex-col items-center">
            <img
            src="/Images/FinLogo.png"
            alt="Application Logo"
            className="block h-9 w-auto fill-current text-gray-800"
            {...props}
            />
        </div>
    );
}
