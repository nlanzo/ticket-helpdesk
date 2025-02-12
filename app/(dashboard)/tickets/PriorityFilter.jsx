'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function PriorityFilter({ basePath = '/tickets' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const priorities = ['all', 'low', 'medium', 'high']
  const currentPriority = searchParams.get('priority') || 'all'
  
  const handlePriorityChange = (priority) => {
    const params = new URLSearchParams(searchParams)
    if (priority === 'all') {
      params.delete('priority')
    } else {
      params.set('priority', priority)
    }
    router.push(`${basePath}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 mb-4">
      <span className="text-sm text-gray-600">Priority:</span>
      <div className="flex gap-2">
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={() => handlePriorityChange(priority)}
            className={`px-3 py-1 text-sm rounded-full ${
              currentPriority === priority
                ? 'bg-slate-200 text-slate-800'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
