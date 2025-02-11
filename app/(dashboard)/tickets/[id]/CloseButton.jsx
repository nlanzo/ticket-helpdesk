'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '../../../utils/supabase/client'

export default function CloseButton({ id, userEmail }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [closingMessage, setClosingMessage] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  
  const closeTicket = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const ticketId = typeof id === 'string' ? parseInt(id, 10) : id
      console.log('Attempting to close ticket:', { ticketId, userEmail })
      
      const supabase = createClient()
      
      const updateData = { 
        closed: true,
        closed_at: new Date().toISOString(),
        closed_by: userEmail,
        closing_message: closingMessage || null
      }
      console.log('Update data:', updateData)
      
      const { error: updateError } = await supabase
        .from('tickets')
        .update(updateData)
        .eq('id', ticketId)
      
      if (updateError) {
        throw updateError
      }
      
      setIsModalOpen(false)
      router.push('/tickets', { scroll: false })
    } catch (err) {
      console.error('Error closing ticket:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <button 
        className="btn-secondary"
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
      >
        {isLoading ? 'Closing...' : 'Close Ticket'}
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Close Ticket</h3>
            {error && (
              <div className="error mb-4 text-red-600">
                {error}
              </div>
            )}
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Add a closing message (optional)"
              value={closingMessage}
              onChange={(e) => setClosingMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn-secondary"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={closeTicket}
                disabled={isLoading}
              >
                {isLoading ? 'Closing...' : 'Close Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
