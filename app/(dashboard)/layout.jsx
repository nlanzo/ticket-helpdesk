import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import Navbar from "../components/Navbar";

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
