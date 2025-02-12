'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SortOrderFilter({ basePath = '/tickets' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentSort = searchParams.get('sort') || 'newest'
  
  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.push(`${basePath}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 mb-4">
      <span className="text-sm text-gray-600">Sort by:</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange('newest')}
          className={`px-3 py-1 text-sm rounded-full ${
            currentSort === 'newest'
              ? 'bg-slate-200 text-slate-800'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Newest first
        </button>
        <button
          onClick={() => handleSortChange('oldest')}
          className={`px-3 py-1 text-sm rounded-full ${
            currentSort === 'oldest'
              ? 'bg-slate-200 text-slate-800'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Oldest first
        </button>
      </div>
    </div>
  )
}
