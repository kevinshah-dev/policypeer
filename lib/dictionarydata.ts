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
  {
    term: "National Average Drug Acquisition Cost (NADAC)",
    definition:
      "The National Average Drug Acquisition Cost (NADAC) is a pricing benchmark used by the Centers for Medicare & Medicaid Services (CMS) to determine the average cost that pharmacies pay for prescription drugs. It is based on actual acquisition costs reported by pharmacies and is used to set reimbursement rates for Medicaid and other government programs.",
    category: "Health Insurance",
    slug: slugify("nadac"),
  },
  {
    term: "Pharmacy Benefit Manager (PBM)",
    definition:
      "A Pharmacy Benefit Manager (PBM) is a third-party administrator of prescription drug programs for health plans, employers, and government programs. PBMs negotiate with drug manufacturers and pharmacies to manage drug benefits, control costs, and improve access to medications. They play a crucial role in determining which drugs are covered, the pricing of those drugs, and the reimbursement rates for pharmacies.",
    category: "Health Insurance",
    slug: slugify("pbm"),
  },
  {
    term: "Vision Insurance",
    definition:
      "Vision insurance is a type of health insurance that provides coverage for eye care services, including routine eye exams, glasses, and contact lenses. It helps offset the costs associated with maintaining good eye health and vision correction.",
    category: "Health Insurance",
    slug: slugify("vision-insurance"),
  },
  {
    term: "Special Needs Plans (SNPs)",
    definition:
      "Special Needs Plans (SNPs) are a type of Medicare Advantage plan designed specifically for individuals with certain chronic conditions, disabilities, or those who are dually eligible for Medicare and Medicaid. SNPs provide tailored healthcare services and support to meet the unique needs of these populations.",
    category: "Health Insurance",
    slug: slugify("snp"),
  },
  {
    term: "Small Business Plans",
    definition:
      "Small Business Plans are insurance policies designed to provide coverage for small businesses, including health insurance for employees, liability coverage, and property insurance. These plans help protect the business and its employees from financial losses due to unforeseen events.",
    category: "General",
    slug: slugify("smallbusinessplans"),
  },
];
