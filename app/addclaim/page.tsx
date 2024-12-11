'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { Upload } from 'lucide-react'

export default function AddInsuranceClaim() {
  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Add Your Insurance Claim</h1>
        <div className="flex items-center justify-center gap-2">
          <Upload className="h-4 w-4" />
          <Link href="#" className="text-blue-600 hover:underline">
            Upload your policy document to verify your submission
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Enhance Privacy and Anonymity</h2>
              <Switch />
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically hides specific fields until there are enough submissions to safely display the full details.{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                More Details
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Insurance Provider & Plan Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Insurance Company</Label>
                  <Input id="company" placeholder="e.g. State Farm, GEICO" />
                </div>
                <div>
                  <Label htmlFor="plan-type">Plan Type</Label>
                  <Input id="plan-type" placeholder="e.g. Auto Insurance, Home Insurance" />
                </div>
                <div>
                  <Label htmlFor="premium">Monthly Premium</Label>
                  <Input id="premium" placeholder="e.g. $150" type="number" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Coverage Details</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="coverage-type">Coverage Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      <SelectItem value="collision">Collision</SelectItem>
                      <SelectItem value="liability">Liability</SelectItem>
                      <SelectItem value="full">Full Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deductible">Deductible Amount</Label>
                  <Input id="deductible" placeholder="e.g. $500" type="number" />
                </div>
                <div>
                  <Label htmlFor="coverage-limit">Coverage Limit</Label>
                  <Input id="coverage-limit" placeholder="e.g. $100,000" type="number" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="plan-details">Plan Details</Label>
                  <Textarea
                    id="plan-details"
                    placeholder="Describe any additional coverage, special terms, or notable features of your plan"
                    className="h-24"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Submission Type</Label>
                  <RadioGroup defaultValue="new" className="flex gap-4">
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

          <Button className="w-full mt-8">Submit Insurance Information</Button>
        </CardContent>
      </Card>
    </div>
  )
}