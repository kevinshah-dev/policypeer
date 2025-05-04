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
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanySelect } from "@/components/selectcomponents/companyselect";
import { VehicleSelect } from "@/components/selectcomponents/vehicleselect";
import Footer from "@/components/footer";

export default function AddCarPolicy() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    premium: "",
    coverageType: "",
    deductible: "",
    coverageLimit: "",
    planDetails: "",
    submissionType: "new",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    mileage: "",
    policy_doc_path: "",
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

  const handleVehicleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, vehicleMake: e.target.value });
  };

  const handleVehicleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, vehicleModel: e.target.value });
  };

  const handleVehicleYearChange = (value: string) => {
    setFormData({ ...formData, vehicleYear: value });
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, mileage: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("policies").insert(formData);

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

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Upload failed");
      setFormData((f) => ({ ...f, policy_doc_path: json.path }));
      alert("Document attached ✔︎");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        onChange={onSelectFile}
      />
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
            Add Your Car Insurance Policy
          </h1>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex mx-auto items-center justify-center gap-2 text-blue-600 hover:underline disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload your policy document"}
          </button>
          {formData.policy_doc_path && (
            <p className="text-sm text-green-600 mt-1">Document attached ✔︎</p>
          )}
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
                <h2 className="text-xl font-semibold mb-4">Coverage Details</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="coverage-type">Coverage Type</Label>
                    <Select onValueChange={handleCoverageTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coverage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprehensive">
                          Comprehensive
                        </SelectItem>
                        <SelectItem value="collision">Collision</SelectItem>
                        <SelectItem value="liability">Liability</SelectItem>
                        <SelectItem value="full">Full Coverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    <Label htmlFor="coverage-limit">Coverage Limit</Label>
                    <Input
                      id="coverage-limit"
                      placeholder="e.g. $100,000"
                      type="number"
                      onChange={handleCoverageLimitChange}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Vehicle Information
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="vehicle-make">Vehicle Make</Label>
                    <VehicleSelect
                      value={formData.vehicleMake}
                      onChange={(newValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          vehicleMake: newValue,
                        }))
                      }
                    />
                  </div>{" "}
                  <div>
                    <Label htmlFor="vehicle-model">Vehicle Model</Label>
                    <Input
                      id="vehicle-model"
                      placeholder="e.g. Camry"
                      type="text"
                      onChange={handleVehicleModelChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle-year">Vehicle Year</Label>
                    <Select onValueChange={handleVehicleYearChange}>
                      <SelectTrigger id="vehicle-year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 30 }, (_, index) => {
                          const year = new Date().getFullYear() - index;
                          return (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      placeholder="e.g. 15000"
                      type="number"
                      onChange={handleMileageChange}
                    />
                  </div>
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
                  <div>
                    <Label className="mb-2 block">Submission Type</Label>
                    <RadioGroup
                      defaultValue="new"
                      className="flex gap-4"
                      onValueChange={handleSubmissionTypeChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">New Policy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="existing" id="existing" />
                        <Label htmlFor="existing">Existing Policy</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full mt-8" onClick={handleSubmit}>
              Submit Insurance Information
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
