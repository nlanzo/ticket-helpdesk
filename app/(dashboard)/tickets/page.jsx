import { Suspense } from "react";
import Link from "next/link";

//components
import TicketList from "./TicketList";
import Loading from "../loading";

export const metadata = {
  title: "Helpdesk | Tickets",
  description: "All open tickets",
};

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets:</small>
          </p>
        </div>
        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
