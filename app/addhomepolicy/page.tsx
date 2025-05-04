"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanySelect } from "@/components/selectcomponents/companyselect";
import Footer from "@/components/footer";

type HomePolicyInsert = {
  company: string;
  monthlyPremium: string;
  coverageForm: string;
  deductible: string;
  dwellingCoverage: string;
  liabilityCoverage: string;
  yearBuilt: string;
  roofAge: string;
  zipCode: string;
  planDetails: string;
  user_id: string | null;
};

export default function AddHomePolicy() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [session, setSession] = useState<any>(null);

  const [formData, setFormData] = useState({
    company: "",
    monthlyPremium: "",
    coverageForm: "",
    deductible: "",
    dwellingCoverage: "",
    liabilityCoverage: "",
    yearBuilt: "",
    roofAge: "",
    zipCode: "",
    planDetails: "",
    user_id: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session);
    });
  }, []);

  const handleInput =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async () => {
    try {
      const dataForInsert: HomePolicyInsert = { ...formData };
      if (session) {
        dataForInsert.user_id = session.user.id;
      } else {
        dataForInsert.user_id = null;
      }

      const { error } = await supabase.from("homepolicies").insert({
        ...formData,
        insuranceType: "home",
      });
      if (error) throw error;

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2500);
    } catch (err) {
      console.error("Error submitting policy:", err);
    }
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank you for submitting your policy!</DialogTitle>
          </DialogHeader>
          <p className="text-center py-4">Redirecting…</p>
        </DialogContent>
      </Dialog>

      <div className="container max-w-2xl mx-auto py-12 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Your Home Policy</h1>
          <Link
            href="#"
            className="flex items-center justify-center gap-2 text-blue-600 hover:underline"
          >
            <Upload className="h-4 w-4" />
            Upload your declaration page to verify
          </Link>
        </header>

        {
          //Insurance company and premium
        }
        <Card>
          <CardContent className="pt-6 space-y-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Insurer & Premium</h2>

              <div className="flex items-center gap-2">
                <Label>Insurance Company</Label>
                <CompanySelect
                  value={formData.company}
                  onChange={(v) => setFormData({ ...formData, company: v })}
                />
              </div>

              <div>
                <Label htmlFor="monthlyPremium">Monthly Premium</Label>
                <Input
                  id="monthlyPremium"
                  type="number"
                  placeholder="e.g. $120"
                  onChange={handleInput("monthlyPremium")}
                />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Coverage Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Policy Form</Label>
                  <Select
                    onValueChange={(v) =>
                      setFormData({ ...formData, coverageForm: v })
                    }
                    defaultValue={formData.coverageForm}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select form (HO‑3, HO‑5…)" />
                    </SelectTrigger>
                    <SelectContent>
                      {["HO-3", "HO-5", "HO-4 (Renters)", "HO-6 (Condo)"].map(
                        (f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deductible">Deductible</Label>
                  <Input
                    id="deductible"
                    type="number"
                    placeholder="e.g. $1 000"
                    onChange={handleInput("deductible")}
                  />
                </div>

                <div>
                  <Label htmlFor="dwellingCoverage">
                    Dwelling Coverage (A)
                  </Label>
                  <Input
                    id="dwellingCoverage"
                    type="number"
                    placeholder="e.g. $300 000"
                    onChange={handleInput("dwellingCoverage")}
                  />
                </div>

                <div>
                  <Label htmlFor="liabilityCoverage">
                    Personal Liability Limit
                  </Label>
                  <Input
                    id="liabilityCoverage"
                    type="number"
                    placeholder="e.g. $300 000"
                    onChange={handleInput("liabilityCoverage")}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Property Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="e.g. 1998"
                    onChange={handleInput("yearBuilt")}
                  />
                </div>

                <div>
                  <Label htmlFor="roofAge">Roof Age (yrs)</Label>
                  <Input
                    id="roofAge"
                    type="number"
                    placeholder="e.g. 10"
                    onChange={handleInput("roofAge")}
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    maxLength={5}
                    placeholder="e.g. 30309"
                    onChange={handleInput("zipCode")}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <Label htmlFor="planDetails">Additional Notes</Label>
              <Textarea
                id="planDetails"
                placeholder="Wind/hail deductible? Water‑backup rider? Anything else…"
                className="h-24"
                onChange={handleInput("planDetails")}
              />
            </section>

            <Button className="w-full mt-8" onClick={handleSubmit}>
              Submit Home Policy
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
