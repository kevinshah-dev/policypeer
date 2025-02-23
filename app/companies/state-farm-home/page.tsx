import { redirect } from "next/navigation";

export default function StateFarmHomeRedirect() {
  redirect("/companies/state-farm");
  return null;
}
