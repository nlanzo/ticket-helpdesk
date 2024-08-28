import Link from "next/link";
import { createClient } from "../../utils/supabase/server";

async function getTickets() {
  const supabase = createClient();
  const { data, error } = await supabase.from("tickets").select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p clasName="text-center">There are no open tickets 😁</p>
      )}
    </>
  );
}
