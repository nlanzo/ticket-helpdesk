import { Span } from "next/dist/trace";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }) {
  return (
    <nav>
      <Image
        src={"/logo.png"}
        width={70}
        height={35}
        alt="Helpdesk Logo"
        quality={100}
      />
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      {user && <span>Hello, {user.email}</span>}
      <LogoutButton />
    </nav>
  );
}
