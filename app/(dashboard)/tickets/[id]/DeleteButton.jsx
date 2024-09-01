"use client";

import { useTransition } from "react";
import { deleteTicket } from "../actions";
import { TiDelete } from "react-icons/ti";

export default function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="btn-primary"
      onClick={() => startTransition(() => deleteTicket(id))}
      disabled={isPending}
    >
      <TiDelete />
      {isPending ? "Deleting..." : "Delete ticket"}
    </button>
  );
}
