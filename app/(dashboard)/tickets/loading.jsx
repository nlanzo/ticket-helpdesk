export default function Loading() {
  return (
    <main className="p-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="w-24 h-8 bg-gray-200 animate-pulse rounded"></h2>
        <div className="ml-auto w-32 h-10 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="flex gap-4 mb-8">
        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map(n => (
          <div key={n} className="card animate-pulse">
            <div className="flex gap-2 items-start">
              <div className="w-3/4 space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="ml-auto w-20 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
