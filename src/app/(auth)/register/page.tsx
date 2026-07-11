
export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 rounded" />
                    <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
                    <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded" />
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
                </form>
            </div>
        </div>
    );
}