import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Claim } from "@/types/claim";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BackButton from "@/components/backbutton";

interface ClaimDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { id } = params;

  // Fetch the claim details
  const { data: claim, error } = await supabase
    .from("claims")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !claim) {
    // If no claim found or there's an error, show a 404 page
    notFound();
  }

  let statusClass = "";
  if (claim.claimStatus === "Approved") {
    statusClass = "bg-green-100 text-green-800";
  } else if (claim.claimStatus === "Denied") {
    statusClass = "bg-red-100 text-red-800";
  } else if (claim.claimStatus === "Pending") {
    statusClass = "bg-yellow-100 text-yellow-800";
  } else {
    statusClass = "bg-gray-100 text-gray-800";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-3xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              Claim Details
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Comprehensive information about your claim
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Claim ID: <span className="font-medium">{claim.id}</span>
              </div>
              <Badge className={`px-2 py-1 text-xs font-medium ${statusClass}`}>
                {claim.claimStatus}
              </Badge>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <p>
                <strong>Claim Category:</strong> {claim.claim_category}
              </p>
              <p>
                <strong>Claim Date:</strong> {claim.claimDate}
              </p>
              <p>
                <strong>Amount:</strong> {claim.claimAmount}
              </p>
              <p>
                <strong>Description:</strong> {claim.claimDescription}
              </p>
            </div>

            <hr className="my-4" />
            <div className="flex justify-end">
              <BackButton />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
