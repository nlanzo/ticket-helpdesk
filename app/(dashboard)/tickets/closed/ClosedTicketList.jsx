import { createClient } from '../../../utils/supabase/server'
import { getDaysAgo } from '../utils'

async function getClosedTickets(priority, sort = 'newest') {
  const supabase = createClient()
  let query = supabase
    .from('tickets')
    .select()
    .eq('closed', true)
    .order('closed_at', { ascending: sort === 'oldest' })
  
  if (priority && priority !== 'all') {
    query = query.eq('priority', priority)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.log(error.message)
  }
  
  return data
}

export default async function ClosedTicketList({ searchParams }) {
  const priority = searchParams?.priority || 'all'
  const sort = searchParams?.sort || 'newest'
  const tickets = await getClosedTickets(priority, sort)
  
  return (
    <div className="mb-8">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <h3>{ticket.title}</h3>
              <p className="mb-4">{ticket.body.slice(0, 200)}...</p>
              {ticket.closing_message && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Closing Message:
                  </h4>
                  <p className="text-gray-600">{ticket.closing_message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end space-x-3">
                <span className="text-sm text-gray-500">
                  closed {getDaysAgo(ticket.closed_at)}
                </span>
                <div className={`pill ${ticket.priority}`}>
                  {ticket.priority} priority
                </div>
              </div>
              <div className="text-sm text-gray-500 text-right">
                closed by {ticket.closed_by}
              </div>
            </div>
          </div>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No closed tickets found</p>
      )}
    </div>
  )
}
