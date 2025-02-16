import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, Globe2, PhoneCall, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Claim } from "@/types/claim";

type Props = {
  claims: Claim[];
};

export function CompanyOverview({ claims }: Props) {
  return (
    <div className="space-y-6 p-4 md:p-0 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* CLAIMS TABLE CARD */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-xl font-semibold">Claims History</h2>
            <Link href="/addclaim">
              <Button variant="outline" className="text-xs md:text-sm">
                Submit a Claim
              </Button>
            </Link>
          </div>

          {/* Single statistic: Claims Approval Rate */}
          <div className="p-3 mb-4 md:mb-6 rounded-lg bg-gray-50 border">
            <div className="text-sm text-muted-foreground">
              Claims Approval Rate
            </div>
            <div className="text-2xl font-bold mt-1">94.3%</div>
          </div>

          <h3 className="font-semibold mb-3 md:mb-4">Recent Claims</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm">Claim Type</TableHead>
                  <TableHead className="text-sm">Date Filed</TableHead>
                  <TableHead className="text-sm">Amount</TableHead>
                  <TableHead className="text-sm">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow key={claim.claimDate}>
                    <TableCell className="text-sm">
                      {claim.claimDescription}
                    </TableCell>
                    <TableCell className="text-sm">{claim.claimDate}</TableCell>
                    <TableCell className="text-sm">
                      {claim.claimAmount}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : claim.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : claim.status === "denied"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }`}
                      >
                        {claim.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* RATING BREAKDOWN CARD */}
        <Card className="p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-6">
            Rating Breakdown
          </h2>
          <div className="space-y-3 md:space-y-4">
            {[
              { label: "Customer Service", rating: 4.5 },
              { label: "Claims Process", rating: 4.2 },
              { label: "Value for Money", rating: 4.0 },
              { label: "Policy Options", rating: 4.3 },
              { label: "Digital Experience", rating: 3.8 },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{item.rating}</span>
                  </div>
                </div>
                <Progress value={item.rating * 20} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4 md:p-6 space-y-4">
        <h2 className="text-xl font-bold">Quick Links</h2>
        <div className="space-y-3">
          {/* Official Website */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Official Website</span>
            </div>
            <Link
              href="https://www.travelers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 underline hover:text-blue-500"
            >
              Visit
            </Link>
          </div>

          {/* Customer Service */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Customer Service</span>
            </div>
            <p className="text-sm">1-800-872-3862</p>
          </div>

          {/* Drug Formulary PDF */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">Drug Formulary</span>
            </div>
            <Link
              href="https://www.aetna.com/individuals-families/find-a-medication.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 underline hover:text-blue-500"
            >
              Medication Search
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-3 md:mb-4">
          Available Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            "Medicare Advantage Plans",
            "Vision Insurance",
            "Dental Insurance (Preventive Care Coverage)",
            "Special Needs Plans (SNPs)",
            "Supplemental Insurance (Accident, Critical Illness, Hospital Recovery)",
            "Small Business Plans",
          ].map((product) => (
            <div
              key={product}
              className="flex items-center p-2 md:p-3 rounded-lg border bg-gray-50"
            >
              <span className="text-sm font-medium">{product}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
