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

export function ClaimHistory({ claims }: Props) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push("/");
  };

  return (
    <div className="space-y-6">
      {" "}
      <div className="max-w-full">
        <Card className="p-6">
          {" "}
          <div className="flex items-center justify-between mb-3 md:mb-4">
            {" "}
            <h2 className="text-xl font-semibold">Claims</h2>
            <Button className="text-xs md:text-sm">Submit A Claim</Button>{" "}
          </div>
          <h3 className="font-semibold mb-3 md:mb-4">Recent Claims History</h3>{" "}
          <div className="overflow-x-auto w-full">
            {" "}
            <Table className="w-full">
              {" "}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm">Claim Type</TableHead>{" "}
                  <TableHead className="text-sm">Date Filed</TableHead>{" "}
                  <TableHead className="text-sm">Amount</TableHead>{" "}
                  <TableHead className="text-sm">Status</TableHead>{" "}
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow
                    key={claim.claimDate}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleRowClick()}
                  >
                    {" "}
                    <TableCell className="text-sm">{claim.type}</TableCell>{" "}
                    <TableCell className="text-sm">{claim.claimDate}</TableCell>{" "}
                    <TableCell className="text-sm">
                      {claim.claimAmount}
                    </TableCell>{" "}
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
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
      </div>
    </div>
  );
}
