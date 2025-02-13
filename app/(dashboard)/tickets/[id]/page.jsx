import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import DeleteButton from "./DeleteButton";
import CloseButton from "./CloseButton";
import ReopenButton from "./ReopenButton";
import Link from "next/link";

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
        <div className="ml-auto flex gap-2">
          {data?.user && (
            <>
              {!ticket.closed && data.user.email === ticket.user_email && (
                <DeleteButton id={ticket.id} />
              )}
              {!ticket.closed && (
                <CloseButton id={ticket.id} userEmail={data.user.email} />
              )}
              {ticket.closed && (
                <ReopenButton id={ticket.id} userEmail={data.user.email} />
              )}
            </>
          )}
        </div>
      </nav>
      <div className="card">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3>{ticket.title}</h3>
            <small className="text-gray-500">Created by {ticket.user_email}</small>
            <p className="mb-4">{ticket.body}</p>
            {ticket.closed && ticket.closing_message && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Closing Message:</h4>
                <p className="text-gray-600">{ticket.closing_message}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-end space-x-3">
              {ticket.closed ? (
                <span className="text-sm text-gray-500">
                  closed {getDaysAgo(ticket.closed_at)} by {ticket.closed_by}
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  opened {getDaysAgo(ticket.created_at)}
                </span>
              )}
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </div>
            {ticket.closed && (
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">
                  opened {getDaysAgo(ticket.created_at)} by {ticket.user_email}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Link href="/tickets/closed" className="text-sm text-blue-500 hover:underline">
          View all closed tickets
        </Link>
      </div>
    </main>
  );
}
