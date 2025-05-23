// app/companies/aetna/policy-information.tsx
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

type HealthPolicy = {
  id: string;
  company: string;
  premium: number;
  coverageType: string;
  deductible: number;
  coverageLimit: number;
  submissionType: string;
  planDetails: string;
  created_at: string;
  oopMax: number;
};

type PolicyInformationProps = {
  policies: Policy[] | HealthPolicy[];
  type: string;
};

export function PolicyInformationMain({
  policies,
  type,
}: PolicyInformationProps) {
  const isHealth = type.toLowerCase() === "health";

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const addPolicyHref = `/add${type}policy`;

  return (
    <div className="space-y-6">
      <div className="max-w-full">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Policies</h2>
            <Link href={addPolicyHref}>
              <Button className="text-xs md:text-sm">Add Policy</Button>
            </Link>
          </div>

          <div className="overflow-x-auto w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm">Type</TableHead>
                  <TableHead className="text-sm">Premium</TableHead>
                  <TableHead className="text-sm">Deductible</TableHead>
                  <TableHead className="text-sm">
                    {isHealth ? "Out-of-Pocket Max" : "Coverage Limit"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.coverageType}</TableCell>
                    <TableCell>{formatCurrency(policy.premium)}</TableCell>
                    <TableCell>{formatCurrency(policy.deductible)}</TableCell>
                    <TableCell>
                      {isHealth
                        ? formatCurrency((policy as HealthPolicy).oopMax ?? 0)
                        : formatCurrency(policy.coverageLimit)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
