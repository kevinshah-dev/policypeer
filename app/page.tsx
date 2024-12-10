import { Search } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompanyCard from "@/components/company-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 flex h-16 items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              Premio
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/companies" className="text-sm font-medium">
                Companies
              </Link>
              <Link href="/quotes" className="text-sm font-medium">
                Quotes
              </Link>
              <Link href="/services" className="text-sm font-medium">
                Services
              </Link>
              <Link href="/community" className="text-sm font-medium">
                Community
              </Link>
            </nav>
            <Button>Sign In</Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Stop Getting Scammed by Insurance Companies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Compare actual insurance policies and prices from users nationwide
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by Company, Title or City"
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trending Providers</h2>
            <Button variant="link">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CompanyCard
              company="State Farm"
              salary="$174K - $194K"
              isPromoted
            />
            <CompanyCard
              company="GEICO"
              salary="$176,000"
            />
            <CompanyCard
              company="Progressive"
              salary="$191,800"
            />
            <CompanyCard
              company="Allstate"
              salary="$450,000"
            />
            <CompanyCard
              company="USAA"
              salary="$185,700"
            />
            <CompanyCard
              company="Liberty Mutual"
              salary="$210,000"
            />
            <CompanyCard
              company="Travelers"
              salary="$180,000"
            />
            <CompanyCard
              company="Nationwide"
              salary="$165,000"
            />
            <CompanyCard
              company="Farmers Insurance"
              salary="$240,000"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
