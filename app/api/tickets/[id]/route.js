import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const id = params.id;
  const supabase = createClient();

  const { error } = await supabase.from("tickets").delete().eq("id", id);

  return NextResponse.json({ error });
}
