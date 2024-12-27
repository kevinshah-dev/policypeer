import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CompanyOverview() {
  return (
    <div className="space-y-6">
      {/* ABOUT SECTION */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">About Cigna</h2>
        <p className="text-muted-foreground">
          Cigna Health Insurance is one of America’s largest health benefits companies, 
          offering comprehensive healthcare solutions through its network of affiliated organizations.
          The company serves over 180 million customer relationships through its health plans, 
          delivering healthcare services both in the United States and internationally across more than 30 countries.
        </p>
      </Card>

      {/* 2-COLUMN GRID: CLAIMS TABLE (LEFT) & RATINGS (RIGHT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CLAIMS TABLE CARD */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Claims History</h2>
            <Button variant="outline" className="text-sm">
              Submit a Claim
            </Button>
          </div>
          
          {/* Single statistic: Claims Approval Rate */}
          <div className="p-4 mb-6 rounded-lg bg-gray-50 border">
            <div className="text-sm text-muted-foreground">Claims Approval Rate</div>
            <div className="text-2xl font-bold mt-1">94.3%</div>
          </div>

          <h3 className="font-semibold mb-4">Recent Claims</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim Type</TableHead>
                <TableHead>Date Filed</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* RATING BREAKDOWN CARD */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Rating Breakdown</h2>
          <div className="space-y-4">
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

      {/* AVAILABLE PRODUCTS SECTION */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Auto Insurance",
            "Home Insurance",
            "Life Insurance",
            "Property Insurance",
            "Business Insurance",
            "Health Insurance",
            "Disability Insurance",
            "Renters Insurance",
          ].map((product) => (
            <div
              key={product}
              className="flex items-center p-3 rounded-lg border bg-gray-50"
            >
              <span className="text-sm font-medium">{product}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
