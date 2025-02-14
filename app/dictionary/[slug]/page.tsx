// app/dictionary/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";

// If you already have your dictionary data defined elsewhere, import it.
// For this example, we'll recreate it here.
const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

interface DictionaryEntry {
  term: string;
  definition: string;
  category?: string;
  slug: string;
}

const DICTIONARY_DATA: DictionaryEntry[] = [
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

export default function DictionaryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const entry = DICTIONARY_DATA.find((entry) => entry.slug === slug);

  // If the entry is not found, you can render a 404 page.
  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/dictionary"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dictionary
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">{entry.term}</h1>
        <p className="text-lg mb-4">{entry.definition}</p>
        {entry.category && (
          <Badge variant="secondary" className="mb-4">
            {entry.category}
          </Badge>
        )}
      </main>
    </div>
  );
}
