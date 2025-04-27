import { supabase } from "@/lib/supabase";
import CompaniesClient from "./CompaniesClient";

export default async function CompaniesPage() {
  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .order("name");
  //console.log("companies", companies);

  if (error) {
    console.error("Error fetching companies:", error.message);
  }

  return <CompaniesClient initialCompanies={companies || []} />;
}
