"use client";

import { Card } from "@/components/ui/card";
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
import { useRouter } from "next/navigation"; // Import useRouter
import { Claim } from "@/types/claim";

type Props = {
  claims: Claim[];
};

const products = [
  { name: "Medicare Advantage Plans", link: "/dictionary/medicare-advantage" },
  { name: "Vision Insurance", link: "/dictionary/vision-insurance" },
  {
    name: "Dental Insurance",
    link: "/dictionary/dental-insurance",
  },
  {
    name: "Special Needs Plans (SNPs)",
    link: "/dictionary/special-needs-plans",
  },
  {
    name: "Supplemental Insurance (Accident, Critical Illness, Hospital Recovery)",
    link: "/dictionary/supplemental-insurance",
  },
  { name: "Small Business Plans", link: "/dictionary/small-business-plans" },
];

export function ClaimHistory({ claims }: Props) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/claims/${id}`);
  };

  return (
    <div className="space-y-6">
      {" "}
      {/* Added padding for mobile */}
      <div className="max-w-full">
        <Card className="p-6">
          {" "}
          {/* Adjusted card padding */}
          <div className="flex items-center justify-between mb-3 md:mb-4">
            {" "}
            {/* Adjusted margin for mobile */}
            <h2 className="text-xl font-semibold">Claims</h2>
            <Link href="/addclaim">
              <Button className="text-xs md:text-sm">Submit A Claim</Button>{" "}
            </Link>
            {/* Adjusted button font size */}
          </div>
          <h3 className="font-semibold mb-3 md:mb-4">Recent Claims History</h3>{" "}
          {/* Adjusted margin for mobile */}
          <div className="overflow-x-auto w-full">
            {" "}
            {/* Enables horizontal scroll for tables */}
            <Table className="w-full">
              {" "}
              {/* Adjusted table width */}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm">Claim Type</TableHead>{" "}
                  {/* Reduced table header font size */}
                  <TableHead className="text-sm">Date Filed</TableHead>{" "}
                  {/* Reduced table header font size */}
                  <TableHead className="text-sm">Amount</TableHead>{" "}
                  {/* Reduced table header font size */}
                  <TableHead className="text-sm">Status</TableHead>{" "}
                  {/* Reduced table header font size */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow
                    key={claim.claimDate}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleRowClick(claim.id)}
                  >
                    {" "}
                    {/* Added hover effect and cursor pointer */}
                    <TableCell className="text-sm">{claim.type}</TableCell>{" "}
                    {/* Reduced table cell font size */}
                    <TableCell className="text-sm">
                      {claim.claimDate}
                    </TableCell>{" "}
                    {/* Reduced table cell font size */}
                    <TableCell className="text-sm">
                      {claim.claimAmount}
                    </TableCell>{" "}
                    {/* Reduced table cell font size */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          claim.claimStatus === "Approved"
                            ? "bg-green-100 text-green-800"
                            : claim.claimStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : claim.claimStatus === "Denied"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }`}
                      >
                        {claim.claimStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
