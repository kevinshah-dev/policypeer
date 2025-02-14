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
import { CompanyReviews } from "./company-reviews";
import { ClaimHistory } from "./claim-history";
import { PolicyInformation } from "./policy-information";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { supabase } from "@/lib/supabase";
import { Claim } from "@/types/claim";

// KEY = "humana"

export default async function CompanyProfile() {
  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .eq("company", "humana");

  console.log("Claims Data:", data);

  const formattedClaims = (data ?? []).map((claim: Claim) => ({
    ...claim,
    claimDate: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(claim.claimAmount)),
  }));

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
                    <span className="ml-1 font-semibold">4.2</span>
                    <span className="text-muted-foreground ml-1 text-xs md:text-base">
                      (2,456 Reviews)
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
              <TabsList className="justify-start h-auto flex-wrap">
                <TabsTrigger value="overview" className="text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="claims" className="text-sm">
                  Claim History
                </TabsTrigger>
                <TabsTrigger value="policies" className="text-sm">
                  Policies
                </TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="overview">
                  <CompanyOverview claims={formattedClaims ?? []} />
                </TabsContent>
                <TabsContent value="reviews">
                  <CompanyReviews />
                </TabsContent>
                <TabsContent value="claims">
                  <ClaimHistory claims={formattedClaims ?? []} />
                </TabsContent>
                <TabsContent value="policies">
                  <PolicyInformation />
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
                      83.9M policies in force
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Founded</div>
                    <div className="text-sm text-muted-foreground">
                      1946, Indianapolis, IN
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Revenue</div>
                    <div className="text-sm text-muted-foreground">
                      $171.34 Billion (2023)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Financial Strength</div>
                    <div className="text-sm text-muted-foreground">
                      A++ (Superior)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Claims Satisfaction</div>
                    <div className="text-sm text-muted-foreground">
                      3.2/5 (Industry: 4.2)
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
                  { name: "Liberty Mutual", rating: "3.9" },
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
      <div
        className="border-t pt-2 text-xs text-gray-500 mt-4 md:mt-0 md:border-none md:pt-0"
        id="footnote-1"
      >
        <p>
          [1]{" "}
          <a
            href="https://www.elevancehealth.com/who-we-are/companies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            Anthem Blue Cross and Blue Shield - Official Website
          </a>
        </p>
      </div>
    </div>
  );
}
