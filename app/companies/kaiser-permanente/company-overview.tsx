import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from 'lucide-react'

export function CompanyOverview() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">About State Farm</h2>
        <p className="text-muted-foreground">
          State Farm is a large group of insurance and financial services companies. Through its agents and employees, 
          State Farm provides insurance and financial services products including auto, home, life insurance, banking products, 
          and investment planning. The company's mission is to help people manage the risks of everyday life, recover from 
          the unexpected, and realize their dreams.
        </p>
      </Card>

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

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Bronze, Silver, Gold, and Platinum Plan Tiers",
            "Medicare",
            "HMO (Health Maintenance Organization)",
            "PPO (Preferred Provider Organization)",
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