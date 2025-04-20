"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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

type ClaimInsert = {
  insuranceType: string;
  claimDate: string;
  claimAmount: string;
  claimDescription: string;
  claimStatus: string;
  coverageType: string;
  note: string;
  company: string;
  user_id: string | null;
  claim_category: string;
};

export default function AddInsuranceClaim() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isCertified, setIsCertified] = useState(false);

  const [session, setSession] = useState<any>(null);

  // State for claim data
  const [formData, setFormData] = useState({
    insuranceType: "health",
    claimDate: "",
    claimAmount: "",
    claimDescription: "",
    claimStatus: "new",
    coverageType: "",
    note: "",
    company: "",
    user_id: "",
    claim_category: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session);
    });
  }, []);

  // Generic input change handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isCertified) {
      alert("Please certify that the information is accurate.");
      return;
    }

    try {
      const dataForInsert: ClaimInsert = { ...formData };
      if (session) {
        dataForInsert.user_id = session.user.id;
      } else {
        dataForInsert.user_id = null;
      }

      const { error } = await supabase.from("claims").insert(dataForInsert);
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
      {/* SUCCESS DIALOG */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank you for submitting your claim!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p>Your submission has been received. Redirecting...</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Your Insurance Claim</h1>
          <div className="flex items-center justify-center gap-2">
            <Upload className="h-4 w-4" />
            <Link href="#" className="text-blue-600 hover:underline">
              Upload your claim documents to verify your submission
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Insurance Type</h2>
                <RadioGroup
                  defaultValue="health"
                  className="flex gap-4"
                  onValueChange={(value) =>
                    handleSelectChange("insuranceType", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="health" id="health" />
                    <Label htmlFor="health">Health</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="car" id="car" />
                    <Label htmlFor="car">Car</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Company</h2>
                <CompanySelect
                  value={formData.company}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, company: newValue }))
                  }
                ></CompanySelect>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Claim Details</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="claimDate">Date of Claim</Label>
                    <Input
                      id="claimDate"
                      type="date"
                      placeholder="Select date"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="claimAmount">Claim Amount</Label>
                    <Input
                      id="claimAmount"
                      placeholder="e.g. $2000"
                      type="number"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="claimDescription">Claim Description</Label>
                    <Textarea
                      id="claimDescription"
                      placeholder="Describe the incident or reason for claim"
                      className="h-24"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {formData.insuranceType === "car" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Coverage Type</h2>
                  <Select
                    onValueChange={(val) =>
                      handleSelectChange("coverageType", val)
                    }
                  >
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
              )}

              <div>
                <Label htmlFor="note">Additional Notes (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Any extra details about your claim..."
                  className="h-20"
                  onChange={handleInputChange}
                />
              </div>

              {/* CLAIM STATUS */}
              <div>
                <Label className="mb-2 block">Claim Status</Label>
                <RadioGroup
                  defaultValue="new"
                  className="flex gap-4"
                  onValueChange={(value) =>
                    handleSelectChange("claimStatus", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pending" id="in-progress" />
                    <Label htmlFor="in-progress">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Approved" id="approved" />
                    <Label htmlFor="approved">Approved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Denied" id="denied" />
                    <Label htmlFor="denied">Denied</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* CLAIM CATEGORY */}

              <div>
                <h2 className="text-xl font-semibold mb-4">Claim Category</h2>
                {formData.insuranceType === "car" ? (
                  <Select
                    onValueChange={(val) =>
                      handleSelectChange("claim_category", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Car Claim Cateogry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accident">Accident</SelectItem>
                      <SelectItem value="Theft">Theft</SelectItem>
                      <SelectItem value="Collision with Animal">
                        Collision with Animal
                      </SelectItem>
                      <SelectItem value="Vandalism">Vandalism</SelectItem>
                      <SelectItem value="Flood Damage">Flood Damage</SelectItem>
                      <SelectItem value="Windshield / Glass Damage">
                        Windshield / Glass Damage
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select
                    onValueChange={(val) =>
                      handleSelectChange("claim_category", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Health Claim Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospitalization">
                        Hospitalization
                      </SelectItem>
                      <SelectItem value="General Visit">
                        General Visit
                      </SelectItem>
                      <SelectItem value="Emergency Care">
                        Emergency Care
                      </SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Diagnostic Test">
                        Diagnostic Test
                      </SelectItem>
                      <SelectItem value="Medication Reimbursement">
                        Medication Reimbursement
                      </SelectItem>
                      <SelectItem value="Dental Care">Dental Care</SelectItem>
                      <SelectItem value="Mental Health">
                        Mental Health
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
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
              Submit Claim
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
