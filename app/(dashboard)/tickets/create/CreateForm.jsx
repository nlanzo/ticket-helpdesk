"use client";

import { useState } from "react";
import { addTicket } from "../actions";

export default function CreateForm() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="w-1/2" action={addTicket}>
      <label>
        <span>Title:</span>
        <input name="title" type="text" required />
      </label>
      <label>
        <span>Body:</span>
        <textarea name="body" required></textarea>
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority">
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
      </button>
    </form>
  );
}
