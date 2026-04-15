export default function SessionLoading() {
  return (
    <main className="min-h-screen bg-white animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gray-950 px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="h-6 w-28 bg-gray-800 rounded-full" />
          <div className="h-10 w-3/4 bg-gray-800 rounded-xl" />
          <div className="h-6 w-full bg-gray-800 rounded-xl" />
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 bg-gray-800 rounded-full" />
            <div className="h-5 w-32 bg-gray-800 rounded" />
          </div>
        </div>
      </div>

      {/* Infos skeleton */}
      <div className="page-container pt-6 space-y-4">
        <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded w-3/4" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
