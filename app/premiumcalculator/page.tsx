"use client";

import { useState } from "react";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { montserrat } from "@/lib/fonts/fonts";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import OpenAI from "openai";

type PremiumResult = {
  premium: string;
  range: string;
  providers: string[];
};

export default function PriceCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    zipCode: "",
    income: "",
    householdSize: "1",
    tobaccoUse: false,
    preExistingConditions: [] as string[],
    coverageLevel: "silver",
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e: any) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handlePreExistingConditionChange = (conditionId: any, checked: any) => {
    setFormData((prev) => ({
      ...prev,
      preExistingConditions: checked
        ? [...prev.preExistingConditions, conditionId]
        : prev.preExistingConditions.filter(
            (item: any) => item !== conditionId
          ),
    }));
  };

  const handleSelectChange = (fieldName: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    setIsCalculating(true);

    try {
      // Build a query string that includes all of the demographic information.
      const query = `Calculate the monthly health insurance premium for a person with the following details: 
      Age: ${formData.age}, 
      ZIP Code: ${formData.zipCode}, 
      Annual Income: ${formData.income}, 
      Household Size: ${formData.householdSize}, 
      Tobacco Use: ${formData.tobaccoUse ? "Yes" : "No"}, 
      Pre-existing Conditions: ${
        formData.preExistingConditions.length > 0
          ? formData.preExistingConditions.join(", ")
          : "None"
      }, 
      Coverage Level: ${formData.coverageLevel}. 
      Please return only the estimated monthly premium as a plain string.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "deepseek-chat",
      });

      if (!completion) {
        throw new Error(`DeepSeek API error:`);
      }
      console.log("complettions ", completion);
      const premium = completion.choices[0].message.content;
      setResult(premium);
    } catch (error) {
      console.error("Error querying DeepSeek:", error);
      console.log("error ", error);
      setResult("Error: Could not calculate premium");
    } finally {
      setIsCalculating(false);
    }
  }

  const conditions = [
    { id: "diabetes", label: "Diabetes" },
    { id: "hypertension", label: "Hypertension" },
    { id: "asthma", label: "Asthma" },
    { id: "heart-disease", label: "Heart Disease" },
    { id: "cancer", label: "Cancer History" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${montserrat.className}`}>
            Health Insurance Price Calculator
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get an estimate of what your health insurance should cost based on
            your demographics
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                <span>Calculate Your Premium</span>
              </CardTitle>
              <CardDescription>
                Enter your information to get an estimated health insurance
                premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                    />
                  </div>
                  {/* ZIP Code */}
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="Enter your ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                  </div>
                  {/* Annual Income */}
                  <div>
                    <Label htmlFor="income">Annual Income</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="$"
                      value={formData.income}
                      onChange={handleInputChange}
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Used to determine subsidy eligibility
                    </p>
                  </div>
                  {/* Household Size */}
                  <div>
                    <Label>Household Size</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("householdSize", value)
                      }
                      defaultValue={formData.householdSize}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select household size" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? "person" : "people"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tobacco Use */}
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <input
                    type="checkbox"
                    id="tobaccoUse"
                    checked={formData.tobaccoUse}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4"
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="tobaccoUse">Tobacco Use</Label>
                    <p className="text-sm text-muted-foreground">
                      Have you used tobacco products in the last 12 months?
                    </p>
                  </div>
                </div>

                {/* Pre-existing Conditions */}
                <div>
                  <div className="mb-4">
                    <Label className="text-base">Pre-existing Conditions</Label>
                    <p className="text-sm text-muted-foreground">
                      Select any conditions that apply
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {conditions.map((condition) => (
                      <div
                        key={condition.id}
                        className="flex flex-row items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          id={condition.id}
                          checked={formData.preExistingConditions.includes(
                            condition.id
                          )}
                          onChange={(e) =>
                            handlePreExistingConditionChange(
                              condition.id,
                              e.target.checked
                            )
                          }
                          className="h-4 w-4"
                        />
                        <Label htmlFor={condition.id}>{condition.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coverage Level */}
                <div>
                  <div className="flex items-center gap-1">
                    <Label>Coverage Level</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Bronze: Lower premiums, higher out-of-pocket costs
                          </p>
                          <p>
                            Silver: Moderate premiums and out-of-pocket costs
                          </p>
                          <p>
                            Gold: Higher premiums, lower out-of-pocket costs
                          </p>
                          <p>
                            Platinum: Highest premiums, lowest out-of-pocket
                            costs
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("coverageLevel", value)
                    }
                    defaultValue={formData.coverageLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className={`w-full bg-red-600 hover:bg-red-500 font-bold ${montserrat.className}`}
                  disabled={isCalculating}
                >
                  {isCalculating ? "Calculating..." : "Calculate Premium"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="mt-8 shadow-lg border-t-4 border-t-red-600">
              <CardHeader>
                <CardTitle>Your Estimated Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    Estimated Monthly Premium
                  </p>
                  <p className="text-5xl font-bold text-red-600">{result}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <p className="text-sm text-muted-foreground">
                  This is an estimate only. Actual premiums may vary based on
                  additional factors.
                </p>
                <Button variant="outline" className="mt-2">
                  Compare Plans
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <section className="py-8 container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">
              How accurate is this price calculator?
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Our calculator provides an estimate based on demographic
              information and typical market rates. Actual premiums may vary
              based on specific plan details, insurance company pricing models,
              and additional health factors.
            </p>
          </details>
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">
              Does this calculator consider subsidies?
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, we factor in potential ACA subsidies based on your income and
              household size. The estimated premium shown may reflect these
              potential savings.
            </p>
          </details>
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">
              What information is shared with insurance companies?
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              None. This calculator is for informational purposes only. Your
              data is not shared with any insurance companies or third parties.
              See our{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>{" "}
              for more details.
            </p>
          </details>
        </div>
      </section>
      <Footer />
    </div>
  );
}
