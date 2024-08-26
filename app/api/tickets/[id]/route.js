import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const id = params.id;
  const response = await fetch(`http://localhost:4000/tickets/${id}`);

  if (!response.ok) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const ticket = await response.json();

  return NextResponse.json(ticket, { status: 200 });
}
