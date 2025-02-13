'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { getDaysAgo } from './utils';

export default function TicketList({ initialTickets, searchParams }) {
  const [tickets, setTickets] = useState(initialTickets);

  useEffect(() => {
    let filteredTickets = [...initialTickets];
    
    // Apply priority filter
    if (searchParams?.priority && searchParams.priority !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.priority === searchParams.priority
      );
    }

    // Apply sort
    filteredTickets.sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      return searchParams?.sort === 'oldest' 
        ? aDate - bDate 
        : bDate - aDate;
    });

    setTickets(filteredTickets);
  }, [initialTickets, searchParams?.priority, searchParams?.sort]);

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
