// app/companies/usaa/policy-information.tsx
"use client";

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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Policy = {
  id: string;
  company: string;
  premium: number;
  coverageType: string;
  deductible: number;
  coverageLimit: number;
  submissionType: string;
  planDetails: string;
  created_at: string;
};

export function PolicyInformation() {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .eq("company", "usaa")
        .order("created_at", { ascending: false });

      if (!error && data) setPolicies(data);
    };
    fetchPolicies();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Policies</h2>
          <Link href="/addhealthpolicy">
            <Button className="text-xs md:text-sm">Add Policy</Button>
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Deductible</TableHead>
                <TableHead>Coverage Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.coverageType}</TableCell>
                  <TableCell>{formatCurrency(policy.premium)}</TableCell>
                  <TableCell>{formatCurrency(policy.deductible)}</TableCell>
                  <TableCell>{formatCurrency(policy.coverageLimit)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
