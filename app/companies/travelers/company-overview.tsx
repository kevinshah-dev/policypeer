import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function CompanyOverview() {
  return (
    <div className="space-y-6 p-4 md:p-0 flex-grow">
      <Card className="p-4 md:p-6">
        <h2 className="text-xl font-bold mb-3 md:mb-4">About Elevance Health</h2>
        <p className="text-sm md:text-muted-foreground">
        Elevance Health (formerly Anthem) is one of America's largest health benefits companies, providing comprehensive healthcare solutions through its family of affiliated companies. 
        The organization serves over 46.8 million members through its health plans, delivering healthcare services across 23 states and Puerto Rico.
        </p>
      </Card>

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
            <div className="text-sm text-muted-foreground">Claims Approval Rate</div>
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
                  status: "Denied",
                },
                {
                  type: "Medical Expenses",
                  date: "Nov 15, 2023",
                  amount: "$3,200",
                  status: "Pending",
                },
              ].map((claim) => (
                <TableRow key={claim.date}>
                  <TableCell className="text-sm">{claim.type}</TableCell>
                  <TableCell className="text-sm">{claim.date}</TableCell>
                  <TableCell className="text-sm">{claim.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : claim.status === "Denied"
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
          <h2 className="text-xl font-semibold mb-4 md:mb-6">Rating Breakdown</h2>
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

      <Card className="p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-3 md:mb-4">Available Products</h2>
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
  )
}