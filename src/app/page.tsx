
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 p-6 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Welcome to Our Inventory System
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Manage your products with ease. A clean, fast, and reliable solution
        for tracking your inventory efficiently.
      </p>
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
        <button className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
          View Demo
        </button>
      </div>
    </div>
  );
}