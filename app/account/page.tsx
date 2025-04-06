"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { montserrat } from "@/lib/fonts/fonts";
import Link from "next/link";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";

type Claim = {
  id: number;
  claimDescription: string;
  claimDate: string;
  claimAmount: string;
  status: string;
};
type Policy = {
  id: number;
  policyType: string;
  createdAt: string;
  premium: string;
  coverageType?: string;
};

export default function MyAccountPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [demographicData, setDemographicData] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: "",
    dob: "",
    city: "",
    country: "",
    gender: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login");
      } else {
        setSession(data.session);
      }
    });
  }, [router]);

  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      try {
        setLoading(true);

        // Fetch claims by user id
        const { data: userClaims, error: claimsError } = await supabase
          .from("claims")
          .select("*")
          .eq("user_id", session.user.id);
        if (claimsError) throw claimsError;
        setClaims(userClaims || []);

        // Fetch policies by user id
        const { data: userPolicies, error: policiesError } = await supabase
          .from("policies")
          .select("*")
          .eq("user_id", session.user.id);
        if (policiesError) throw policiesError;
        setPolicies(userPolicies || []);
      } catch (err: any) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }

      const { data: userDemo, error: demoError } = await supabase
        .from("userdemo")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!demoError && userDemo?.length) {
        setDemographicData(userDemo[0]);
        setFormData({
          age: userDemo[0].age?.toString() || "",
          dob: userDemo[0].dob || "",
          city: userDemo[0].city || "",
          country: userDemo[0].country || "",
          gender: userDemo[0].gender || "",
        });
      }
    }

    fetchData();
  }, [session]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("handle submit hitting");
      const { error } = await supabase.from("userdemo").insert([
        {
          ...formData,
          user_id: session?.user?.id,
        },
      ]);

      if (error) throw error;
      alert("Demographic Data Saved Successfully");
    } catch (error) {
      console.error("Error saving demographic data:", error);
      alert("Error saving demographic data. Please try again.");
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />
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

        <Card className="mb-8 p-6">
          <h2 className={`${montserrat.className} text-xl font-semibold mb-4`}>
            Demographic Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Country</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Gender</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Button type="submit" className="mt-4">
              Save Demographic Information
            </Button>
          </form>
        </Card>

        <div className="pt-4 border-t flex justify-end">
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500"
          >
            Logout
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
