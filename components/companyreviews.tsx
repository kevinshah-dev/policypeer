import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Review, ReviewInformationProps } from "@/types/review";
import { formatHumanDate } from "@/lib/utils";

export function CompanyReviews({
  reviews,
  companySlug,
}: ReviewInformationProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <Link
            href={`/addreview?company=${encodeURIComponent(companySlug)}`}
            passHref
          >
            <Button asChild>
              <span>Write a Review</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {reviews.map((review: Review) => (
            <div
              key={review.title}
              className="border-b pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium">P</span>
                  </div>
                  <div>
                    <div className="font-medium">PolicyPeer User</div>
                    <div className="text-sm text-muted-foreground">
                      {formatHumanDate(review.created_at)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-semibold mb-2">{review.title}</h3>
              <p className="text-muted-foreground mb-4">{review.content}</p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
