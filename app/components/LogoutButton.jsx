"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/auth/login");
    }
    if (error) {
      console.log("Logout error: " + error.message);
    }
  };
  return (
    <button className="btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
}
