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


export function ClaimHistory() {
  const router = useRouter();

  const handleRowClick = () => {
    router.push("/"); 
  }

  return (
    <div className="space-y-6"> {/* Added padding for mobile */}
    <div className="max-w-full">
      <Card className="p-6"> {/* Adjusted card padding */}
        <div className="flex items-center justify-between mb-3 md:mb-4"> {/* Adjusted margin for mobile */}
          <h2 className="text-xl font-semibold">Claims</h2>
          <Button className="text-xs md:text-sm">Submit A Claim</Button> {/* Adjusted button font size */}
        </div>
        <h3 className="font-semibold mb-3 md:mb-4">Recent Claims History</h3> {/* Adjusted margin for mobile */}
          <div className="overflow-x-auto w-full"> {/* Enables horizontal scroll for tables */}
            <Table className="w-full"> {/* Adjusted table width */}
              <TableHeader>
                  <TableRow>
                  <TableHead className="text-sm">Claim Type</TableHead> {/* Reduced table header font size */}
                  <TableHead className="text-sm">Date Filed</TableHead> {/* Reduced table header font size */}
                    <TableHead className="text-sm">Amount</TableHead> {/* Reduced table header font size */}
                    <TableHead className="text-sm">Status</TableHead> {/* Reduced table header font size */}
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {[
                    {
                        type: "Auto Collision",
                        date: "Dec 12, 2023",
                        amount: "$12,500",
                        status: "Approved",
                      },
                      {
                        type: "Property Damage",
                        date: "Nov 28, 2023",
                        amount: "$8,750",
                        status: "Approved",
                      },
                      {
                        type: "Medical Expenses",
                        date: "Nov 15, 2023",
                        amount: "$3,200",
                        status: "In Review",
                      },
                      {
                        type: "Auto Theft",
                        date: "Oct 30, 2023",
                        amount: "$22,000",
                        status: "Approved",
                      },
                    ].map((claim) => (
                      <TableRow 
                          key={claim.date} 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleRowClick()}
                        > {/* Added hover effect and cursor pointer */}
                         <TableCell className="text-sm">{claim.type}</TableCell> {/* Reduced table cell font size */}
                         <TableCell className="text-sm">{claim.date}</TableCell> {/* Reduced table cell font size */}
                        <TableCell className="text-sm">{claim.amount}</TableCell> {/* Reduced table cell font size */}
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