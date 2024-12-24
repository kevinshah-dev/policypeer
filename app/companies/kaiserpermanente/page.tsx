'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Users, Building2, DollarSign, Shield, FileCheck } from 'lucide-react'
import { CompanyOverview } from "./company-overview"
import { CompanyReviews } from "./company-reviews"
import { ClaimHistory } from "./claim-history"
import { PolicyInformation } from "./policy-information"

export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-lg border bg-white p-2 flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="State Farm Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Kaiser Perma</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">4.2</span>
                    </div>
                    <span className="text-muted-foreground">(2,456 Reviews)</span>
                  </div>
                </div>
                <Button>Add Your Experience</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start h-auto flex-wrap">
                <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm">Reviews</TabsTrigger>
                <TabsTrigger value="claims" className="text-sm">Claim History</TabsTrigger>
                <TabsTrigger value="policies" className="text-sm">Policy Information</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="overview">
                  <CompanyOverview />
                </TabsContent>
                <TabsContent value="reviews">
                  <CompanyReviews />
                </TabsContent>
                <TabsContent value="claims">
                  <ClaimHistory />
                </TabsContent>
                <TabsContent value="policies">
                  <PolicyInformation />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Company Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Customers</div>
                    <div className="text-sm text-muted-foreground">83.9M policies in force</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Founded</div>
                    <div className="text-sm text-muted-foreground">1922, Bloomington, IL</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Revenue</div>
                    <div className="text-sm text-muted-foreground">$89.3B (2023)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Financial Strength</div>
                    <div className="text-sm text-muted-foreground">A++ (Superior)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Claims Satisfaction</div>
                    <div className="text-sm text-muted-foreground">4.5/5 (Industry: 4.2)</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Popular Insurance Companies</h3>
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
    </div>
  )
}
