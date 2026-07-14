export default function ItemCardSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
            {/* Image Placeholder */}
            <div className="h-48 w-full bg-gray-200" />

            <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
            </div>
        </div>
    );
}