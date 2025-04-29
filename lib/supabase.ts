import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseKey2 = process.env.NEXT_PUBLIC_SERVICE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseService = createClient(supabaseUrl, supabaseKey2);
