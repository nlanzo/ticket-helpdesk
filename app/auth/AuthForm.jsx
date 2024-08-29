"use client";

import { useState } from "react";

export default function AuthForm({ handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <label htmlFor="email">
        <span>Email:</span>
        <input
          id="email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label htmlFor="password">
        <span>Password:</span>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <button formAction={handleSubmit} className="btn-primary">
        Submit
      </button>
    </form>
  );
}
