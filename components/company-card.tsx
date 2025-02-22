import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  company: string;
  premium: string;
  isMostViewed?: boolean;
  rating?: number;
}

export default function CompanyCard({
  company,
  premium,
  isMostViewed = false,
  rating = 0,
}: CompanyCardProps) {
  const safeRating = typeof rating === "number" ? rating : parseFloat(rating);

  const starFractions = Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1; // 1-based star
    const floorRating = Math.floor(safeRating);

    if (starNumber <= floorRating) {
      // This star is fully filled
      return 1;
    } else if (starNumber === floorRating + 1 && safeRating % 1 !== 0) {
      // This is the partial star
      return Number((safeRating - floorRating).toFixed(2));
    } else {
      // This star is empty
      return 0;
    }
  });

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/companies/${company
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="font-semibold hover:underline"
              >
                <h3>{company}</h3>
              </Link>

              {isMostViewed && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>

            {/* Star Rating Row */}
            <div className="flex items-center gap-1 mb-2">
              {starFractions.map((fraction, index) => (
                <svg
                  key={index}
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id={`starClip-${index}`}>
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 
                        1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 
                        1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197
                        -1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81
                        .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </clipPath>
                  </defs>

                  {/* Gray Star (background) */}
                  <rect
                    width="100%"
                    height="100%"
                    fill="#d1d5db"
                    clipPath={`url(#starClip-${index})`}
                  />

                  {/* Yellow portion */}
                  <rect
                    width={`${fraction * 100}%`}
                    height="100%"
                    fill="#facc15"
                    clipPath={`url(#starClip-${index})`}
                  />
                </svg>
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({safeRating.toFixed(1)}/5)
              </span>
            </div>

            <Link
              href={`/companies/${company.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-muted-foreground flex items-center gap-1 hover:underline"
            >
              View Policies
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-right">
            <p className="font-bold">{premium}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
