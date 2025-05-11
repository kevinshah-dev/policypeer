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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  const [activeTab, setActiveTab] = useState("claims");
  const [formData, setFormData] = useState({
    age: "",
    dob: "",
    city: "",
    country: "",
    gender: "",
    occupation: "",
    education: "",
    maritalStatus: "",
    annualIncome: "",
    phoneNumber: "",
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
          occupation: userDemo[0].occupation || "",
          education: userDemo[0].education || "",
          maritalStatus: userDemo[0].maritalStatus || "",
          annualIncome: userDemo[0].annualIncome || "",
          phoneNumber: userDemo[0].phoneNumber || "",
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
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6 max-w-7xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user?.email ?? "User"}!
          </h2>
          <p className="text-sm text-gray-600">
            Manage your insurance policies, claims, and personal information
          </p>
        </div>

        {/* New Modern Tab Design */}
        <div className="relative">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8">
            {[
              { id: "claims", label: "Claims", icon: "📋" },
              { id: "policies", label: "Policies", icon: "📄" },
              { id: "profile", label: "Profile", icon: "👤" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  "hover:bg-gray-50",
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                    : "text-gray-600"
                )}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 rounded bg-blue-600"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="relative">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "claims" && (
                <Card className="p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Your Claims
                    </h3>
                    <Link href="/addclaim">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Submit New Claim
                      </Button>
                    </Link>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="overflow-y-auto max-h-[60vh]">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-sm font-semibold">
                              Claim
                            </TableHead>
                            <TableHead className="text-sm font-semibold">
                              Date Filed
                            </TableHead>
                            <TableHead className="text-sm font-semibold">
                              Amount
                            </TableHead>
                            <TableHead className="text-sm font-semibold">
                              Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {claims.map((claim) => (
                            <TableRow
                              key={claim.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
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
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                              <TableCell
                                colSpan={4}
                                className="text-sm text-center py-8"
                              >
                                You have no claims submitted.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </Card>
              )}

              {activeTab === "policies" && (
                <Card className="p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Your Policies
                    </h3>
                    <Link href="/addpolicytype">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Add New Policy
                      </Button>
                    </Link>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="overflow-y-auto max-h-[60vh]">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-sm font-semibold">
                              Policy Type
                            </TableHead>
                            <TableHead className="text-sm font-semibold">
                              Created At
                            </TableHead>
                            <TableHead className="text-sm font-semibold">
                              Premium
                            </TableHead>
                            <TableHead className="text-sm font-semibold">
                              Coverage Type
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {policies.map((policy) => (
                            <TableRow
                              key={policy.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
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
                              <TableCell
                                colSpan={4}
                                className="text-sm text-center py-8"
                              >
                                You have no policies yet.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </Card>
              )}

              {activeTab === "profile" && (
                <Card className="p-6 shadow-sm border border-gray-100">
                  <h2
                    className={`${montserrat.className} text-2xl font-semibold mb-6 text-gray-900`}
                  >
                    Profile Information
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          type="number"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={formData.dob}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Input
                          type="text"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData({ ...formData, gender: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Input
                          type="text"
                          value={formData.occupation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              occupation: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Education</Label>
                        <Select
                          value={formData.education}
                          onValueChange={(value) =>
                            setFormData({ ...formData, education: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Education Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">
                              High School
                            </SelectItem>
                            <SelectItem value="bachelors">
                              Bachelor's Degree
                            </SelectItem>
                            <SelectItem value="masters">
                              Master's Degree
                            </SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Marital Status</Label>
                        <Select
                          value={formData.maritalStatus}
                          onValueChange={(value) =>
                            setFormData({ ...formData, maritalStatus: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Marital Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Annual Income</Label>
                        <Input
                          type="text"
                          value={formData.annualIncome}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              annualIncome: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Profile
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
