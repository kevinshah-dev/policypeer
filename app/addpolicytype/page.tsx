"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, HeartPulse } from "lucide-react"
import { useRouter } from "next/navigation"
import { montserrat } from "@/lib/fonts/fonts"
import { NavBar } from "@/components/navbar"
import { navLinks } from "@/lib/navigation"

export default function AddPolicyType() {
  const router = useRouter();
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">What Type of Policy Are You Adding?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="border rounded-lg bg-white p-6 shadow-sm flex flex-col items-center text-center">
            <Car className="h-16 w-16 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Car Insurance</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add details about your auto insurance coverage, premiums, 
              and claim experiences.
            </p>
            <Link href="/addcarpolicy">
              <Button className="bg-red-600 hover:bg-red-500 font-bold">
                Continue
              </Button>
            </Link>
          </div>

          <div className="border rounded-lg bg-white p-6 shadow-sm flex flex-col items-center text-center">
            <HeartPulse className="h-16 w-16 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Health Insurance</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Provide your health plan information, monthly premiums, 
              and any claim insights.
            </p>
            <Link href="/addclaim?type=health">
              <Button className="bg-red-600 hover:bg-red-500 font-bold">
                Continue
              </Button>
            </Link>
          </div>

        </div>
        <div className="text-center mt-16">
            <Button onClick={() => router.back()} className="bg-red-600 hover:bg-red-500 font-bold">
                Go Back
            </Button>
        </div>
      </main>
    </div>
  )
}
