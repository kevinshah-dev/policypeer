import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface CompanyCardProps {
  company: string
  salary: string
  isPromoted?: boolean
}

export default function CompanyCard({
  company,
  salary,
  isPromoted = false,
}: CompanyCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{company}</h3>
              {isPromoted && (
                <Badge variant="secondary" className="text-xs">
                  Promoted
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
                View Policies
                <ChevronRight className="w-4 h-4" />
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">{salary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}