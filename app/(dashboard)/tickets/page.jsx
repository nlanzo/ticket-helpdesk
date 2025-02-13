import { Suspense } from "react";
import Link from "next/link";

//components
import TicketList from "./TicketList";
import PriorityFilter from "./PriorityFilter";
import SortOrderFilter from "./SortOrderFilter";
import { createClient } from "../../utils/supabase/server";

async function getTicketCounts() {
  const supabase = createClient();
  
  const [openTickets, closedTickets] = await Promise.all([
    supabase.from("tickets").select("id", { count: 'exact' }).eq('closed', false),
    supabase.from("tickets").select("id", { count: 'exact' }).eq('closed', true)
  ]);

  return {
    open: openTickets.count || 0,
    closed: closedTickets.count || 0
  };
}

async function getInitialTickets() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select()
    .eq('closed', false);

  if (error) {
    console.log(error.message);
    return [];
  }
  return data;
}

export const metadata = {
  title: "Helpdesk | Tickets",
  description: "All open tickets",
};

export default async function Tickets({ searchParams }) {
  const [counts, initialTickets] = await Promise.all([
    getTicketCounts(),
    getInitialTickets()
  ]);
  
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p className="text-sm text-gray-500">
            {counts.open} open · {counts.closed} closed
          </p>
        </div>
        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>
      <div className="flex justify-between items-center mb-4">
        <PriorityFilter />
        <SortOrderFilter />
      </div>
      <Suspense fallback={<div className="loading">Loading tickets...</div>}>
        <TicketList 
          initialTickets={initialTickets} 
          searchParams={{ priority: searchParams?.priority, sort: searchParams?.sort }} 
        />
      </Suspense>
    </main>
  );
}
