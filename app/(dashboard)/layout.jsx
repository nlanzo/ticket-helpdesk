import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

// components
import Navbar from "../components/Navbar";

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <Navbar user={data.user} />
      {children}
    </>
  );
}
