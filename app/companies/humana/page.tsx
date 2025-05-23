import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Users,
  Building2,
  DollarSign,
  Shield,
  FileCheck,
} from "lucide-react";
import { CompanyOverview } from "./company-overview";
import { CompanyReviews } from "@/components/companyreviews";
import { ClaimHistoryMain } from "@/components/claimhistory";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { supabase } from "@/lib/supabase";
import { Claim } from "@/types/claim";
import { PolicyInformationMain } from "@/components/policyinfo";
import Footer from "@/components/footer";

// KEY = "humana"

export default async function CompanyProfile() {
  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .eq("company", "humana");

  console.log("Claims Data:", data);

  const formattedClaims = (data ?? []).map((claim: Claim) => ({
    ...claim,
    claimAmount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(claim.claimAmount)),
  }));

  const { data: policiesData, error: policiesError } = await supabase
    .from("policies")
    .select("*")
    .eq("company", "humana")
    .order("created_at", { ascending: false });

  const { data: reviewData, error: reviewError } = await supabase
    .from("reviews")
    .select("*")
    .eq("company", "humana")
    .order("created_at", { ascending: false });

  console.log("Claims Data:", data);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-row items-center justify-between md:block w-full md:w-24">
              <div className="w-24 h-24 rounded-lg border bg-white p-2 flex items-center justify-center">
                <Image
                  src="/humana.webp"
                  alt="Travelers Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="block md:hidden">
                <Button className="bg-red-600 hover:bg-red-500">
                  Add Your Experience
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-start gap-3 flex-1">
              <div className="flex flex-col items-start w-full">
                <div className="md:mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold md:text-left">
                    Humana
                  </h1>
                </div>
                <div className="flex items-center justify-start  md:justify-start md:items-start md:flex-col">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold">3.1</span>
                    <span className="text-muted-foreground ml-1 text-xs md:text-base">
                      ({reviewData?.length ?? 0} Review
                      {(reviewData?.length ?? 0) !== 1 ? "s" : ""})
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <Button className="mt-2 md:mt-0 self-start w-full md:w-auto">
                  Add Your Experience
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="flex flex-wrap gap-2 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-red-600"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-red-600"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="claims"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-red-600"
                >
                  Claim History
                </TabsTrigger>
                <TabsTrigger
                  value="policies"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-red-600"
                >
                  Policies
                </TabsTrigger>
              </TabsList>
              <div className="mt-10">
                <TabsContent value="overview">
                  <CompanyOverview claims={formattedClaims.slice(0, 5) ?? []} />
                </TabsContent>
                <TabsContent value="reviews">
                  <CompanyReviews
                    reviews={reviewData ?? []}
                    companySlug="humana"
                  />
                </TabsContent>
                <TabsContent value="claims">
                  <ClaimHistoryMain claims={formattedClaims ?? []} />
                </TabsContent>
                <TabsContent value="policies">
                  <PolicyInformationMain
                    policies={policiesData ?? []}
                    type="health"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-4 md:p-6">
              <h3 className="font-semibold mb-4">Company Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Customers</div>
                    <div className="text-sm text-muted-foreground">
                      16.9 million total members
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Founded</div>
                    <div className="text-sm text-muted-foreground">
                      1961, Louisville, KY
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Revenue</div>
                    <div className="text-sm text-muted-foreground">
                      $106.37 Billion (2023)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Financial Strength</div>
                    <div className="text-sm text-muted-foreground">
                      B (Fair)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Claims Satisfaction</div>
                    <div className="text-sm text-muted-foreground">
                      4.0/5 (Industry: 4.2)
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">
                Popular Insurance Companies
              </h3>
              <div className="space-y-4">
                {[
                  { name: "GEICO", rating: "4.3" },
                  { name: "Progressive", rating: "4.1" },
                  { name: "Allstate", rating: "4.0" },
                ].map((company) => (
                  <Link
                    key={company.name}
                    href={`/companies/${company.name.toLowerCase()}`}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <span className="font-medium">{company.name}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{company.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
