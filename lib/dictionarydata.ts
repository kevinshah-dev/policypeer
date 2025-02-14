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
];
