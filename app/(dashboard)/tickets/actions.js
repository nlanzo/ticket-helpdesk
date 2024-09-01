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

  const { error } = await supabase.from("tickets").insert({
    ...ticket,
    user_email: user.email,
  });

  if (error) {
    throw new Error("Failed to create ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id) {
  const supabase = createClient();
  const { error } = await supabase.from("tickets").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
