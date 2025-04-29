"use client";

import { Search, Star, Share2, Zap, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CompanyCard from "@/components/company-card";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
//import MobileNav from '@/lib/mobile/mobilenav'
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { montserrat } from "@/lib/fonts/fonts";
import Footer from "@/components/footer";

type InsuranceProvider = {
  name: string;
  premium: string;
  isMostViewed?: boolean;
  rating: number;
};

type InsuranceProviders = {
  car: InsuranceProvider[];
  health: InsuranceProvider[];
  home: InsuranceProvider[];
  notFeatured?: InsuranceProvider[];
};

type NavLink = {
  slug: string;
  name: string;
  premium: string;
  isMostViewed?: boolean;
  rating: number;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function Home() {
  const insuranceProviders: InsuranceProviders = {
    car: [
      {
        name: "State Farm",
        premium: "$50 - $124/mo",
        isMostViewed: true,
        rating: 4.4,
      },
      { name: "GEICO", premium: "$40 - $131/mo", rating: 4.2 },
      { name: "Progressive", premium: "$58 - $169/mo", rating: 3.8 },
      { name: "Allstate", premium: "$71 - $215/mo", rating: 3.4 },
      { name: "USAA", premium: "$45 - $115/mo", rating: 4.8 },
      { name: "Liberty Mutual", premium: "$120 - $260/mo", rating: 3.2 },
      { name: "Travelers", premium: "$58 - $180/mo", rating: 3.7 },
      { name: "Nationwide", premium: "$69 - $143/mo", rating: 4.1 },
      { name: "Farmers Insurance", premium: "$78 - $251/mo", rating: 3.3 },
    ],
    health: [
      {
        name: "UnitedHealthcare",
        premium: "$250 - $524/mo",
        isMostViewed: true,
        rating: 2.8,
      },
      { name: "Elevance Health", premium: "$280 - $631/mo", rating: 2.1 },
      { name: "Aetna", premium: "$258 - $469/mo", rating: 2.3 },
      { name: "Cigna", premium: "$271 - $515/mo", rating: 2.4 },
      { name: "Humana", premium: "$245 - $415/mo", rating: 3.1 },
      { name: "Kaiser Permanente", premium: "$320 - $560/mo", rating: 3.9 },
    ],
    home: [
      {
        name: "State Farm Home",
        premium: "$140 - $252/mo",
        rating: 4.2,
        isMostViewed: true,
      },
      { name: "The Hartford", premium: "$111 - $317/mo", rating: 4.0 },
      { name: "American Family", premium: "$66 - $232/mo", rating: 4.2 },
      { name: "Chubb", premium: "$82 - $470/mo", rating: 4.1 },
      { name: "Farmers Home", premium: "$216 - $317/mo", rating: 3.8 },
      { name: "Amica", premium: "$125 - $251/mo", rating: 4.3 },
    ],
    notFeatured: [
      { name: "Oscar Health", premium: "500 - $750/mo", rating: 2.7 },
    ],
  };

  const allCompanies = [
    ...insuranceProviders.car,
    ...insuranceProviders.health,
    ...insuranceProviders.home,
  ].map((company) => ({
    ...company,
    slug: slugify(company.name),
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<NavLink[]>([]);

  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredResults([]);
      return;
    }

    const results = allCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // If ref is set and the clicked element is not inside the search container
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFilteredResults([]); // Clear results
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selectedInsurance, setSelectedInsurance] = useState<
    "car" | "health" | "home"
  >("health");

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h1
            className={`text-4xl font-bold mb-4 text-center ${montserrat.className}`}
          >
            Take Control of Your Insurance
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Compare real prices & policies from actual users
          </p>
          <div ref={searchRef} className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="e.g. UnitedHealthcare, Cigna, State Farm"
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredResults.length > 0 && (
              <Card className="absolute top-10 left-0 w-full z-10 mt-1 shadow-xl rounded-lg border bg-white">
                <CardContent className="p-0">
                  {filteredResults.map((company) => (
                    <Link
                      key={company.slug}
                      href={`/companies/${company.slug}`}
                      className="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors text-base"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{company.name}</span>
                        <Badge variant="outline" className="text-sm py-1 px-2">
                          {company.premium}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/addpolicytype" className="w-full sm:w-auto">
              <Button
                size="lg"
                className={`w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold text-lg py-3 px-6 ${montserrat.className}`}
              >
                Add Your Policy
              </Button>
            </Link>
            <Link href="/addclaim" className="w-full sm:w-auto">
              <Button
                size="lg"
                className={`w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold text-lg py-3 px-6 ${montserrat.className}`}
              >
                Add Your Claim
              </Button>
            </Link>
          </div>
          <p className="text-center mt-4 text-gray-600 text-sm italic">
            Help others by sharing your experience
          </p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h2 className="text-2xl font-bold sm:mr-2">Trending</h2>
            <Select
              value={selectedInsurance}
              onValueChange={(value) =>
                setSelectedInsurance(value as "car" | "health" | "home")
              }
            >
              <SelectTrigger className="border border-red-200 rounded-md px-2 hover:bg-transparent focus:ring-0 shadow-none font-bold text-2xl text-red-700">
                <SelectValue placeholder="Select insurance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car Insurance</SelectItem>
                <SelectItem value="health">Health Insurance</SelectItem>
                <SelectItem value="home">Home Insurance</SelectItem>
              </SelectContent>
            </Select>
            <h2 className="text-2xl font-bold sm:ml-2"> Providers</h2>
          </div>
          <Link href="/companies">
            <Button variant="link">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insuranceProviders[selectedInsurance].map((provider) => (
            <CompanyCard
              key={provider.name}
              company={provider.name}
              premium={provider.premium}
              isMostViewed={provider.isMostViewed}
              rating={provider.rating}
            />
          ))}
        </div>
      </main>
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Why PolicyPeer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <Zap className="mx-auto mb-2" />
            <h3 className="font-semibold">Compare</h3>
            <p className="text-sm text-muted-foreground">
              Find real policy data to see how insurers stack up.
            </p>
          </div>
          <div>
            <Star className="mx-auto mb-2" />
            <h3 className="font-semibold">Reveal</h3>
            <p className="text-sm text-muted-foreground">
              Uncover unfair practices through crowdsourced data.
            </p>
          </div>
          <div>
            <Share2 className="mx-auto mb-2" />
            <h3 className="font-semibold">Share Claims</h3>
            <p className="text-sm text-muted-foreground">
              Join us in exposing fraud through sharing your experience.
            </p>
          </div>
          <div>
            <CircleDollarSign className="mx-auto mb-2" />
            <h3 className="font-semibold">Save</h3>
            <p className="text-sm text-muted-foreground">
              Make smarter decisions with transparent data.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">
              How do we get these premium ranges?
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              We gather data from real users who submit their policies and
              verified claims. We also aggregate data from public claims
              databases and forums.
            </p>
          </details>
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">
              Is my personal information secure?
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">
              We keep your personal data completely anonymous. Read our{" "}
              <a
                href="https://policypeer.org/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>{" "}
              for more information.
            </p>{" "}
          </details>
        </div>
      </section>
      <Footer />
    </div>
  );
}
