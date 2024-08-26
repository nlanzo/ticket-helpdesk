import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const ticket = await request.json();

  // get supabase instance
  const supabase = createRouteHandlerClient();
  console.log("getting user...");
  // get current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("session: " + session);

  console.log("inserting data into supabase table...");

  // insert the data into supabase table
  console.log("user email: " + user.email);
  const { data, error } = await supabase
    .from("tickets")
    .insert({
      ...ticket,
      user_email: user.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}
