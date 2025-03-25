"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { navLinks } from "@/lib/navigation";
import { NavBar } from "@/components/navbar";

type Company = {
  id: number;
  name: string;
  premium: string;
  rating: number;
  insurance_type: string;
};

type CompaniesClientProps = {
  initialCompanies: Company[];
};

export default function CompaniesClient({
  initialCompanies,
}: CompaniesClientProps) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Company | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const router = useRouter();

  const getTagClasses = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("car")) {
      return "bg-blue-100 text-blue-800";
    } else if (lowerType.includes("health")) {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  // Filter the list
  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic
  const sorted = [...filtered];
  if (sortKey) {
    sorted.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      } else if (typeof valA === "string" && typeof valB === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return 0;
    });
  }

  function handleSort(key: keyof Company) {
    if (sortKey === key) {
      // toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // new key
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">All Insurance Companies</h1>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by Company Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>

        {/* Table */}
        <Card className="p-4 overflow-x-auto">
          <Table className="table-auto w-full border-collapse">
            <TableHeader>
              <TableRow className="border-b">
                <TableHead
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Company Name{" "}
                  {sortKey === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead className="px-4 py-2 text-left">
                  Premium Range
                </TableHead>
                <TableHead
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort("rating")}
                >
                  Rating{" "}
                  {sortKey === "rating" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead className="px-4 py-2 text-left">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((company) => (
                <TableRow
                  key={company.id}
                  className="border-b last:border-none cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    router.push(
                      `/companies/${company.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                    )
                  }
                >
                  <TableCell className="px-4 py-2 font-medium">
                    {company.name}
                  </TableCell>
                  <TableCell className="px-4 py-2">{company.premium}</TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {company.rating}
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagClasses(
                        company.insurance_type
                      )}`}
                    >
                      {company.insurance_type}
                    </span>
                  </TableCell>
                </TableRow>
              ))}

              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No companies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
