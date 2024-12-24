import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from 'lucide-react'

export function CompanyOverview() {
  const affiliatedCompanies = [
    "Anthem Blue Cross and Blue Shield in 14 states",
    "Wellpoint",
    "HealthSun, Freedom Health, and Optimum Healthcare (Florida)",
    "MMM Healthcare (Puerto Rico)"
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">About Elevance Health</h2>
        <p className="text-muted-foreground">
        Elevance Health (formerly Anthem) is one of America's largest health benefits companies, providing comprehensive healthcare solutions through its family of affiliated companies. 
        The organization serves over 46.8 million members through its health plans, delivering healthcare services across 23 states and Puerto Rico.
        </p>

        <div className="mt-4">
          <h3 className="text-lg mb-2">Affiliated Companies:</h3>
          <ul className="list-disc list-inside space-y-1">
            {affiliatedCompanies.map((company) => (
              <li key={company} className="text-sm text-muted-foreground">
                {company}
                {company === "Anthem Blue Cross and Blue Shield in 14 states" && (
                  <sup className="ml-1 text-xs text-gray-400 cursor-pointer">
                    <a 
                      href="#footnote-1" 
                      className="cursor-pointer text-inherit no-underline hover:underline"
                    >
                      [1]
                    </a>
                  </sup>
                )}
              </li>
            ))}
          </ul>
        </div>
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
            "Medicare Advantage Plans",
            "Vision Insurance",
            "Dental Insurance (Preventive Care Coverage)",
            "Special Needs Plans (SNPs)",
            "Supplemental Insurance (Accident, Critical Illness, Hospital Recovery)",
            "Small Business Plans",
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
      <div className="mt-4 border-t pt-2 text-xs text-gray-500" id="footnote-1">
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
  )
}