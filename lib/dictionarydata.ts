//All short/long definitions here

export interface DictionaryEntry {
  term: string;
  definition: string;
  category?: string;
  slug: string;
}

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export const DICTIONARY_DATA: DictionaryEntry[] = [
  {
    term: "Premium",
    definition:
      "The amount you pay for your insurance policy, typically monthly or annually.",
    category: "General",
    slug: slugify("Premium"),
  },
  {
    term: "Deductible",
    definition:
      "The amount you pay out-of-pocket before your insurance covers the remaining costs.",
    category: "General",
    slug: slugify("Deductible"),
  },
  {
    term: "Claim",
    definition:
      "A request made by the policyholder to the insurance company for compensation based on the policy terms.",
    category: "General",
    slug: slugify("Claim"),
  },
  {
    term: "Underwriting",
    definition:
      "The process by which an insurer evaluates the risk of insuring a home, car, driver, or individual's health or life.",
    category: "General",
    slug: slugify("Underwriting"),
  },
  {
    term: "Endorsement",
    definition:
      "An amendment or addition to an existing insurance policy that changes the terms or coverage.",
    category: "General",
    slug: slugify("Endorsement"),
  },
  {
    term: "Exclusion",
    definition:
      "Specific conditions or circumstances for which the policy does not provide coverage.",
    category: "General",
    slug: slugify("Exclusion"),
  },
  {
    term: "Health Maintenance Organization (HMO)",
    definition:
      "A health maintenance organization (HMO) is a medical insurance network that provides health services through a specific group of contracted healthcare providers for a fixed fee, typically requiring members to use in-network doctors and get referrals from a primary care physician for specialist visits",
    category: "Health Insurance",
    slug: slugify("hmo"),
  },
  {
    term: "Medicare Advantage",
    definition:
      "A Medicare Advantage is a type of Medicare coverage that is provided by private insurance companies. These plans offer additional benefits and services beyond the standard Medicare coverage, such as prescription drug coverage, vision, and dental care. They are typically more expensive than traditional Medicare, but they provide more comprehensive coverage.",
    category: "Health Insurance",
    slug: slugify("medicare-advantage"),
  },
  {
    term: "Supplemental Insurance",
    definition:
      "Supplemental insurance provides additional coverage to help pay for out-of-pocket expenses, such as deductibles and copayments, that your primary health plan might not fully cover. It acts as a financial safety net, ensuring you have extra protection for specific health events or conditions that could otherwise result in significant costs. ",
    category: "Health Insurance",
    slug: slugify("supplemental-insurance"),
  },
];
