import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PolicyInformation() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          Available Insurance Policies
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              name: "Auto Insurance",
              description: "Comprehensive coverage for your vehicles",
              coverage: [
                "Collision Coverage",
                "Comprehensive Coverage",
                "Liability Protection",
                "Personal Injury Protection",
                "Uninsured Motorist Coverage",
              ],
              features: [
                "24/7 Roadside Assistance",
                "Rental Car Coverage",
                "Accident Forgiveness",
                "Safe Driver Discounts",
              ],
              startingPrice: "$89/month",
            },
            {
              name: "Home Insurance",
              description: "Protection for your home and personal property",
              coverage: [
                "Dwelling Coverage",
                "Personal Property Protection",
                "Liability Coverage",
                "Additional Living Expenses",
                "Medical Payments Coverage",
              ],
              features: [
                "Replacement Cost Coverage",
                "Extended Dwelling Coverage",
                "Bundling Discounts",
                "Home Security Discounts",
              ],
              startingPrice: "$125/month",
            },
            {
              name: "Life Insurance",
              description: "Financial security for your loved ones",
              coverage: [
                "Death Benefit",
                "Cash Value Accumulation",
                "Living Benefits",
                "Premium Waiver",
                "Accelerated Death Benefit",
              ],
              features: [
                "Flexible Premium Options",
                "Policy Conversion Options",
                "Multiple Beneficiaries",
                "Tax-Advantaged Growth",
              ],
              startingPrice: "$45/month",
            },
          ].map((policy) => (
            <AccordionItem key={policy.name} value={policy.name}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <span>{policy.name}</span>
                  <Badge variant="secondary">{policy.startingPrice}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 space-y-4">
                  <p className="text-muted-foreground">{policy.description}</p>

                  <div>
                    <h4 className="font-medium mb-2">Coverage Includes:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {policy.coverage.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {policy.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-muted-foreground"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
