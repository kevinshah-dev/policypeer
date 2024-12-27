
'use client'

import { Search, Star, Share2, Zap, CircleDollarSign } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompanyCard from "@/components/company-card"
import { useState, useEffect } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
//import MobileNav from '@/lib/mobile/mobilenav'
import { NavBar } from '@/components/navbar'
import { navLinks } from '@/lib/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type InsuranceProvider = {
  name: string
  premium: string
  isMostViewed?: boolean
  rating: number
}

type InsuranceProviders = {
  car: InsuranceProvider[];
  health: InsuranceProvider[];
}

type NavLink = {
    slug: string;
    name: string;
    premium: string;
    isMostViewed?: boolean;
    rating: number;
  }
  

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-")
}


export default function Home() {

  const insuranceProviders: InsuranceProviders = {
    car: [
      { name: "State Farm", premium: "$50 - $124/mo", isMostViewed: true, rating: 4.4 },
      { name: "GEICO", premium: "$40 - $131/mo", rating: 4.2 },
      { name: "Progressive", premium: "$58 - $169/mo", rating: 3.8 },
      { name: "Allstate", premium: "$71 - $215/mo", rating: 3.4 },
      { name: "USAA", premium: "$45 - $115/mo", rating: 4.8 },
      { name: "Liberty Mutual", premium: "$120 - $260/mo", rating: 3.2 },
      { name: "Travelers", premium: "$58 - $180/mo", rating : 3.7 },
      { name: "Nationwide", premium: "$69 - $143/mo", rating: 4.1 },
      { name: "Farmers Insurance", premium: "$78 - $251/mo", rating: 3.3 },
    ],
    health: [
      { name: "UnitedHealthcare", premium: "$250 - $524/mo", isMostViewed: true, rating: 2.8 },
      { name: "Elevance Health", premium: "$280 - $631/mo", rating: 2.1 },
      { name: "Aetna", premium: "$258 - $469/mo", rating: 2.3 },
      { name: "Cigna", premium: "$271 - $515/mo", rating: 2.4 },
      { name: "Humana", premium: "$245 - $415/mo", rating: 3.1 },
      { name: "Kaiser Permanente", premium: "$320 - $560/mo", rating:  3.9},
    ]
  }

  const allCompanies = [
    ...insuranceProviders.car,
    ...insuranceProviders.health,
  ].map((company) => ({
    ...company,
    slug: slugify(company.name),
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<NavLink[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredResults([]);
      return;
    }

    const results = allCompanies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredResults(results);
  }, [searchTerm]);

  const [selectedInsurance, setSelectedInsurance] = useState<'car' | 'health'>('health');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">Make Smarter Insurance Decisions With Real Data</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Compare actual insurance policies and prices from users nationwide
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by Company"
              className="pl-10 h-12 rounded-full shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredResults.length > 0 && (
              <Card className="absolute top-14 left-0 w-full z-10 mt-1">
                <CardContent className="p-0">
                  {filteredResults.map((company) => (
                    <Link
                      key={company.slug}
                      href={`/companies/${company.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span>{company.name}</span>
                        <Badge variant="outline">{company.premium}</Badge>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/addpolicytype">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 font-bold rounded-full">
                Add Your Policy
              </Button>
            </Link>
            <Link href="/addclaim">
              <Button size="lg" className="bg-red-600 hover:bg-red-500 font-bold rounded-full">
                Add Your Claim
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">Trending Providers</h2>
            <Select 
              value={selectedInsurance} 
              onValueChange={(value) => setSelectedInsurance(value as 'car' | 'health')}
            >
              <SelectTrigger className="border border-blue-200 rounded-full px-4 hover:bg-transparent focus:ring-0 shadow-none font-bold text-lg text-blue-700 mt-2 sm:mt-0">
                <SelectValue placeholder="Select insurance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car Insurance</SelectItem>
                <SelectItem value="health">Health Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center mt-6">
            <Button variant="outline" className="rounded-full">View All Providers</Button>
          </div>
        </div>
      </main>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why PolicyPeer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Zap, title: "Compare", description: "Find real rates from across the country." },
              { icon: Star, title: "Rate", description: "Share your experience & rate your provider." },
              { icon: Share2, title: "Share Claims", description: "Help others learn from real claim stories." },
              { icon: CircleDollarSign, title: "Save", description: "Make smarter decisions with transparent data." },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <item.icon className="mx-auto mb-4 h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                question: "How do we get these premium ranges?",
                answer: "We gather data from real users who submit their policies and verified claims..."
              },
              {
                question: "Is my personal information secure?",
                answer: "We keep your personal data completely anonymous."
              },
            ].map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <details className="group">
                  <summary className="cursor-pointer font-medium p-4 flex justify-between items-center">
                    {faq.question}
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <p className="p-4 pt-0 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
