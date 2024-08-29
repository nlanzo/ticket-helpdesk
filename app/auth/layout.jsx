import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/");
  }

  return (
    <>
      <nav>
        <h1>Helpdesk</h1>
        <Link href="/auth/signup">Sign up</Link>
        <Link href="/auth/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
