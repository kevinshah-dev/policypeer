import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const path = `${uuid()}/${Date.now()}.${ext}`;

  const { error } = await supabaseService.storage
    .from("policy-docs")
    .upload(path, file);

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ path });
}
