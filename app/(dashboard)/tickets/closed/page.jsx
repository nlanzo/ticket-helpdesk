import { createClient } from '../../../utils/supabase/server'

function getDaysAgo(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  
  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }
  
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }
  
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
}

async function getClosedTickets() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tickets')
    .select()
    .eq('closed', true)
    .order('closed_at', { ascending: false })
  
  if (error) {
    console.log(error.message)
  }
  
  return data
}

export default async function ClosedTickets() {
  const tickets = await getClosedTickets()
  
  return (
    <main>
      <nav>
        <h2>Closed Tickets</h2>
      </nav>
      
      <div className="mb-8">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="card my-5">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h3>{ticket.title}</h3>
                <p className="mb-4">{ticket.body.slice(0, 200)}...</p>
                {ticket.closing_message && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Closing Message:</h4>
                    <p className="text-gray-600">{ticket.closing_message}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-end space-x-3">
                  <span className="text-sm text-gray-500">
                    closed {getDaysAgo(ticket.closed_at)} by {ticket.closed_by}
                  </span>
                  <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="text-sm text-gray-500">
                    opened {getDaysAgo(ticket.created_at)} by {ticket.user_email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {tickets.length === 0 && (
          <p className="text-center">No closed tickets yet</p>
        )}
      </div>
    </main>
  )
}
