'use client';

import Link from 'next/link';
import { getDaysAgo } from '../(dashboard)/tickets/utils';

export default function TicketListItem({ ticket, isClosed = false }) {
  return (
    <Link href={`/tickets/${ticket.id}`} className="block">
      <div className="card my-5 hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3>{ticket.title}</h3>
            <p className="mb-4">{ticket.body.slice(0, 200)}...</p>
            {isClosed && ticket.closing_message && (
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
                {isClosed ? 'closed' : 'opened'} {getDaysAgo(isClosed ? ticket.closed_at : ticket.created_at)}
              </span>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </div>
            {isClosed && (
              <div className="text-sm text-gray-500 text-right">
                closed by {ticket.closed_by}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
