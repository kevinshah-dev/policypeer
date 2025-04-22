"use client";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Upload } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanySelect } from "@/components/selectcomponents/companyselect";
import Footer from "@/components/footer";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddHealthPolicy() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isCertified, setIsCertified] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    premium: "",
    coverageType: "",
    deductible: "",
    coverageLimit: "",
    planDetails: "",
    submissionType: "new",
    coinsurance: "",
    tier: "",
    networkType: "",
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, company: e.target.value });
  };

  const handlePremiumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, premium: e.target.value });
  };

  const handleCoverageTypeChange = (value: string) => {
    setFormData({ ...formData, coverageType: value });
  };

  const handleDeductibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, deductible: e.target.value });
  };

  const handleSubmissionTypeChange = (value: string) => {
    setFormData({ ...formData, submissionType: value });
  };

  const handleCoverageLimitChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, coverageLimit: e.target.value });
  };

  const handlePlanDetailsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, planDetails: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("healthpolicies").insert(formData);

      if (error) throw error;

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2500);
    } catch (error) {
      console.error("Error submitting insurance claim:", error);
    }
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank you for submitting your policy!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p>Your submission has been received. Redirecting...</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Add Your Health Insurance Policy
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Upload className="h-4 w-4" />
            <Link href="#" className="text-blue-600 hover:underline">
              Upload your policy document to verify your submission
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Insurance Company & Premium
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company">Insurance Company</Label>
                    <CompanySelect
                      value={formData.company}
                      onChange={(newValue) =>
                        setFormData((prev) => ({ ...prev, company: newValue }))
                      }
                    ></CompanySelect>
                  </div>
                  <div>
                    <Label htmlFor="premium">Monthly Premium</Label>
                    <Input
                      id="premium"
                      placeholder="e.g. $150"
                      type="number"
                      onChange={handlePremiumChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Network & Tier</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tier</Label>
                    <Select
                      onValueChange={(v) =>
                        setFormData((f) => ({ ...f, metalTier: v }))
                      }
                      defaultValue={formData.tier}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        {["bronze", "silver", "gold", "platinum"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Network Type</Label>
                    <Select
                      onValueChange={(v) =>
                        setFormData((f) => ({ ...f, networkType: v }))
                      }
                      defaultValue={formData.networkType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {["HMO", "PPO", "EPO", "POS"].map((nt) => (
                          <SelectItem key={nt} value={nt}>
                            {nt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Coverage Details</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="deductible">Deductible Amount</Label>
                    <Input
                      id="deductible"
                      placeholder="e.g. $500"
                      type="number"
                      onChange={handleDeductibleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="oopMax">Out‑of‑Pocket Max</Label>
                    <Input
                      id="oopMax"
                      type="number"
                      placeholder="$7,900"
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, oopMax: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="coverage-limit">Coverage Limit</Label>
                    <Input
                      id="coverage-limit"
                      placeholder="e.g. $100,000"
                      type="number"
                      onChange={handleCoverageLimitChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="coinsurance">Coinsurance %</Label>
                  <Input
                    id="coinsurance"
                    type="number"
                    step="0.1"
                    placeholder="20"
                    onChange={(e) =>
                      setFormData((f) => ({
                        ...f,
                        coinsurance: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Additional Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="plan-details">Plan Details</Label>
                    <Textarea
                      id="plan-details"
                      placeholder="Describe any additional coverage, special terms, or notable features of your plan"
                      className="h-24"
                      onChange={handlePlanDetailsChange}
                    />
                  </div>
                </div>
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
              className="w-full mt-8"
              onClick={handleSubmit}
              disabled={!isCertified}
            >
              Submit Insurance Information
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
