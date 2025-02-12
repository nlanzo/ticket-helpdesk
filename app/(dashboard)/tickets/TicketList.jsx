import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import { getDaysAgo } from './utils';

async function getTickets(priority, sort = 'newest') {
  const supabase = createClient();
  let query = supabase
    .from("tickets")
    .select()
    .eq('closed', false)
    .order('created_at', { ascending: sort === 'oldest' });

  if (priority && priority !== 'all') {
    query = query.eq('priority', priority);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error.message);
  }
  return data;
}

export default async function TicketList({ searchParams }) {
  const tickets = await getTickets(
    searchParams?.priority,
    searchParams?.sort || 'newest'
  );
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h3>{ticket.title}</h3>
                <p className="mb-4">{ticket.body.slice(0, 200)}...</p>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <span className="text-sm text-gray-500">
                  opened {getDaysAgo(ticket.created_at)}
                </span>
                <div className={`pill ${ticket.priority}`}>
                  {ticket.priority} priority
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets 😁</p>
      )}
    </>
  );
}
