"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { CompanySelect } from "@/components/selectcomponents/companyselect";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/footer";

type ReviewInsert = {
  company: string;
  rating: number;
  title: string;
  content: string;
  user_id: string | null;
};

export default function AddReview() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const [isCertified, setIsCertified] = useState(false);

  const [session, setSession] = useState<any>(null);

  const [formData, setFormData] = useState<ReviewInsert>({
    company: "",
    rating: 5,
    title: "",
    content: "",
    user_id: null,
  });

  useEffect(() => {
    const companyFromQuery = searchParams.get("company");
    if (companyFromQuery) {
      setFormData((prev) => ({
        ...prev,
        company: companyFromQuery,
      }));
    }
  }, [searchParams, formData.company]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setSession(data.session);
      }
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // rating is a number, so parse if using an <input type="radio">
  const handleRatingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      rating: parseInt(value),
    }));
  };

  const handleCompanyChange = (newValue: string) => {
    setFormData((prev) => ({
      ...prev,
      company: newValue,
    }));
  };

  const handleSubmit = async () => {
    if (!isCertified) {
      alert("Please certify that the information is accurate.");
      return;
    }

    try {
      const dataForInsert: ReviewInsert = { ...formData };
      if (session) {
        dataForInsert.user_id = session.user.id;
      } else {
        dataForInsert.user_id = null;
      }

      // Insert into your "reviews" table
      const { error } = await supabase.from("reviews").insert(dataForInsert);
      if (error) throw error;

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2500);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank you for submitting your review!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p>Your feedback has been received. Redirecting...</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Your Insurance Review</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Company</h2>
                <CompanySelect
                  value={formData.company}
                  onChange={handleCompanyChange}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Rating</h2>
                <RadioGroup
                  defaultValue="5"
                  className="flex gap-4"
                  onValueChange={handleRatingChange}
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <div key={val} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={String(val)}
                        id={`rating-${val}`}
                      />
                      <Label htmlFor={`rating-${val}`}>
                        {val} Star{val > 1 ? "s" : ""}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Review Title</h2>
                <Input
                  id="title"
                  placeholder="Great coverage and quick claims"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Review Content</h2>
                <Textarea
                  id="content"
                  placeholder="Share your experience with this insurance provider..."
                  className="h-24"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-2">
              <Checkbox
                id="certify"
                checked={isCertified}
                onCheckedChange={(checked) => setIsCertified(!!checked)}
              />
              <Label htmlFor="certify">
                I certify that the information provided is accurate and true.
              </Label>
            </div>

            <Button
              className="w-full mt-8 bg-red-600 hover:bg-red-500"
              onClick={handleSubmit}
              disabled={!isCertified}
            >
              Submit Review
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
