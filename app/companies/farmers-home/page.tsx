import { redirect } from "next/navigation";

export default function StateFarmHomeRedirect() {
  redirect("/companies/farmers-insurance");
  return null;
}
