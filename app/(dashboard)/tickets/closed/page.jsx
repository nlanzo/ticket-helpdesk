import { createClient } from '../../../utils/supabase/server'
import { Suspense } from 'react'
import PriorityFilter from '../PriorityFilter'
import SortOrderFilter from '../SortOrderFilter'
import ClosedTicketList from './ClosedTicketList'

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

async function getClosedTickets(priority, sort) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tickets')
    .select()
    .eq('closed', true)
    .order('closed_at', { ascending: false })
    .eq('priority', priority)
    .order('closed_at', { ascending: sort === 'asc' })
  
  if (error) {
    console.log(error.message)
  }
  
  return data
}

export const metadata = {
  title: 'Helpdesk | Closed Tickets',
  description: 'View all closed tickets',
}

export default async function ClosedTickets({ searchParams }) {
  const tickets = await getClosedTickets(searchParams?.priority, searchParams?.sort)
  
  return (
    <main>
      <nav>
        <h2>Closed Tickets</h2>
      </nav>
      
      <div className="flex justify-between items-center mb-4">
        <PriorityFilter basePath="/tickets/closed" />
        <SortOrderFilter basePath="/tickets/closed" />
      </div>

      <Suspense fallback={<div className="loading">Loading tickets...</div>}>
        <ClosedTicketList searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
