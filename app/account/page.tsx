"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { montserrat } from "@/lib/fonts/fonts"
import Link from "next/link"

type Claim = {
  id: number
  claimDescription: string
  claimDate: string
  claimAmount: string
  status: string
}
type Policy = {
  id: number
  policyType: string
  createdAt: string
  premium: string
  coverageType?: string
}

export default function MyAccountPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [claims, setClaims] = useState<Claim[]>([])
  const [policies, setPolicies] = useState<Policy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login")
      } else {
        setSession(data.session)
      }
    })
  }, [router])

  useEffect(() => {
    if (!session) return

    async function fetchData() {
      try {
        setLoading(true)

        // Fetch claims by user id
        const { data: userClaims, error: claimsError } = await supabase
          .from("claims")
          .select("*")
          .eq("user_id", session.user.id) // Adjust column name if needed
        if (claimsError) throw claimsError
        setClaims(userClaims || [])

        // Fetch policies by user id
        const { data: userPolicies, error: policiesError } = await supabase
          .from("policies")
          .select("*")
          .eq("user_id", session.user.id) // Adjust column name if needed
        if (policiesError) throw policiesError
        setPolicies(userPolicies || [])

      } catch (err: any) {
        console.error("Error fetching data:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [session])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (!session) {
    return null
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${montserrat.className}`}>
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Account</h1>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            Home
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Welcome, {session.user?.email ?? "User"}!
          </h2>
          <p className="text-sm text-muted-foreground">
            Here you can review your claims, policies, and manage your account.
          </p>
        </div>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Claims</h3>
            <Link href="/addclaim">
              <Button variant="outline" size="sm">
                Submit New Claim
              </Button>
            </Link>
          </div>
          {loading ? (
            <p>Loading Claims...</p>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm">Claim</TableHead>
                    <TableHead className="text-sm">Date Filed</TableHead>
                    <TableHead className="text-sm">Amount</TableHead>
                    <TableHead className="text-sm">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id} className="transition-colors">
                      <TableCell className="text-sm">
                        {claim.claimDescription}
                      </TableCell>
                      <TableCell className="text-sm">
                        {claim.claimDate}
                      </TableCell>
                      <TableCell className="text-sm">
                        {claim.claimAmount}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            claim.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : claim.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : claim.status === "denied"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {claim.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {claims.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-sm text-center">
                        You have no claims submitted.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Policies</h3>
            <Link href="/addpolicytype">
              <Button variant="outline" size="sm">
                Add New Policy
              </Button>
            </Link>
          </div>
          {loading ? (
            <p>Loading Policies...</p>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm">Policy Type</TableHead>
                    <TableHead className="text-sm">Created At</TableHead>
                    <TableHead className="text-sm">Premium</TableHead>
                    <TableHead className="text-sm">Coverage Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy) => (
                    <TableRow key={policy.id} className="transition-colors">
                      <TableCell className="text-sm">
                        {policy.policyType}
                      </TableCell>
                      <TableCell className="text-sm">
                        {policy.createdAt}
                      </TableCell>
                      <TableCell className="text-sm">
                        {policy.premium}
                      </TableCell>
                      <TableCell className="text-sm">
                        {policy.coverageType ?? "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {policies.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-sm text-center">
                        You have no policies yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        <div className="pt-4 border-t flex justify-end">
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-500">
            Logout
          </Button>
        </div>
      </main>
    </div>
  )
}
