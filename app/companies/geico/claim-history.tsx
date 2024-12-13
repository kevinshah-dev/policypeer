import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function ClaimHistory() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Claims Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-50 border">
            <div className="text-sm text-muted-foreground">Average Claim Processing Time</div>
            <div className="text-2xl font-bold mt-1">5.2 days</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border">
            <div className="text-sm text-muted-foreground">Claims Approval Rate</div>
            <div className="text-2xl font-bold mt-1">94.3%</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border">
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            <div className="text-2xl font-bold mt-1">4.5/5</div>
          </div>
        </div>

        <h3 className="font-semibold mb-4">Recent Claims History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim Type</TableHead>
              <TableHead>Date Filed</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Processing Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                type: "Auto Collision",
                date: "Dec 12, 2023",
                amount: "$12,500",
                status: "Approved",
                processingTime: "4 days",
              },
              {
                type: "Property Damage",
                date: "Nov 28, 2023",
                amount: "$8,750",
                status: "Approved",
                processingTime: "6 days",
              },
              {
                type: "Medical Expenses",
                date: "Nov 15, 2023",
                amount: "$3,200",
                status: "In Review",
                processingTime: "2 days",
              },
              {
                type: "Auto Theft",
                date: "Oct 30, 2023",
                amount: "$22,000",
                status: "Approved",
                processingTime: "8 days",
              },
            ].map((claim) => (
              <TableRow key={claim.date}>
                <TableCell>{claim.type}</TableCell>
                <TableCell>{claim.date}</TableCell>
                <TableCell>{claim.amount}</TableCell>
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
                <TableCell>{claim.processingTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
