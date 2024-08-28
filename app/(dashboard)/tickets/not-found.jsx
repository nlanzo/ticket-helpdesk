import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">Uh oh...</h2>
      <p>Unable to find the ticket you were looking for.</p>
      <p>
        Go back to <Link href="/tickets">all tickets</Link>
      </p>
    </main>
  );
}
