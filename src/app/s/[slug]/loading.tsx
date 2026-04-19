export default function SessionLoading() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] animate-pulse">
      {/* Hero skeleton */}
      <div className="px-4 pt-10 pb-8 border-b border-[#2a2a2a]">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="h-4 w-20 bg-[#2a2a2a] rounded" />
          <div className="h-4 w-24 bg-[#FF7A00]/20 rounded" />
          <div className="h-12 w-3/4 bg-[#2a2a2a] rounded" />
          <div className="h-5 w-full bg-[#2a2a2a] rounded" />
          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 bg-[#2a2a2a] rounded-full" />
            <div className="h-4 w-32 bg-[#2a2a2a] rounded" />
          </div>
        </div>
      </div>

      {/* Infos skeleton */}
      <div className="px-4 pt-6 space-y-4 max-w-lg mx-auto">
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-[#2a2a2a] rounded w-3/4" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-[#2a2a2a] rounded w-1/2" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-[#2a2a2a] rounded w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
