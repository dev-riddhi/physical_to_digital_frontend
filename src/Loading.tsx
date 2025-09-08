export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center text-white">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="mt-6 text-lg font-semibold tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
