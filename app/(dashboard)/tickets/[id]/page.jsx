import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const supabase = createClient();

  const { data: ticket } = await supabase
    .from("tickets")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `Helpdesk | ${ticket?.title || "Ticket not found"}`,
  };
}

async function getTicket(id) {
  const supabase = createClient();

  const { data } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }
  return data;
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data?.user && data.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
