'use client'

import { useState } from "react"
import { NavBar } from '@/components/navbar'
import { navLinks } from '@/lib/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from "next/link" 
import { montserrat } from '@/lib/fonts/fonts'

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-")

interface DictionaryEntry {
  term: string
  definition: string
  category?: string
  slug: string
}

const DICTIONARY_DATA: DictionaryEntry[] = [
  {
    term: "Premium",
    definition: "The amount you pay for your insurance policy, typically monthly or annually.",
    category: "General",
    slug: slugify("Premium"),
  },
  {
    term: "Deductible",
    definition: "The amount you pay out-of-pocket before your insurance covers the remaining costs.",
    category: "General",
    slug: slugify("Deductible"),
  },
  {
    term: "Claim",
    definition: "A request made by the policyholder to the insurance company for compensation based on the policy terms.",
    category: "General",
    slug: slugify("Claim"),
  },
  {
    term: "Underwriting",
    definition: "The process by which an insurer evaluates the risk of insuring a home, car, driver, or individual's health or life.",
    category: "General",
    slug: slugify("Underwriting"),
  },
  {
    term: "Endorsement",
    definition: "An amendment or addition to an existing insurance policy that changes the terms or coverage.",
    category: "General",
    slug: slugify("Endorsement"),
  },
  {
    term: "Exclusion",
    definition: "Specific conditions or circumstances for which the policy does not provide coverage.",
    category: "General",
    slug: slugify("Exclusion"),
  },
]

export default function InsuranceDictionary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEntries, setFilteredEntries] = useState<DictionaryEntry[]>([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim() === "") {
      setFilteredEntries([])
    } else {
      const results = DICTIONARY_DATA.filter(entry =>
        entry.term.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredEntries(results)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${montserrat.className}`}>Insurance Dictionary</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Understand insurance terms to make informed decisions.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for a term..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {filteredEntries.length > 0 ? (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.slug} className="p-6 shadow-md rounded-lg">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-2">{entry.term}</h2>
                  <p className="text-md text-gray-700">{entry.definition}</p>
                  {entry.category && (
                    <Badge variant="secondary" className="mt-4">
                      {entry.category}
                    </Badge>
                  )}
                  {/* Learn More Button */}
                  <div className="mt-4">
                    <Link href={`/dictionary/${entry.slug}`}>
                      <Button variant="secondary" className="font-semibold">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          searchTerm && (
            <div className="text-center text-gray-500 mt-8">
              <p>No definitions found for "<span className="font-semibold">{searchTerm}</span>".</p>
            </div>
          )
        )}
      </main>
    </div>
  )
}
