'use client'

import { useTransition } from 'react'
import { reopen } from '../actions'

export default function ReopenButton({ id, userEmail }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className="btn-primary"
      onClick={() => startTransition(() => reopen(id, userEmail))}
      disabled={isPending}
    >
      {isPending ? "Reopening..." : "Reopen Ticket"}
    </button>
  )
}
