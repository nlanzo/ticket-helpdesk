"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("tickets").insert([
    {
      ...ticket,
      user_email: user.email,
    },
  ]);
  revalidatePath("/tickets");
  redirect("/tickets");
}
