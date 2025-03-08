export default function Loading() {
    return (
        <div className=" absolute z-50 min-h-screen min-w-full flex flex-col items-center justify-center bg-gray-50">
            <div className="flex space-x-2">
                <div className="w-6 h-6 bg-black rounded-full animate-bounce"></div>
                <div className="w-6 h-6 bg-black rounded-full animate-bounce delay-150"></div>
                <div className="w-6 h-6 bg-black rounded-full animate-bounce delay-300"></div>
            </div>
            <h2 className="mt-6 text-lg sm:text-2xl font-semibold text-black">Loading...</h2>
        </div>
    );
}
