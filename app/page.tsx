'use client'

import { Search, Star, Share2, Save, Zap } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompanyCard from "@/components/company-card"
import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'


type InsuranceProvider = {
  name: string
  premium: string
  isPromoted?: boolean
  rating: number
}

type InsuranceProviders = {
  car: InsuranceProvider[];
  health: InsuranceProvider[];
}


export default function Home() {

  const insuranceProviders: InsuranceProviders = {
    car: [
      { name: "State Farm", premium: "$50 - $124/mo", isPromoted: true, rating: 4.4 },
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
      { name: "UnitedHealthcare", premium: "$250 - $524/mo", isPromoted: true, rating: 2.8 },
      { name: "Anthem", premium: "$280 - $631/mo", rating: 2.1 },
      { name: "Aetna", premium: "$258 - $469/mo", rating: 2.3 },
      { name: "Cigna", premium: "$271 - $515/mo", rating: 2.4 },
      { name: "Humana", premium: "$245 - $415/mo", rating: 3.1 },
      { name: "Kaiser Permanente", premium: "$320 - $560/mo", rating:  3.9},
    ]
  }

  const [selectedInsurance, setSelectedInsurance] = useState<'car' | 'health'>('health');


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 -ml-3">
            <Link href="/" className="text-xl font-bold text-red-600">
              PolicyPeer
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/companies" className="text-sm font-medium text-red-600 hover:text-red-500">
                Companies
              </Link>
              <Link href="/quotes" className="text-sm font-medium text-red-600 hover:text-red-500">
                Quotes
              </Link>
              <Link href="/privacy" className="text-sm font-medium text-red-600 hover:text-red-500">
                Privacy Policy
              </Link>
              <Link href="/support" className="text-sm font-medium text-red-600 hover:text-red-500">
                Support
              </Link>
            </nav>
          </div>
          <Link href="/login">
              <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Make Smarter Insurance Decisions With Real Data</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Compare actual insurance policies and prices from users nationwide
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by Company"
              className="pl-10 h-12"
            />
          </div>
          <div className="mt-4 flex justify-center">
              <Link href="/addclaim">
                <Button size="lg" className="bg-red-600 hover:bg-red-500 font-bold">
                  Add Your Policy
                </Button>
              </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Trending</h2>
              <Select 
                value={selectedInsurance} 
                onValueChange={(value) => setSelectedInsurance(value as 'car' | 'health')}
              >
                <SelectTrigger className="border border-red-200 rounded-md px-2 hover:bg-transparent focus:ring-0 shadow-none font-bold text-2xl text-red-700">
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                </SelectContent>
              </Select>
              <h2 className="text-2xl font-bold">Providers</h2>
            </div>
            <Button variant="link">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insuranceProviders[selectedInsurance].map((provider) => (
              <CompanyCard
                key={provider.name}
                company={provider.name}
                premium={provider.premium}
                isPromoted={provider.isPromoted}
                rating={provider.rating}
              />
            ))}
          </div>      
      </main>
      <section className="py-8">
  <h2 className="text-2xl font-bold mb-4 text-center">How PolicyPeer Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
    <div>
    <Zap className="mx-auto mb-2" />
      <h3 className="font-semibold">Compare</h3>
      <p className="text-sm text-muted-foreground">Find real rates from across the country.</p>
    </div>
    <div>
    <Star className="mx-auto mb-2" />
      <h3 className="font-semibold">Rate</h3>
      <p className="text-sm text-muted-foreground">Share your experience & rate your provider.</p>
    </div>
    <div>
    <Share2 className="mx-auto mb-2" />
      <h3 className="font-semibold">Share Claims</h3>
      <p className="text-sm text-muted-foreground">Help others learn from real claim stories.</p>
    </div>
    <div>
    <Save className="mx-auto mb-2" />
      <h3 className="font-semibold">Save</h3>
      <p className="text-sm text-muted-foreground">Make smarter decisions with transparent data.</p>
    </div>
  </div>
</section>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">How do we get these premium ranges?</summary>
            <p className="mt-2 text-sm text-muted-foreground">
              We gather data from real users who submit their policies and verified claims...
            </p>
          </details>
          <details className="border-b pb-2">
            <summary className="cursor-pointer font-medium">Is my personal information secure?</summary>
            <p className="mt-2 text-sm text-muted-foreground">
              We keep your personal data completely anonymous.
            </p>
          </details>
        </div>
      </section>
    </div>
  )
}
