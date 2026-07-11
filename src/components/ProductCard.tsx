
export default function ProductCard() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
            <img
                src="https://via.placeholder.com/300x200"
                alt="Product"
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Product Title</h3>
            <p className="text-gray-600 text-sm mb-2">Short description goes here.</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-blue-600 font-bold">$99.00</span>
                <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700">
                    View Details
                </button>
            </div>
        </div>
    );
}