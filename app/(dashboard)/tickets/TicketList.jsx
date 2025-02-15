'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { getDaysAgo } from './utils';
import TicketListItem from "../../components/TicketListItem";

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
        <TicketListItem key={ticket.id} ticket={ticket} />
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets 😁</p>
      )}
    </>
  );
}
