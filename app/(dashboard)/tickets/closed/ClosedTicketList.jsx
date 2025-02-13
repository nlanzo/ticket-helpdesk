'use client';

import { getDaysAgo } from '../utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ClosedTicketList({ initialTickets, searchParams }) {
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
      const aDate = new Date(a.closed_at);
      const bDate = new Date(b.closed_at);
      return searchParams?.sort === 'oldest' 
        ? aDate - bDate 
        : bDate - aDate;
    });

    setTickets(filteredTickets);
  }, [initialTickets, searchParams?.priority, searchParams?.sort]);
  
  return (
    <div className="mb-8">
      {tickets.map((ticket) => (
        <Link href={`/tickets/${ticket.id}`} key={ticket.id} className="block">
          <div className="card my-5 hover:shadow-lg transition-shadow duration-200">
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
        </Link>
      ))}
      {tickets.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No closed tickets found</p>
      )}
    </div>
  );
}
