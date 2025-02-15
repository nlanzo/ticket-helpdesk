'use client';

import { getDaysAgo } from '../utils'
import TicketListItem from '../../../components/TicketListItem'
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
        <TicketListItem key={ticket.id} ticket={ticket} isClosed={true} />
      ))}
      {tickets.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No closed tickets found</p>
      )}
    </div>
  );
}
