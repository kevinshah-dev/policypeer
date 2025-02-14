import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import Link from "next/link";

export function CompanyReviews() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <Link href="/addreview?company=liberty-mutual" passHref>
            <Button asChild>
              <span>Write a Review</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {[
            {
              author: "John D.",
              rating: 5,
              date: "December 10, 2023",
              title: "Excellent claims experience",
              content:
                "I recently had to file a claim after a minor accident. The process was smooth and the adjuster was very professional. Claim was processed within 48 hours.",
              helpful: 24,
              replies: 3,
            },
            {
              author: "Sarah M.",
              rating: 4,
              date: "December 5, 2023",
              title: "Good coverage, slightly pricey",
              content:
                "Been with State Farm for 5 years. Their coverage is comprehensive and customer service is great, but premiums have increased yearly.",
              helpful: 18,
              replies: 2,
            },
            {
              author: "Robert K.",
              rating: 5,
              date: "November 28, 2023",
              title: "Outstanding customer service",
              content:
                "My agent has been incredibly helpful in managing my policies. They're always available to answer questions and provide guidance.",
              helpful: 15,
              replies: 1,
            },
          ].map((review) => (
            <div
              key={review.title}
              className="border-b pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {review.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {review.date}
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
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Reply ({review.replies})
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
