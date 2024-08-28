import { createClient } from "../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const ticket = await request.json();

  // get supabase instance
  const supabase = createClient();

  // get current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // insert the data into supabase table

  const { data, error } = await supabase
    .from("tickets")
    .insert({
      ...ticket,
      user_email: user.email,
    })
    .select()
    .single();

  console.log(data, error);

  return NextResponse.json({ data, error });
}
